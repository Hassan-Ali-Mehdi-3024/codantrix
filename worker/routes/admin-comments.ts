/**
 * Admin moderation routes for comments.
 *
 *   GET  /admin/writing/comments/                     → moderation list
 *   POST /admin/writing/comments/<id>/approve         → publish a comment
 *   POST /admin/writing/comments/<id>/reject          → keep but never show
 *   POST /admin/writing/comments/<id>/delete          → permanent delete
 *
 * All gated on a valid admin session.
 */

import type { Env } from "../types";
import { readRequestSession } from "../lib/auth";
import {
  countPendingComments,
  deleteCommentById,
  getCommentById,
  listAdminComments,
  setCommentStatus,
} from "../lib/comments";
import { renderCommentsPage } from "../lib/admin-templates";
import { purgeWritingCache } from "./writing";

async function requireSession(request: Request, env: Env): Promise<{ email: string } | Response> {
  const session = await readRequestSession(env.DB, request);
  if (session) return { email: session.email };
  return new Response(null, {
    status: 302,
    headers: { location: "https://labs.codantrix.com/admin/login/", "cache-control": "no-store" },
  });
}

// ============ GET /admin/writing/comments/ ============

export async function handleAdminCommentsList(request: Request, env: Env): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  const filterRaw = (url.searchParams.get("filter") ?? "pending").toLowerCase();
  const filter = (filterRaw === "approved" || filterRaw === "rejected" || filterRaw === "all")
    ? (filterRaw as "approved" | "rejected" | "all")
    : "pending";
  const flashKey = url.searchParams.get("flash");
  const flash = decodeFlash(flashKey);

  const [comments, pendingComments] = await Promise.all([
    listAdminComments(env.DB, filter),
    countPendingComments(env.DB),
  ]);
  const html = renderCommentsPage({
    email: auth.email,
    pendingComments,
    flash,
    comments,
    filter,
  });
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex,nofollow",
    },
  });
}

// ============ POST /admin/writing/comments/<id>/{approve,reject,delete} ============

export async function handleAdminCommentApprove(
  request: Request,
  env: Env,
  id: number
): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;
  const c = await getCommentById(env.DB, id);
  if (!c) return notFound();
  await setCommentStatus(env.DB, id, "approved");
  if (c.post_slug) await purgeWritingCache(c.post_slug).catch(() => {});
  return redirectFlash("/admin/writing/comments/?filter=pending", "ok", "comment-approved");
}

export async function handleAdminCommentReject(
  request: Request,
  env: Env,
  id: number
): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;
  const c = await getCommentById(env.DB, id);
  if (!c) return notFound();
  await setCommentStatus(env.DB, id, "rejected");
  if (c.post_slug) await purgeWritingCache(c.post_slug).catch(() => {});
  return redirectFlash("/admin/writing/comments/?filter=pending", "ok", "comment-rejected");
}

export async function handleAdminCommentDelete(
  request: Request,
  env: Env,
  id: number
): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;
  const c = await getCommentById(env.DB, id);
  await deleteCommentById(env.DB, id);
  if (c?.post_slug) await purgeWritingCache(c.post_slug).catch(() => {});
  return redirectFlash("/admin/writing/comments/?filter=all", "ok", "comment-deleted");
}

// ============ Helpers ============

function notFound(): Response {
  return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
}

function redirectFlash(path: string, kind: "ok" | "error", text: string): Response {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${path}${sep}flash=${encodeURIComponent(`${kind}:${text}`)}`;
  return new Response(null, { status: 302, headers: { location: url, "cache-control": "no-store" } });
}

function decodeFlash(raw: string | null): { kind: "ok" | "error"; text: string } | undefined {
  if (!raw) return undefined;
  const idx = raw.indexOf(":");
  if (idx < 0) return undefined;
  const kindRaw = raw.slice(0, idx);
  const text = raw.slice(idx + 1);
  const kind = kindRaw === "ok" ? "ok" : "error";
  const pretty: Record<string, string> = {
    "comment-approved": "Comment approved.",
    "comment-rejected": "Comment rejected.",
    "comment-deleted": "Comment deleted.",
  };
  return { kind, text: pretty[text] ?? text };
}
