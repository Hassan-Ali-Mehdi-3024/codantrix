import type { Env } from "./types";
import { handleHealth } from "./routes/health";
import { handleChat } from "./routes/chat";
import { handleLead } from "./routes/lead";

/**
 * Codantrix Labs Worker — main fetch dispatcher.
 *
 * Routing:
 *   GET  /api/health  → handleHealth
 *   POST /api/chat    → handleChat   (Phase 3)
 *   POST /api/lead    → handleLead   (Phase 3)
 *   *                 → env.ASSETS.fetch (static fall-through, served from ./site)
 *
 * Same-origin only: no CORS headers added on /api/* — the chat widget lives
 * on labs.codantrix.com and POSTs to the same origin.
 *
 * No global state. No top-level await. Everything reachable from `fetch`.
 */

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // API routes
    if (pathname === "/api/health" && request.method === "GET") {
      return handleHealth(request, env);
    }
    if (pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env);
    }
    if (pathname === "/api/lead" && request.method === "POST") {
      return handleLead(request, env);
    }
    if (pathname.startsWith("/api/")) {
      return new Response(
        JSON.stringify({ ok: false, error: "not-found", path: pathname }),
        {
          status: pathname === "/api/" ? 404 : 405,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }

    // Static fall-through — every non-/api/* request hits the ASSETS binding,
    // which serves files from ./site with html_handling: auto-trailing-slash
    // and not_found_handling: 404-page (see wrangler.jsonc).
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
