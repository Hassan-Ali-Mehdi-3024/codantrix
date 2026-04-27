/**
 * Magic-link auth + session management.
 *
 * Schema in schema/0004_writing_auth.sql (admin_emails, magic_link_tokens,
 * admin_sessions). All timestamps are unix milliseconds.
 *
 * Security model:
 *   - admin_emails is an allowlist; /api/auth/request silently no-ops for
 *     non-allowlisted emails (no enumeration leak).
 *   - magic_link_tokens are 32-byte hex (256 bits, 64 hex chars), single-use
 *     (consumed_at), 15-min TTL.
 *   - admin_sessions cookie is HttpOnly + Secure + SameSite=Strict, 30-day
 *     expiry, rolling: a request within 7 days of expiry extends it by 30.
 *   - Rate limit at the route layer (worker/routes/auth.ts), not here.
 */

import type { D1Database } from "@cloudflare/workers-types";

// ============ Constants ============

export const SESSION_COOKIE = "cdx_admin_session";
const TOKEN_TTL_MS = 15 * 60 * 1000;          // 15 minutes
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;  // 30 days
const SESSION_RENEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;  // bump if <7d remaining

export const TOKEN_TTL_MINUTES = TOKEN_TTL_MS / 60_000;

// ============ Random tokens ============

/**
 * Generate a 64-character hex token (32 bytes / 256 bits) using the Workers
 * crypto.getRandomValues API. This is cryptographically random and suitable
 * for both magic-link tokens and session ids.
 */
export function generateToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  const hex: string[] = new Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    hex[i] = (buf[i] as number).toString(16).padStart(2, "0");
  }
  return hex.join("");
}

// ============ Email allowlist ============

/**
 * Returns true iff the lowercased email is in admin_emails. Used by the
 * /api/auth/request handler to decide whether to actually send a link.
 * Always run the cost of the lookup (constant-time-ish at the SQL level)
 * to avoid timing leaks between allowed/disallowed.
 */
export async function isAdminEmail(db: D1Database, email: string): Promise<boolean> {
  const row = await db
    .prepare(`SELECT email FROM admin_emails WHERE email = ? LIMIT 1`)
    .bind(email.toLowerCase())
    .first();
  return !!row;
}

// ============ Magic-link tokens ============

export interface CreateMagicLinkResult {
  token: string;
  expiresAt: number;
}

/**
 * Create a magic-link token for an allowed email. Caller must have already
 * verified the email is allowlisted. Returns the token + expiry.
 */
export async function createMagicLinkToken(
  db: D1Database,
  email: string,
  requestIpCountry: string | null
): Promise<CreateMagicLinkResult> {
  const token = generateToken();
  const now = Date.now();
  const expiresAt = now + TOKEN_TTL_MS;
  await db
    .prepare(
      `INSERT INTO magic_link_tokens (token, email, expires_at, consumed_at, created_at, request_ip)
       VALUES (?, ?, ?, NULL, ?, ?)`
    )
    .bind(token, email.toLowerCase(), expiresAt, now, requestIpCountry)
    .run();
  return { token, expiresAt };
}

export interface ConsumedToken {
  email: string;
}

/**
 * Atomically consume a magic-link token. Returns the email it was for if the
 * token was unconsumed and unexpired; null otherwise. The token is marked
 * consumed in the same UPDATE so a second use cannot succeed.
 */
export async function consumeMagicLinkToken(
  db: D1Database,
  token: string
): Promise<ConsumedToken | null> {
  const now = Date.now();
  // Atomic check-and-stamp: UPDATE sets consumed_at only if it's NULL and
  // expires_at is in the future. RETURNING gives us the email when the
  // update actually happened. If no row matches, returning is empty.
  const row = await db
    .prepare(
      `UPDATE magic_link_tokens
         SET consumed_at = ?
       WHERE token = ?
         AND consumed_at IS NULL
         AND expires_at > ?
       RETURNING email`
    )
    .bind(now, token, now)
    .first<{ email: string }>();
  if (!row) return null;
  return { email: row.email };
}

/**
 * Best-effort cleanup of expired/consumed tokens. Called occasionally by the
 * verify route. Runs DELETE for tokens older than 24h regardless of state.
 */
export async function pruneOldTokens(db: D1Database): Promise<void> {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  await db
    .prepare(`DELETE FROM magic_link_tokens WHERE created_at < ?`)
    .bind(cutoff)
    .run()
    .catch(() => {});
}

// ============ Sessions ============

export interface CreateSessionInit {
  email: string;
  userAgent: string | null;
  ipCountry: string | null;
}

export interface SessionRow {
  sessionId: string;
  email: string;
  expiresAt: number;
}

/**
 * Create a new admin session. Returns the session id (cookie value) and
 * expiry. Caller is responsible for setting the Set-Cookie header.
 */
export async function createSession(
  db: D1Database,
  init: CreateSessionInit
): Promise<SessionRow> {
  const sessionId = generateToken();
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;
  await db
    .prepare(
      `INSERT INTO admin_sessions (session_id, email, created_at, last_seen_at, expires_at, user_agent, ip_country)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(sessionId, init.email.toLowerCase(), now, now, expiresAt, init.userAgent, init.ipCountry)
    .run();
  return { sessionId, email: init.email.toLowerCase(), expiresAt };
}

/**
 * Look up a session by id and verify it's still valid. Returns the row or null.
 * Bumps last_seen_at; if within the renew window, also extends expires_at by
 * a fresh 30 days (rolling-window expiry).
 */
export async function getValidSession(
  db: D1Database,
  sessionId: string
): Promise<SessionRow | null> {
  const now = Date.now();
  const row = await db
    .prepare(
      `SELECT session_id, email, expires_at FROM admin_sessions
       WHERE session_id = ? AND expires_at > ? LIMIT 1`
    )
    .bind(sessionId, now)
    .first<{ session_id: string; email: string; expires_at: number }>();
  if (!row) return null;

  // Roll forward.
  const remaining = row.expires_at - now;
  let newExpires = row.expires_at;
  if (remaining < SESSION_RENEW_WINDOW_MS) {
    newExpires = now + SESSION_TTL_MS;
    await db
      .prepare(`UPDATE admin_sessions SET last_seen_at = ?, expires_at = ? WHERE session_id = ?`)
      .bind(now, newExpires, sessionId)
      .run();
  } else {
    await db
      .prepare(`UPDATE admin_sessions SET last_seen_at = ? WHERE session_id = ?`)
      .bind(now, sessionId)
      .run();
  }

  return { sessionId: row.session_id, email: row.email, expiresAt: newExpires };
}

/**
 * Delete a session row (logout). Returns true if a row was deleted, false
 * otherwise. The caller is responsible for clearing the cookie.
 */
export async function deleteSession(db: D1Database, sessionId: string): Promise<boolean> {
  const res = await db
    .prepare(`DELETE FROM admin_sessions WHERE session_id = ?`)
    .bind(sessionId)
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

// ============ Cookie helpers ============

/**
 * Build the Set-Cookie header value for a freshly issued session. 30-day
 * Max-Age, HttpOnly, Secure, SameSite=Strict, Path=/. Domain is intentionally
 * omitted so the cookie is host-locked to whatever served the verify route.
 */
export function buildSessionCookie(sessionId: string): string {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return [
    `${SESSION_COOKIE}=${sessionId}`,
    `Max-Age=${maxAge}`,
    `Path=/`,
    `HttpOnly`,
    `Secure`,
    `SameSite=Strict`,
  ].join("; ");
}

/**
 * Build a Set-Cookie header that expires the session cookie (logout).
 */
export function buildClearSessionCookie(): string {
  return [
    `${SESSION_COOKIE}=`,
    `Max-Age=0`,
    `Path=/`,
    `HttpOnly`,
    `Secure`,
    `SameSite=Strict`,
  ].join("; ");
}

/**
 * Parse the session cookie out of the request's Cookie header. Returns the
 * raw cookie value (the session id) or null if missing/malformed.
 */
export function readSessionCookie(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  // Tokenize "k=v; k2=v2; ..." without regex hell. Cookie values are URL-safe
  // hex in our case so no quoting concerns.
  const parts = header.split(";");
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq < 0) continue;
    const name = p.slice(0, eq).trim();
    if (name !== SESSION_COOKIE) continue;
    const value = p.slice(eq + 1).trim();
    // Hex-only sanity check; refuse anything weird.
    if (!/^[0-9a-f]{32,128}$/i.test(value)) return null;
    return value;
  }
  return null;
}

/**
 * Convenience: pull the session row directly from a request. Returns null if
 * no cookie or the session is expired/missing in the DB.
 */
export async function readRequestSession(
  db: D1Database,
  request: Request
): Promise<SessionRow | null> {
  const id = readSessionCookie(request);
  if (!id) return null;
  return getValidSession(db, id);
}
