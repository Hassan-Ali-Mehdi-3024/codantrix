/**
 * CORS allowlist for the Codantrix Labs Worker.
 *
 * The Worker lives at codantrix-labs.hassanalimehdi30.workers.dev; the
 * frontend lives at labs.codantrix.com. Every /api/* call from the chat
 * widget is therefore cross-origin and needs explicit CORS headers.
 *
 * Strategy: small allowlist of trusted origins. Echo the Origin header
 * back ONLY if it's on the list — never reflect arbitrary origins. Same
 * approach for OPTIONS preflight.
 *
 * The workers.dev URL itself is intentionally NOT on the allowlist for
 * production browsers — it's only meant to be hit by the labs.codantrix.com
 * frontend or by dev tools (curl, etc., which don't send Origin).
 */

const ALLOWED_ORIGINS = new Set<string>([
  "https://labs.codantrix.com",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
]);

function pickAllowedOrigin(request: Request): string | null {
  const origin = request.headers.get("Origin");
  if (!origin) return null;
  return ALLOWED_ORIGINS.has(origin) ? origin : null;
}

/**
 * Build the CORS headers to attach to a response. Returns an empty object
 * if the request's Origin isn't allowlisted (so non-browser callers like
 * curl still work, but rogue sites can't read responses).
 */
export function corsHeaders(request: Request): Record<string, string> {
  const allowed = pickAllowedOrigin(request);
  if (!allowed) return {};
  return {
    "access-control-allow-origin": allowed,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}

/**
 * Handle CORS preflight (OPTIONS). Returns 204 with allow headers if the
 * Origin is allowlisted, 403 otherwise. Call this from the dispatcher
 * before route matching for OPTIONS requests on /api/*.
 */
export function handlePreflight(request: Request): Response {
  const headers = corsHeaders(request);
  if (Object.keys(headers).length === 0) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, { status: 204, headers });
}

/**
 * Wrap a Response to attach CORS headers in-place. Useful for routes that
 * already constructed their Response (with Content-Type etc.) and just
 * need CORS appended.
 */
export function withCors(response: Response, request: Request): Response {
  const cors = corsHeaders(request);
  if (Object.keys(cors).length === 0) return response;
  const merged = new Headers(response.headers);
  for (const [k, v] of Object.entries(cors)) merged.set(k, v);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: merged,
  });
}
