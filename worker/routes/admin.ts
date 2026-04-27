/**
 * Admin write-side routes for /admin/writing/*.
 *
 * All handlers gate on a valid session (readRequestSession). Unauthenticated
 * GETs redirect to /admin/login/ on the labs.codantrix.com host (via Location);
 * unauthenticated POSTs return 401 JSON.
 *
 * Routes:
 *   GET    /admin/writing/                  → posts list
 *   GET    /admin/writing/new               → new editor (empty)
 *   POST   /admin/writing/new               → create post + 302 to edit page
 *   GET    /admin/writing/edit/<slug>       → editor pre-filled
 *   POST   /admin/writing/edit/<slug>       → save + 302 (handles slug rename)
 *   POST   /admin/writing/delete/<slug>     → delete + 302 to list
 *   POST   /api/writing/preview             → render markdown to HTML (admin-only)
 */

import type { Env } from "../types";
import { readRequestSession } from "../lib/auth";
import {
  computeWordStats,
  createPost,
  deletePostBySlug,
  getPostBySlug,
  listAllPostsAdmin,
  normalizeSlug,
  normalizeTag,
  type PostStatus,
  updatePostBySlug,
} from "../lib/posts";
import { renderMarkdown } from "../lib/markdown";
import {
  renderEditorPage,
  renderPostsListPage,
} from "../lib/admin-templates";
import { countPendingComments } from "../lib/comments";
import { purgeWritingCache } from "./writing";

const SLUG_RX = /^[a-z0-9-]{1,80}$/;

// ============ Auth helpers ============

async function requireSession(request: Request, env: Env): Promise<{ email: string } | Response> {
  const session = await readRequestSession(env.DB, request);
  if (session) return { email: session.email };
  // For GETs, push to login. For POSTs (forms), the browser would render the
  // 302 fine but the user might lose form state — still simplest UX.
  const loginUrl = "https://labs.codantrix.com/admin/login/";
  return new Response(null, {
    status: 302,
    headers: { location: loginUrl, "cache-control": "no-store" },
  });
}

// ============ GET /admin/writing/ ============

export async function handleAdminPostsList(request: Request, env: Env): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  const flashKey = url.searchParams.get("flash");
  const flash = decodeFlash(flashKey);

  const [posts, pendingComments] = await Promise.all([
    listAllPostsAdmin(env.DB),
    countPendingComments(env.DB).catch(() => 0),
  ]);

  const html = renderPostsListPage({
    email: auth.email,
    posts,
    pendingComments,
    flash,
  });
  return htmlResponse(html);
}

// ============ GET /admin/writing/new ============

export async function handleAdminPostNew(request: Request, env: Env): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;
  const pendingComments = await countPendingComments(env.DB).catch(() => 0);
  const html = renderEditorPage({
    email: auth.email,
    pendingComments,
    mode: "new",
  });
  return htmlResponse(html);
}

// ============ POST /admin/writing/new ============

export async function handleAdminPostCreate(request: Request, env: Env): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;

  const form = await readForm(request);
  if (!form) return badRequest("invalid-form");

  const input = parsePostForm(form);
  if (typeof input === "string") return redirectFlash("/admin/writing/new", "error", input);

  try {
    await createPost(env.DB, input);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg.includes("UNIQUE")) return redirectFlash("/admin/writing/new", "error", "slug-already-exists");
    return redirectFlash("/admin/writing/new", "error", "create-failed");
  }
  // Best-effort cache purge — newly created posts likely won't have cached
  // index/sitemap pages yet, but draft → published creation is possible.
  purgeWritingCache(input.slug).catch(() => {});
  return redirectFlash(`/admin/writing/edit/${input.slug}`, "ok", "post-created");
}

// ============ GET /admin/writing/edit/<slug> ============

export async function handleAdminPostEdit(request: Request, env: Env, slug: string): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;

  const post = await getPostBySlug(env.DB, slug);
  if (!post) return notFound();

  const url = new URL(request.url);
  const flash = decodeFlash(url.searchParams.get("flash"));
  const pendingComments = await countPendingComments(env.DB).catch(() => 0);

  const html = renderEditorPage({
    email: auth.email,
    pendingComments,
    mode: "edit",
    post,
    flash,
  });
  return htmlResponse(html);
}

// ============ POST /admin/writing/edit/<slug> ============

export async function handleAdminPostSave(request: Request, env: Env, oldSlug: string): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;

  const form = await readForm(request);
  if (!form) return badRequest("invalid-form");
  const input = parsePostForm(form);
  if (typeof input === "string") return redirectFlash(`/admin/writing/edit/${oldSlug}`, "error", input);

  try {
    await updatePostBySlug(env.DB, oldSlug, input);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg.includes("UNIQUE")) return redirectFlash(`/admin/writing/edit/${oldSlug}`, "error", "slug-already-exists");
    if (msg === "post-not-found") return notFound();
    return redirectFlash(`/admin/writing/edit/${oldSlug}`, "error", "save-failed");
  }
  // Purge both old and new slug's cache (slug rename invalidates the previous URL).
  await Promise.all([
    purgeWritingCache(oldSlug),
    oldSlug !== input.slug ? purgeWritingCache(input.slug) : Promise.resolve(),
  ]).catch(() => {});
  return redirectFlash(`/admin/writing/edit/${input.slug}`, "ok", "saved");
}

// ============ POST /admin/writing/delete/<slug> ============

export async function handleAdminPostDelete(request: Request, env: Env, slug: string): Promise<Response> {
  const auth = await requireSession(request, env);
  if (auth instanceof Response) return auth;
  const ok = await deletePostBySlug(env.DB, slug);
  if (ok) await purgeWritingCache(slug).catch(() => {});
  return redirectFlash("/admin/writing/", ok ? "ok" : "error", ok ? "post-deleted" : "delete-failed");
}

// ============ POST /api/writing/preview ============

export async function handleAdminPreview(request: Request, env: Env): Promise<Response> {
  const session = await readRequestSession(env.DB, request);
  if (!session) {
    return jsonResponse({ ok: false, error: "unauthenticated" }, 401);
  }
  let body: { body_md?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid-json" }, 400);
  }
  const md = (body?.body_md ?? "").slice(0, 200_000);
  const result = renderMarkdown(md);
  const stats = computeWordStats(md);
  return jsonResponse({
    ok: true,
    html: result.html,
    word_count: stats.word_count,
    reading_time_min: stats.reading_time_min,
  });
}

// ============ Form helpers ============

async function readForm(request: Request): Promise<FormData | null> {
  try {
    const ct = request.headers.get("content-type") ?? "";
    if (!ct.includes("application/x-www-form-urlencoded") && !ct.includes("multipart/form-data")) {
      return null;
    }
    return await request.formData();
  } catch {
    return null;
  }
}

function parsePostForm(form: FormData): {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_key: string | null;
  cover_alt: string | null;
  body_md: string;
  status: PostStatus;
  tags: string[];
} | string {
  const title = String(form.get("title") ?? "").trim();
  if (!title) return "title-required";
  if (title.length > 200) return "title-too-long";

  let slug = normalizeSlug(String(form.get("slug") ?? ""));
  if (!slug) slug = normalizeSlug(title);
  if (!SLUG_RX.test(slug)) return "slug-invalid";

  const excerpt = trimOrNull(form.get("excerpt"), 280);
  const coverKey = trimOrNull(form.get("cover_image_key"), 200);
  const coverAlt = trimOrNull(form.get("cover_alt"), 200);
  const bodyMd = String(form.get("body_md") ?? "");
  if (!bodyMd.trim()) return "body-required";
  if (bodyMd.length > 200_000) return "body-too-long";

  const statusRaw = String(form.get("status") ?? "draft").toLowerCase();
  const status: PostStatus = statusRaw === "published" ? "published" : "draft";

  const tagsRaw = String(form.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => normalizeTag(t.trim()))
    .filter((t) => t.length > 0);

  return {
    slug,
    title,
    excerpt,
    cover_image_key: coverKey,
    cover_alt: coverAlt,
    body_md: bodyMd,
    status,
    tags,
  };
}

function trimOrNull(v: unknown, max: number): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

// ============ Response helpers ============

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex,nofollow",
    },
  });
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function badRequest(error: string): Response {
  return jsonResponse({ ok: false, error }, 400);
}

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

function redirectFlash(path: string, kind: "ok" | "error", text: string): Response {
  const url = `${path}?flash=${encodeURIComponent(`${kind}:${text}`)}`;
  return new Response(null, {
    status: 302,
    headers: { location: url, "cache-control": "no-store" },
  });
}

function decodeFlash(raw: string | null): { kind: "ok" | "error"; text: string } | undefined {
  if (!raw) return undefined;
  const idx = raw.indexOf(":");
  if (idx < 0) return undefined;
  const kindRaw = raw.slice(0, idx);
  const text = raw.slice(idx + 1);
  const kind = kindRaw === "ok" ? "ok" : "error";
  return { kind, text: prettifyFlash(text) };
}

function prettifyFlash(text: string): string {
  switch (text) {
    case "post-created": return "Post created.";
    case "saved": return "Saved.";
    case "post-deleted": return "Post deleted.";
    case "title-required": return "A title is required.";
    case "body-required": return "Body cannot be empty.";
    case "slug-invalid": return "Slug must be lowercase letters, numbers, hyphens (max 80).";
    case "slug-already-exists": return "That slug is already in use.";
    case "create-failed": return "Couldn't create the post. Try again.";
    case "save-failed": return "Couldn't save. Try again.";
    case "delete-failed": return "Couldn't delete the post.";
    default: return text;
  }
}
