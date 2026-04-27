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
import {
  handleSitemap,
  handleWritingIndex,
  handleWritingPost,
  handleWritingRss,
  handleWritingTag,
} from "./routes/writing";
import { handleCommentPost, handleCommentVerify } from "./routes/comments";
import {
  handleAdminCommentApprove,
  handleAdminCommentDelete,
  handleAdminCommentReject,
  handleAdminCommentsList,
} from "./routes/admin-comments";
import { handlePreflight, withCors } from "./lib/cors";

/**
 * Codantrix Labs Worker — main fetch dispatcher.
 *
 * /api/*  → JSON endpoints (chat, lead, auth, writing helpers, comments)
 * /admin/writing/*  → admin UI (W2)
 * /writing/*  → public blog (W3)
 * /sitemap.xml  → dynamic sitemap including writing posts
 * everything else → ASSETS fall-through
 */

const SLUG_RX = /^[a-z0-9-]{1,80}$/;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

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

    // ---- /writing magic-link auth (W1) ----
    if (pathname === "/api/auth/request" && method === "POST") {
      return withCors(await handleAuthRequest(request, env), request);
    }
    if (pathname === "/api/auth/verify" && method === "GET") {
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

    // ---- /writing comments (W4) ----
    if (pathname === "/api/comments/post" && method === "POST") {
      return withCors(await handleCommentPost(request, env), request);
    }
    if (pathname === "/api/comments/verify" && method === "GET") {
      // Direct navigation from email — no CORS wrap.
      return handleCommentVerify(request, env);
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

    // ---- /writing admin moderation (W4) ----
    if (pathname === "/admin/writing/comments/" || pathname === "/admin/writing/comments") {
      if (method === "GET") return await handleAdminCommentsList(request, env);
      return methodNotAllowed();
    }
    {
      const m = /^\/admin\/writing\/comments\/(\d+)\/(approve|reject|delete)\/?$/.exec(pathname);
      if (m && method === "POST") {
        const id = Number(m[1]);
        const action = m[2];
        if (!Number.isFinite(id) || id <= 0) return notFound();
        if (action === "approve") return await handleAdminCommentApprove(request, env, id);
        if (action === "reject") return await handleAdminCommentReject(request, env, id);
        if (action === "delete") return await handleAdminCommentDelete(request, env, id);
      }
    }

    // ---- /writing public read-side (W3) ----
    if (pathname === "/sitemap.xml" && method === "GET") {
      return await handleSitemap(request, env, ctx);
    }
    if (pathname === "/writing/rss.xml" && method === "GET") {
      return await handleWritingRss(request, env, ctx);
    }
    if ((pathname === "/writing/" || pathname === "/writing") && method === "GET") {
      // Normalize /writing → /writing/
      if (pathname === "/writing") {
        return new Response(null, { status: 301, headers: { location: "/writing/" } });
      }
      return await handleWritingIndex(request, env, ctx);
    }
    {
      const tagMatch = /^\/writing\/tag\/([a-z0-9-]{1,40})\/?$/.exec(pathname);
      if (tagMatch && method === "GET") {
        const tag = tagMatch[1] ?? "";
        return await handleWritingTag(request, env, ctx, tag);
      }
      const slugMatch = /^\/writing\/([a-z0-9-]{1,80})\/?$/.exec(pathname);
      if (slugMatch && method === "GET") {
        const slug = slugMatch[1] ?? "";
        if (!SLUG_RX.test(slug)) return notFound();
        return await handleWritingPost(request, env, ctx, slug);
      }
    }

    // Unmatched /api/* → 404/405 with CORS
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

    // Static fall-through.
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
