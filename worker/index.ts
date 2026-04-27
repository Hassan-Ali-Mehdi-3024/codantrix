import type { Env } from "./types";
import { handleHealth } from "./routes/health";
import { handleChat } from "./routes/chat";
import { handleLead } from "./routes/lead";
import {
  handleAuthLogout,
  handleAuthMe,
  handleAuthRequest,
  handleAuthVerify,
} from "./routes/auth";
import { handlePreflight, withCors } from "./lib/cors";

/**
 * Codantrix Labs Worker — main fetch dispatcher.
 *
 * Routing:
 *   OPTIONS /api/*               → handlePreflight (CORS preflight)
 *   GET     /api/health          → handleHealth
 *   POST    /api/chat            → handleChat
 *   POST    /api/lead            → handleLead
 *   POST    /api/auth/request    → handleAuthRequest    (W1)
 *   GET     /api/auth/verify     → handleAuthVerify     (W1) — sets cookie + 302
 *   POST    /api/auth/logout     → handleAuthLogout     (W1)
 *   GET     /api/auth/me         → handleAuthMe         (W1)
 *   /admin/* (W2+)               → reserved for admin UI; falls through to ASSETS for now
 *   *                            → env.ASSETS.fetch (static fall-through, ./site)
 *
 * CORS: Worker hosted at codantrix-labs.hassanalimehdi30.workers.dev, consumed
 * by labs.codantrix.com. /api/* → cross-origin → CORS allowlist in cors.ts.
 *
 * /api/auth/verify is intentionally NOT wrapped in CORS: it's hit directly via
 * a browser navigation from an email link, sets a cookie, and 302s. CORS would
 * reject the redirect chain when the verify URL host doesn't match the email
 * client's origin (which it never does).
 */

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // CORS preflight (browsers send OPTIONS before POST with content-type: application/json)
    if (method === "OPTIONS" && pathname.startsWith("/api/")) {
      return handlePreflight(request);
    }

    // ---- /book chat assistant + lead capture ----
    if (pathname === "/api/health" && method === "GET") {
      return withCors(await handleHealth(request, env), request);
    }
    if (pathname === "/api/chat" && method === "POST") {
      return withCors(await handleChat(request, env, ctx), request);
    }
    if (pathname === "/api/lead" && method === "POST") {
      return withCors(await handleLead(request, env), request);
    }

    // ---- /writing admin auth (Phase W1) ----
    if (pathname === "/api/auth/request" && method === "POST") {
      return withCors(await handleAuthRequest(request, env), request);
    }
    if (pathname === "/api/auth/verify" && method === "GET") {
      // Direct navigation from email; do not wrap in CORS — see file header.
      return handleAuthVerify(request, env);
    }
    if (pathname === "/api/auth/logout" && method === "POST") {
      return withCors(await handleAuthLogout(request, env), request);
    }
    if (pathname === "/api/auth/me" && method === "GET") {
      return withCors(await handleAuthMe(request, env), request);
    }

    // Unmatched /api/* → 404/405 with CORS so the frontend can surface it cleanly.
    if (pathname.startsWith("/api/")) {
      const res = new Response(
        JSON.stringify({ ok: false, error: "not-found", path: pathname }),
        {
          status: pathname === "/api/" ? 404 : 405,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
      return withCors(res, request);
    }

    // Static fall-through — every non-/api/* request hits the ASSETS binding,
    // which serves files from ./site. /admin/login/ is a static page; /admin/writing/*
    // will be intercepted by route handlers in W2.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
