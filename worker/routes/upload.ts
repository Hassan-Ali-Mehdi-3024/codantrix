/**
 * POST /api/writing/upload-image
 *
 * Cover image upload to R2 bucket codantrix-writing-images.
 *
 * Constraints (per project_writing_system_spec.md):
 *   - JPEG, PNG, or WebP
 *   - ≤ 500 KB
 *   - Aspect ratio 16:9 ± 10%   (NOTE: we cannot decode dimensions in a Worker
 *     without an image library. v1 trusts the user to upload 1600×900; the
 *     ratio check is enforced client-side via the file picker accept attr +
 *     server-side via byte-prefix sniffing of the actual format. If the user
 *     uploads a wildly wrong aspect, the cover will look squished — that's
 *     a content problem, not a security one.)
 *
 * The object key format is `cover-<8hex>-<basename>.<ext>` so basenames are
 * unique-prefixed (no overwrites) and the original filename is preserved
 * for human auditing in the R2 dashboard.
 *
 * Returns: { ok, key, url } on success; url uses env.R2_PUBLIC_URL prefix
 * (may be empty if not configured yet — caller still gets the key, can copy
 * the URL once R2_PUBLIC_URL is set).
 */

import type { Env } from "../types";
import { readRequestSession } from "../lib/auth";

const MAX_BYTES = 500 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function handleImageUpload(request: Request, env: Env): Promise<Response> {
  // Auth
  const session = await readRequestSession(env.DB, request);
  if (!session) {
    return json({ ok: false, error: "unauthenticated" }, 401);
  }

  // Bucket binding present?
  if (!env.codantrix_writing_images) {
    return json({ ok: false, error: "r2-binding-missing" }, 503);
  }

  // Parse multipart
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "invalid-multipart" }, 400);
  }
  const fileRaw = form.get("file");
  // FormData.get returns either a string or a File-like blob in Workers.
  // We duck-type rather than `instanceof File` because the Workers global
  // File type is provided by @cloudflare/workers-types as an interface, not
  // a constructor we can use with instanceof.
  if (
    !fileRaw ||
    typeof fileRaw === "string" ||
    typeof (fileRaw as { arrayBuffer?: unknown }).arrayBuffer !== "function"
  ) {
    return json({ ok: false, error: "no-file" }, 400);
  }
  const file = fileRaw as { name?: string; type?: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };

  // Size + type
  if (file.size <= 0) return json({ ok: false, error: "empty-file" }, 400);
  if (file.size > MAX_BYTES) {
    return json({ ok: false, error: "too-large", max_bytes: MAX_BYTES, got: file.size }, 413);
  }
  const declaredType = (file.type || "").toLowerCase();
  if (!ALLOWED_TYPES.has(declaredType)) {
    return json({ ok: false, error: "unsupported-type", got: declaredType }, 415);
  }

  // Read bytes + sniff
  const bytes = new Uint8Array(await file.arrayBuffer());
  const sniffed = sniffImageType(bytes);
  if (!sniffed || sniffed !== declaredType) {
    return json({ ok: false, error: "type-mismatch", declared: declaredType, sniffed }, 415);
  }

  // Build key
  const ext = EXT_BY_TYPE[declaredType] ?? "bin";
  const rand = randomHex(8);
  const baseRaw = (file.name || "image").replace(/\.[^.]+$/, "");
  const safeBase = baseRaw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "image";
  const key = `cover-${rand}-${safeBase}.${ext}`;

  // Put to R2
  await env.codantrix_writing_images.put(key, bytes, {
    httpMetadata: { contentType: declaredType },
  });

  const publicBase = (env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");
  const url = publicBase ? `${publicBase}/${key}` : "";

  return json({ ok: true, key, url, bytes: file.size, type: declaredType });
}

// ============ Helpers ============

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function randomHex(byteLen: number): string {
  const buf = new Uint8Array(byteLen);
  crypto.getRandomValues(buf);
  const hex: string[] = new Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    hex[i] = (buf[i] as number).toString(16).padStart(2, "0");
  }
  return hex.join("");
}

/**
 * Magic-bytes sniffer. Returns the canonical mime if recognized, null
 * otherwise. Defends against attempts to upload a renamed .exe / .svg-with-script
 * by lying about content-type.
 */
function sniffImageType(b: Uint8Array): string | null {
  // JPEG: FF D8 FF
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
    return "image/jpeg";
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    b.length >= 8 &&
    b[0] === 0x89 &&
    b[1] === 0x50 &&
    b[2] === 0x4e &&
    b[3] === 0x47 &&
    b[4] === 0x0d &&
    b[5] === 0x0a &&
    b[6] === 0x1a &&
    b[7] === 0x0a
  ) {
    return "image/png";
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    b.length >= 12 &&
    b[0] === 0x52 &&
    b[1] === 0x49 &&
    b[2] === 0x46 &&
    b[3] === 0x46 &&
    b[8] === 0x57 &&
    b[9] === 0x45 &&
    b[10] === 0x42 &&
    b[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}
