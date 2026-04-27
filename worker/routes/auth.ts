/**
 * Magic-link auth routes.
 *
 *   POST /api/auth/request   → email a sign-in link to an allowlisted address
 *   GET  /api/auth/verify    → consume a token, set session cookie, redirect
 *   POST /api/auth/logout    → clear the session
 *   GET  /api/auth/me        → return { ok, email } if signed in, 401 if not
 *
 * No third-party identity provider, no passwords. The allowlist lives in the
 * D1 admin_emails table; only addresses in that table can ever receive a
 * link. Bad-email submissions return the same shape as good ones (no
 * enumeration leak).
 */

import type { Env } from "../types";
import { checkRateLimit } from "../lib/db";
import {
  buildClearSessionCookie,
  buildSessionCookie,
  consumeMagicLinkToken,
  createMagicLinkToken,
  createSession,
  deleteSession,
  isAdminEmail,
  pruneOldTokens,
  readRequestSession,
  readSessionCookie,
  TOKEN_TTL_MINUTES,
} from "../lib/auth";
import { buildMagicLinkEmail, sendEmail } from "../lib/email";

const MAX_EMAIL_CHARS = 200;
const REQUEST_RATE_LIMIT_PER_MIN = 5;     // /api/auth/request: 5/min/IP
const VERIFY_RATE_LIMIT_PER_MIN = 20;     // /api/auth/verify: 20/min/IP
const REDIRECT_AFTER_VERIFY = "/admin/writing/";

// ----------------------------------------------------------------------------
// POST /api/auth/request
// Body: { email: string }
// Response: { ok: true, sent: "maybe" }   — same shape regardless of allowlist
// ----------------------------------------------------------------------------
export async function handleAuthRequest(request: Request, env: Env): Promise<Response> {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid-json");
  }

  const email = (body?.email ?? "").trim().toLowerCase();
  if (!email) return jsonError(400, "email-required");
  if (email.length > MAX_EMAIL_CHARS) return jsonError(400, "email-too-long");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError(400, "email-format-invalid");

  // Rate limit by IP. Don't punish failed submissions any harder than
  // successful ones — same bucket either way.
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const rl = await checkRateLimit(env.DB, `auth-request:${ip}`, REQUEST_RATE_LIMIT_PER_MIN);
  if (!rl.allowed) {
    return jsonError(429, "rate-limited", {
      limit_per_min: REQUEST_RATE_LIMIT_PER_MIN,
      retry_after_s: 60,
    });
  }

  // Silently no-op for non-allowlisted emails. Always return the same shape
  // so callers can't distinguish allowed vs. denied via response.
  const allowed = await isAdminEmail(env.DB, email);
  if (!allowed) {
    return okResponse();
  }

  const ipCountry = request.headers.get("cf-ipcountry") ?? null;

  const { token } = await createMagicLinkToken(env.DB, email, ipCountry);

  // Build the verify URL on the same host that received this request. That
  // way the email link works regardless of whether the worker is being hit
  // at workers.dev, a custom domain, or localhost dev.
  const origin = new URL(request.url).origin;
  const signInUrl = `${origin}/api/auth/verify?token=${encodeURIComponent(token)}`;

  const message = buildMagicLinkEmail({
    toEmail: email,
    signInUrl,
    ttlMinutes: TOKEN_TTL_MINUTES,
    requestIpCountry: ipCountry,
  });

  // Resend send. If it fails, log + return ok=false so the UI can surface a
  // generic "couldn't send right now" — but DO NOT echo the failure detail
  // since that could leak smtp errors.
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return jsonError(503, "email-unavailable");
  }
  const sent = await sendEmail(apiKey, message);
  if (!sent.ok) {
    console.error("resend failed", sent.status, sent.error);
    return jsonError(503, "email-unavailable");
  }

  return okResponse();
}

// ----------------------------------------------------------------------------
// GET /api/auth/verify?token=<hex>
// Side-effects: marks token consumed, creates session row, sets cookie.
// On success: 302 redirect to /admin/writing/.
// On failure: 400 with a small HTML page (this is opened from an email link,
// so users don't see a JSON blob).
// ----------------------------------------------------------------------------
export async function handleAuthVerify(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const rl = await checkRateLimit(env.DB, `auth-verify:${ip}`, VERIFY_RATE_LIMIT_PER_MIN);
  if (!rl.allowed) {
    return htmlError(429, "Too many attempts. Try again in a minute.");
  }

  const url = new URL(request.url);
  const token = (url.searchParams.get("token") ?? "").trim();
  if (!token || !/^[0-9a-f]{64}$/i.test(token)) {
    return htmlError(400, "Invalid or malformed sign-in link.");
  }

  const consumed = await consumeMagicLinkToken(env.DB, token);
  if (!consumed) {
    return htmlError(400, "This sign-in link has already been used or has expired. Request a new one.");
  }

  // Token was valid. Create a session and set the cookie.
  const userAgent = request.headers.get("user-agent");
  const ipCountry = request.headers.get("cf-ipcountry") ?? null;
  const session = await createSession(env.DB, {
    email: consumed.email,
    userAgent: userAgent ? userAgent.slice(0, 200) : null,
    ipCountry,
  });

  // Best-effort token table cleanup. Fire-and-forget.
  pruneOldTokens(env.DB).catch(() => {});

  // 302 to admin home with cookie set. Uses Location header relative to the
  // host that handled this request, so cookie + redirect target are on the
  // same host (cookie scoped to that host; redirect lands the user on the
  // admin UI behind that cookie).
  const headers = new Headers();
  headers.set("location", REDIRECT_AFTER_VERIFY);
  headers.set("set-cookie", buildSessionCookie(session.sessionId));
  headers.set("cache-control", "no-store");
  return new Response(null, { status: 302, headers });
}

// ----------------------------------------------------------------------------
// POST /api/auth/logout
// Clears the session cookie and deletes the session row. Returns JSON.
// ----------------------------------------------------------------------------
export async function handleAuthLogout(request: Request, env: Env): Promise<Response> {
  const sessionId = readSessionCookie(request);
  if (sessionId) {
    await deleteSession(env.DB, sessionId);
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": buildClearSessionCookie(),
      "cache-control": "no-store",
    },
  });
}

// ----------------------------------------------------------------------------
// GET /api/auth/me
// Returns { ok: true, email } if a valid session is present, 401 otherwise.
// Used by client JS in the admin UI to gate UI before making real requests.
// ----------------------------------------------------------------------------
export async function handleAuthMe(request: Request, env: Env): Promise<Response> {
  const session = await readRequestSession(env.DB, request);
  if (!session) {
    return new Response(JSON.stringify({ ok: false, error: "unauthenticated" }), {
      status: 401,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }
  return new Response(
    JSON.stringify({ ok: true, email: session.email, expires_at: session.expiresAt }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}

// ============ Helpers ============

function okResponse(): Response {
  return new Response(JSON.stringify({ ok: true, sent: "maybe" }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function jsonError(
  status: number,
  error: string,
  extra: Record<string, unknown> = {}
): Response {
  return new Response(JSON.stringify({ ok: false, error, ...extra }), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function htmlError(status: number, message: string): Response {
  // Tiny inline-styled error page. No site chrome — this is reached from an
  // email link that may have expired; user should be told plainly + given a
  // path back to /admin/login.
  const safe = escapeHtml(message);
  const body = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Sign-in problem</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;background:#f5f4ee;color:#1a1a1a;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;}
  .wrap{max-width:520px;margin:0 auto;padding:64px 24px;}
  .eyebrow{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b6b6b;margin:0 0 18px;}
  h1{font-size:24px;line-height:1.25;font-weight:600;margin:0 0 12px;}
  p{font-size:15px;line-height:1.55;margin:0 0 24px;}
  a.btn{display:inline-block;padding:12px 18px;background:#1a1a1a;color:#fafaf6;text-decoration:none;font-size:14px;border-radius:2px;}
</style></head><body><div class="wrap">
  <p class="eyebrow">Codantrix Labs admin</p>
  <h1>Sign-in problem</h1>
  <p>${safe}</p>
  <p><a class="btn" href="/admin/login/">Back to sign-in</a></p>
</div></body></html>`;
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
