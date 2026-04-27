/**
 * Comments routes for /writing/<slug>/.
 *
 *   POST /api/comments/post                      → submit a comment
 *   GET  /api/comments/verify?token=<hex>        → confirm email, promote to pending
 *
 *   Admin-side moderation routes live in worker/routes/admin-comments.ts.
 *
 * Public POST is rate-limited per IP. Comments either land 'pending'
 * (verified email cache hit) or 'pending_unverified' with a verification
 * email triggered. We never tell the client whether the email was already
 * verified — same response shape.
 */

import type { Env } from "../types";
import { checkRateLimit } from "../lib/db";
import {
  consumeCommentVerifyToken,
  isEmailVerified,
  postComment,
} from "../lib/comments";
import { buildCommentVerifyEmail, sendEmail } from "../lib/email";
import { purgeWritingCache } from "./writing";

const RATE_LIMIT_PER_MIN = 5;             // 5 comments/min/IP
const VERIFY_TTL_HOURS = 24;
const MAX_NAME = 80;
const MAX_EMAIL = 200;
const MAX_BODY = 3000;

// ============ POST /api/comments/post ============

export async function handleCommentPost(request: Request, env: Env): Promise<Response> {
  let body: { post_slug?: string; author_name?: string; author_email?: string; body?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }

  const slug = (body?.post_slug ?? "").trim().toLowerCase();
  const name = (body?.author_name ?? "").trim().slice(0, MAX_NAME);
  const email = (body?.author_email ?? "").trim().toLowerCase().slice(0, MAX_EMAIL);
  const text = (body?.body ?? "").trim();

  if (!slug || !/^[a-z0-9-]{1,80}$/.test(slug)) return json({ ok: false, error: "post-slug-invalid" }, 400);
  if (!name) return json({ ok: false, error: "name-required" }, 400);
  if (!email) return json({ ok: false, error: "email-required" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "email-format-invalid" }, 400);
  if (!text) return json({ ok: false, error: "body-required" }, 400);
  if (text.length > MAX_BODY) return json({ ok: false, error: "body-too-long", max: MAX_BODY }, 400);

  // Rate limit by IP
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const rl = await checkRateLimit(env.DB, `comment-post:${ip}`, RATE_LIMIT_PER_MIN);
  if (!rl.allowed) {
    return json({ ok: false, error: "rate-limited", retry_after_s: 60 }, 429);
  }

  // Find the post id
  const postRow = await env.DB
    .prepare(`SELECT id, title FROM posts WHERE slug = ? AND status = 'published' LIMIT 1`)
    .bind(slug)
    .first<{ id: number; title: string }>();
  if (!postRow) return json({ ok: false, error: "post-not-found" }, 404);

  // Check verified-email cache.
  const verified = await isEmailVerified(env.DB, email);

  const ipCountry = request.headers.get("cf-ipcountry") ?? null;
  const userAgent = request.headers.get("user-agent");

  const result = await postComment(env.DB, {
    postId: postRow.id,
    authorName: name,
    authorEmail: email,
    body: text,
    ipCountry,
    userAgent: userAgent ? userAgent.slice(0, 200) : null,
    emailVerified: verified,
  });

  // If the email is fresh, send the verification email.
  if (result.status === "pending_unverified" && result.verifyToken) {
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      // Without email we can't verify — return 503 and roll back? Simpler:
      // leave the row in pending_unverified; admin can clean up. Return 503.
      console.error("RESEND_API_KEY missing — comment verify cannot be sent");
      return json({ ok: false, error: "email-unavailable" }, 503);
    }
    const origin = new URL(request.url).origin;
    const verifyUrl = `${origin}/api/comments/verify?token=${encodeURIComponent(result.verifyToken)}`;
    const message = buildCommentVerifyEmail({
      toEmail: email,
      verifyUrl,
      postTitle: postRow.title,
      ttlHours: VERIFY_TTL_HOURS,
    });
    const sent = await sendEmail(apiKey, message);
    if (!sent.ok) {
      console.error("comment verify send failed", sent.status, sent.error);
      return json({ ok: false, error: "email-unavailable" }, 503);
    }
  }

  return json({
    ok: true,
    requires_verification: result.status === "pending_unverified",
    status: result.status,
  });
}

// ============ GET /api/comments/verify ============

export async function handleCommentVerify(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const token = (url.searchParams.get("token") ?? "").trim();
  if (!token || !/^[0-9a-f]{64}$/i.test(token)) {
    return htmlPage(400, "Confirmation problem", "This link looks malformed.", "/writing/");
  }
  const consumed = await consumeCommentVerifyToken(env.DB, token);
  if (!consumed) {
    return htmlPage(
      400,
      "Confirmation problem",
      "This link has already been used or has expired. Re-submit the comment to get a fresh link.",
      "/writing/"
    );
  }
  // The post page is cached; nothing visible changes (comment is still
  // pending moderation), but purge anyway so the next visit sees the
  // new comment count if/when it's later approved.
  if (consumed.postSlug) {
    purgeWritingCache(consumed.postSlug).catch(() => {});
  }
  return htmlPage(
    200,
    "Comment confirmed",
    "Thanks. Your comment is in the moderation queue. Hassan will review it shortly.",
    consumed.postSlug ? `/writing/${consumed.postSlug}/` : "/writing/"
  );
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

function htmlPage(status: number, title: string, message: string, backTo: string): Response {
  const safeMsg = escape(message);
  const safeTitle = escape(title);
  const safeBack = escape(backTo);
  const body = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${safeTitle} · Codantrix Labs</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<style>
  body{margin:0;background:#0b0a08;color:#ede5d6;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;}
  .wrap{max-width:520px;margin:0 auto;padding:96px 24px;}
  .eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#a39d8e;margin:0 0 22px;font-weight:500}
  h1{font-size:30px;line-height:1.2;font-weight:600;margin:0 0 14px;letter-spacing:-.02em;color:#ede5d6}
  p{font-size:15px;line-height:1.6;color:#a39d8e;margin:0 0 28px}
  a.btn{display:inline-block;padding:13px 22px;background:#ff6b35;color:#0b0a08;text-decoration:none;font-size:14px;font-weight:500;border-radius:999px}
</style></head><body><div class="wrap">
  <p class="eyebrow">Codantrix Labs · Writing</p>
  <h1>${safeTitle}</h1>
  <p>${safeMsg}</p>
  <p><a class="btn" href="${safeBack}">Back to writing →</a></p>
</div></body></html>`;
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
