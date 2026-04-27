/**
 * Public /writing/* routes.
 *
 *   GET /writing/                   → paginated index of published posts
 *   GET /writing/<slug>/            → single post + comments
 *   GET /writing/tag/<tag>/         → posts filtered by tag
 *   GET /sitemap.xml                → dynamic sitemap including writing posts
 *
 * All read responses set short edge-cache TTL via Cache-Control + the CF
 * Cache API (request-keyed). Cache purge on post save is handled by the
 * admin save handler (best-effort, fire-and-forget).
 */

import type { Env } from "../types";
import {
  getPostBySlugIfPublished,
  listPublishedPosts,
  listPublishedSlugs,
  listPublishedTags,
  listSiblingPosts,
  type PostListItem,
} from "../lib/posts";
import { listApprovedCommentsForPost } from "../lib/comments";
import { renderMarkdown } from "../lib/markdown";
import {
  renderPostPage,
  renderTagPage,
  renderWritingIndex,
  renderWritingNotFound,
} from "../lib/writing-templates";

const PAGE_CACHE_SECONDS = 300; // 5 min edge cache

// ============ /writing/ ============

export async function handleWritingIndex(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const cached = await readCache(request);
  if (cached) return cached;

  const [posts, tags] = await Promise.all([
    listPublishedPosts(env.DB, { limit: 50 }),
    listPublishedTags(env.DB),
  ]);
  const html = renderWritingIndex({
    posts,
    tags,
    r2PublicUrl: env.R2_PUBLIC_URL ?? "",
  });
  return saveCache(request, ctx, htmlResponse(html));
}

// ============ /writing/<slug>/ ============

export async function handleWritingPost(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  slug: string
): Promise<Response> {
  const cached = await readCache(request);
  if (cached) return cached;

  const post = await getPostBySlugIfPublished(env.DB, slug);
  if (!post) {
    return htmlResponse(renderWritingNotFound(), 404);
  }

  const [siblings, comments] = await Promise.all([
    listSiblingPosts(env.DB, slug, 3),
    listApprovedCommentsForPost(env.DB, post.id),
  ]);

  // Build internal-link resolver that maps a referenced slug → post title.
  // To keep this single-roundtrip, we don't query each [[slug]] individually;
  // instead we look up the unique set after a first markdown pass.
  const firstPass = renderMarkdown(post.body_md);
  let resolverMap = new Map<string, string>();
  if (firstPass.internalLinks.length > 0) {
    const placeholders = firstPass.internalLinks.map(() => "?").join(",");
    const res = await env.DB
      .prepare(`SELECT slug, title FROM posts WHERE slug IN (${placeholders}) AND status = 'published'`)
      .bind(...firstPass.internalLinks)
      .all<{ slug: string; title: string }>();
    for (const r of res.results ?? []) resolverMap.set(r.slug, r.title);
  }
  const finalRender = renderMarkdown(post.body_md, {
    resolveInternalLink: (s) => resolverMap.get(s) ?? null,
  });

  const html = renderPostPage({
    post,
    bodyHtml: finalRender.html,
    siblings,
    approvedComments: comments,
    r2PublicUrl: env.R2_PUBLIC_URL ?? "",
  });
  return saveCache(request, ctx, htmlResponse(html));
}

// ============ /writing/tag/<tag>/ ============

export async function handleWritingTag(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  tag: string
): Promise<Response> {
  const cached = await readCache(request);
  if (cached) return cached;

  const posts = await listPublishedPosts(env.DB, { tag, limit: 100 });
  if (posts.length === 0) {
    // Render an empty tag page rather than 404 — link from a misspelled tag
    // chip elsewhere will still get a usable page back to /writing/.
  }
  const html = renderTagPage({
    tag,
    posts,
    totalCount: posts.length,
    r2PublicUrl: env.R2_PUBLIC_URL ?? "",
  });
  return saveCache(request, ctx, htmlResponse(html));
}

// ============ /writing/rss.xml ============

export async function handleWritingRss(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const cached = await readCache(request);
  if (cached) return cached;

  // Last 20 published posts; full body NOT included (we send excerpt only).
  // Readers who want the full post follow the link — keeps the feed light
  // and stops aggregators from skipping the canonical pageview.
  const posts = await listPublishedPosts(env.DB, { limit: 20 });
  const r2 = (env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");
  const now = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = `https://labs.codantrix.com/writing/${p.slug}/`;
      const pubDate = p.published_at
        ? new Date(p.published_at).toUTCString()
        : new Date(p.updated_at).toUTCString();
      const description = p.excerpt ?? p.title;
      const cover = p.cover_image_key && r2
        ? `<enclosure url="${escapeXml(r2 + "/" + p.cover_image_key)}" type="image/jpeg" />`
        : "";
      const cats = p.tags
        .map((t) => `    <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${escapeXml(link)}</link>
    <guid isPermaLink="true">${escapeXml(link)}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(description)}</description>
${cats}
    ${cover}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Codantrix Labs — Writing</title>
  <link>https://labs.codantrix.com/writing/</link>
  <atom:link href="https://labs.codantrix.com/writing/rss.xml" rel="self" type="application/rss+xml" />
  <description>Field notes from shipping production agentic systems. Architecture, evaluation, cost, and the parts that do not fit a tweet.</description>
  <language>en</language>
  <lastBuildDate>${now}</lastBuildDate>
  <generator>Codantrix Labs Worker</generator>
${items}
</channel>
</rss>`;

  const res = new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": `public, max-age=${PAGE_CACHE_SECONDS}, s-maxage=${PAGE_CACHE_SECONDS}`,
    },
  });
  return saveCache(request, ctx, res);
}

// ============ /sitemap.xml ============

export async function handleSitemap(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const cached = await readCache(request);
  if (cached) return cached;

  // Static URLs (matches what was previously hand-maintained in site/sitemap.xml)
  const staticUrls: { loc: string; lastmod: string; priority: string }[] = [
    { loc: "https://labs.codantrix.com/", lastmod: "2026-04-27", priority: "1.0" },
    { loc: "https://labs.codantrix.com/studio/", lastmod: "2026-04-27", priority: "0.9" },
    { loc: "https://labs.codantrix.com/work/", lastmod: "2026-04-27", priority: "0.9" },
    { loc: "https://labs.codantrix.com/founder/", lastmod: "2026-04-27", priority: "0.9" },
    { loc: "https://labs.codantrix.com/book/", lastmod: "2026-04-27", priority: "0.9" },
    { loc: "https://labs.codantrix.com/writing/", lastmod: today(), priority: "0.9" },
    { loc: "https://labs.codantrix.com/work/tenant-ops-copilot/", lastmod: "2026-04-27", priority: "0.7" },
    { loc: "https://labs.codantrix.com/work/dispatch-agent/", lastmod: "2026-04-27", priority: "0.7" },
    { loc: "https://labs.codantrix.com/work/estimation-copilot/", lastmod: "2026-04-27", priority: "0.7" },
    { loc: "https://labs.codantrix.com/work/study-agent/", lastmod: "2026-04-27", priority: "0.7" },
    { loc: "https://labs.codantrix.com/work/bilingual-doc-pipeline/", lastmod: "2026-04-27", priority: "0.7" },
    { loc: "https://labs.codantrix.com/privacy/", lastmod: "2026-04-27", priority: "0.3" },
    { loc: "https://labs.codantrix.com/terms/", lastmod: "2026-04-27", priority: "0.3" },
  ];

  const slugs = await listPublishedSlugs(env.DB).catch(() => []);
  for (const s of slugs) {
    const lastmod = isoDate(s.updated_at || s.published_at);
    staticUrls.push({
      loc: `https://labs.codantrix.com/writing/${s.slug}/`,
      lastmod,
      priority: "0.7",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(
    (u) =>
      `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const res = new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": `public, max-age=${PAGE_CACHE_SECONDS}, s-maxage=${PAGE_CACHE_SECONDS}`,
    },
  });
  return saveCache(request, ctx, res);
}

// ============ Cache helpers ============

async function readCache(request: Request): Promise<Response | null> {
  // Only cache GET. Authenticated reads (with our session cookie) bypass cache.
  if (request.method !== "GET") return null;
  if (request.headers.get("cookie")?.includes("cdx_admin_session=")) return null;
  const key = new Request(request.url, { method: "GET" });
  const cached = await caches.default.match(key);
  if (!cached) return null;
  const cloned = new Response(cached.body, cached);
  cloned.headers.set("cf-cache-status", "HIT");
  return cloned;
}

function saveCache(request: Request, ctx: ExecutionContext, response: Response): Response {
  if (request.method !== "GET" || response.status >= 400) return response;
  if (request.headers.get("cookie")?.includes("cdx_admin_session=")) return response;
  const respClone = response.clone();
  const key = new Request(request.url, { method: "GET" });
  ctx.waitUntil(caches.default.put(key, respClone));
  return response;
}

/** Best-effort cache invalidation called from admin on save/delete. */
export async function purgeWritingCache(slug: string | null): Promise<void> {
  const keys = [
    "https://labs.codantrix.com/writing/",
    "https://codantrix-labs.hassanalimehdi30.workers.dev/writing/",
    "https://labs.codantrix.com/sitemap.xml",
    "https://codantrix-labs.hassanalimehdi30.workers.dev/sitemap.xml",
    "https://labs.codantrix.com/writing/rss.xml",
    "https://codantrix-labs.hassanalimehdi30.workers.dev/writing/rss.xml",
  ];
  if (slug) {
    keys.push(`https://labs.codantrix.com/writing/${slug}/`);
    keys.push(`https://codantrix-labs.hassanalimehdi30.workers.dev/writing/${slug}/`);
  }
  await Promise.all(
    keys.map((u) => caches.default.delete(new Request(u, { method: "GET" })).catch(() => false))
  );
}

// ============ Response helpers ============

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": status >= 400
        ? "no-store"
        : `public, max-age=${PAGE_CACHE_SECONDS}, s-maxage=${PAGE_CACHE_SECONDS}`,
      "x-frame-options": "DENY",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(ms: number): string {
  if (!ms) return today();
  return new Date(ms).toISOString().slice(0, 10);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Re-export for admin route to call on save.
export const _internalCacheUtilities = { saveCache, readCache };
