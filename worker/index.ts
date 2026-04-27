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
import {
  handleAdminPostCreate,
  handleAdminPostDelete,
  handleAdminPostEdit,
  handleAdminPostNew,
  handleAdminPostSave,
  handleAdminPostsList,
  handleAdminPreview,
} from "./routes/admin";
import { handleImageUpload } from "./routes/upload";
import { handlePreflight, withCors } from "./lib/cors";

/**
 * Codantrix Labs Worker — main fetch dispatcher.
 *
 * Routing groups:
 *   /api/health             → handleHealth
 *   /api/chat               → handleChat (chat assistant)
 *   /api/lead               → handleLead (email follow-up form)
 *   /api/auth/*             → magic-link auth (W1)
 *   /api/writing/preview    → server-side markdown render (admin-only)
 *   /api/writing/upload-image → R2 cover image upload (admin-only)
 *   /admin/writing/         → posts list (W2)
 *   /admin/writing/new      → editor (W2)
 *   /admin/writing/edit/<slug> → editor (W2)
 *   /admin/writing/delete/<slug> → form-post delete (W2)
 *   /admin/login            → static asset (site/admin/login/index.html)
 *   *                       → ASSETS fall-through
 *
 * /admin/writing/comments/ moderation routes land in W4.
 */

const SLUG_RX = /^[a-z0-9-]{1,80}$/;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // CORS preflight
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

    // ---- /writing admin auth (W1) ----
    if (pathname === "/api/auth/request" && method === "POST") {
      return withCors(await handleAuthRequest(request, env), request);
    }
    if (pathname === "/api/auth/verify" && method === "GET") {
      // Direct nav from email — no CORS wrap.
      return handleAuthVerify(request, env);
    }
    if (pathname === "/api/auth/logout" && method === "POST") {
      return withCors(await handleAuthLogout(request, env), request);
    }
    if (pathname === "/api/auth/me" && method === "GET") {
      return withCors(await handleAuthMe(request, env), request);
    }

    // ---- /writing admin write-side (W2) ----
    if (pathname === "/api/writing/preview" && method === "POST") {
      return await handleAdminPreview(request, env);
    }
    if (pathname === "/api/writing/upload-image" && method === "POST") {
      return await handleImageUpload(request, env);
    }

    if (pathname === "/admin/writing/" || pathname === "/admin/writing") {
      if (method === "GET") return await handleAdminPostsList(request, env);
      return methodNotAllowed();
    }
    if (pathname === "/admin/writing/new") {
      if (method === "GET") return await handleAdminPostNew(request, env);
      if (method === "POST") return await handleAdminPostCreate(request, env);
      return methodNotAllowed();
    }
    {
      const editMatch = /^\/admin\/writing\/edit\/([a-z0-9-]{1,80})\/?$/.exec(pathname);
      if (editMatch) {
        const slug = editMatch[1] ?? "";
        if (!SLUG_RX.test(slug)) return notFound();
        if (method === "GET") return await handleAdminPostEdit(request, env, slug);
        if (method === "POST") return await handleAdminPostSave(request, env, slug);
        return methodNotAllowed();
      }
      const delMatch = /^\/admin\/writing\/delete\/([a-z0-9-]{1,80})\/?$/.exec(pathname);
      if (delMatch && method === "POST") {
        const slug = delMatch[1] ?? "";
        if (!SLUG_RX.test(slug)) return notFound();
        return await handleAdminPostDelete(request, env, slug);
      }
    }

    // Unmatched /api/* → JSON 404/405 with CORS.
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

    // Static fall-through. /admin/login/ and any other static path lands here.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

function methodNotAllowed(): Response {
  return new Response("Method not allowed", {
    status: 405,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
