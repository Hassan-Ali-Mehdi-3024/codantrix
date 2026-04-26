import type { Env } from "./types";
import { handleHealth } from "./routes/health";
import { handleChat } from "./routes/chat";
import { handleLead } from "./routes/lead";
import { handlePreflight, withCors } from "./lib/cors";

/**
 * Codantrix Labs Worker — main fetch dispatcher.
 *
 * Routing:
 *   OPTIONS /api/*    → handlePreflight (CORS preflight)
 *   GET     /api/health → handleHealth
 *   POST    /api/chat   → handleChat   (Phase 3 implementation)
 *   POST    /api/lead   → handleLead   (Phase 3 implementation)
 *   *                   → env.ASSETS.fetch (static fall-through, ./site)
 *
 * CORS: This Worker is hosted at codantrix-labs.hassanalimehdi30.workers.dev
 * and consumed by labs.codantrix.com — every browser call is cross-origin.
 * worker/lib/cors.ts maintains a small allowlist (production domain +
 * localhost for dev). Non-browser callers (curl, server-to-server) work
 * without CORS headers since they don't send an Origin header.
 *
 * No global state. No top-level await. Everything reachable from `fetch`.
 */

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // CORS preflight (browsers send OPTIONS before POST with content-type: application/json)
    if (method === "OPTIONS" && pathname.startsWith("/api/")) {
      return handlePreflight(request);
    }

    // API routes — wrap each response with CORS so allowlisted origins can read it
    if (pathname === "/api/health" && method === "GET") {
      return withCors(await handleHealth(request, env), request);
    }
    if (pathname === "/api/chat" && method === "POST") {
      return withCors(await handleChat(request, env), request);
    }
    if (pathname === "/api/lead" && method === "POST") {
      return withCors(await handleLead(request, env), request);
    }
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
    // which serves files from ./site with html_handling: auto-trailing-slash
    // and not_found_handling: 404-page (see wrangler.jsonc).
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
