import type { Env } from "../types";
import { BUILD_REV } from "../build";

/**
 * GET /api/health
 *
 * Sanity check that the Worker is running and the D1 binding resolves.
 * Returns 200 when both Worker code and DB binding are reachable, 503 if D1
 * is not bound. Includes BUILD_REV so post-deploy verification can confirm
 * the right commit is serving traffic.
 */
export async function handleHealth(_request: Request, env: Env): Promise<Response> {
  const ts = Date.now();

  let db: "ok" | "unbound" | "error" = "unbound";
  try {
    if (env.DB) {
      await env.DB.prepare("SELECT 1 AS one").first();
      db = "ok";
    }
  } catch {
    db = "error";
  }

  // Probe optional bindings/secrets that arrived in W1+ so /api/health is
  // a one-shot sanity check after a redeploy.
  const has_resend_key = typeof env.RESEND_API_KEY === "string" && env.RESEND_API_KEY.length > 0;
  const has_r2_binding = !!env.codantrix_writing_images;
  const r2_public_url_set = typeof env.R2_PUBLIC_URL === "string" && env.R2_PUBLIC_URL.length > 0;

  const ok = db === "ok";
  return new Response(
    JSON.stringify(
      {
        ok,
        ts,
        db,
        model: env.LLM_MODEL,
        build_rev: BUILD_REV,
        writing: {
          has_resend_key,
          has_r2_binding,
          r2_public_url_set,
        },
      },
      null,
      2
    ),
    {
      status: ok ? 200 : 503,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}
