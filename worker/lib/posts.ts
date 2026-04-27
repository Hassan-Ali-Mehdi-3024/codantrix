/**
 * D1 helpers for the /writing system: posts and post_tags CRUD.
 *
 * Schema in schema/0003_writing_posts.sql. Slugs are lowercase-kebab and
 * unique; tags are normalized to lowercase-kebab on save (caller responsibility
 * via normalizeTag()).
 */

import type { D1Database } from "@cloudflare/workers-types";

// ============ Types ============

export type PostStatus = "draft" | "published";

export interface PostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_key: string | null;
  cover_alt: string | null;
  body_md: string;
  status: PostStatus;
  published_at: number | null;
  created_at: number;
  updated_at: number;
  reading_time_min: number | null;
  word_count: number | null;
}

export interface PostWithTags extends PostRow {
  tags: string[];
}

export interface PostListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_key: string | null;
  cover_alt: string | null;
  status: PostStatus;
  published_at: number | null;
  updated_at: number;
  reading_time_min: number | null;
  tags: string[];
}

export interface PostInput {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_key: string | null;
  cover_alt: string | null;
  body_md: string;
  status: PostStatus;
  tags: string[];
}

// ============ Slug + tag normalization ============

/**
 * Normalize a slug or tag to lowercase-kebab. Strips diacritics, collapses
 * runs of non-alphanumerics to single hyphens, trims leading/trailing hyphens.
 */
export function normalizeSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")    // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const normalizeTag = normalizeSlug;

// ============ Word count + read time ============

/**
 * Quick word count from raw markdown source. Strips fenced code blocks first
 * (so a 200-line code dump doesn't inflate read time) and collapses
 * whitespace. Reading speed ~220 wpm per spec.
 */
export function computeWordStats(markdown: string): {
  word_count: number;
  reading_time_min: number;
} {
  const stripped = markdown.replace(/```[\s\S]*?```/g, " ");
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  return {
    word_count: words,
    reading_time_min: Math.max(1, Math.ceil(words / 220)),
  };
}

// ============ CRUD ============

/**
 * Create a new post. Inserts the post row, then upserts post_tags. Returns
 * the new id. Caller passes a normalized slug; we re-normalize defensively.
 */
export async function createPost(db: D1Database, input: PostInput): Promise<number> {
  const slug = normalizeSlug(input.slug);
  if (!slug) throw new Error("slug-required");
  const now = Date.now();
  const stats = computeWordStats(input.body_md);
  const publishedAt =
    input.status === "published" ? now : null;

  const row = await db
    .prepare(
      `INSERT INTO posts
         (slug, title, excerpt, cover_image_key, cover_alt, body_md,
          status, published_at, created_at, updated_at, reading_time_min, word_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING id`
    )
    .bind(
      slug,
      input.title,
      input.excerpt,
      input.cover_image_key,
      input.cover_alt,
      input.body_md,
      input.status,
      publishedAt,
      now,
      now,
      stats.reading_time_min,
      stats.word_count
    )
    .first<{ id: number }>();
  if (!row) throw new Error("post-insert-failed");

  await replacePostTags(db, row.id, input.tags);
  return row.id;
}

/**
 * Update an existing post by slug. Tags are replaced wholesale. If status
 * transitions draft → published, stamp published_at to now (unless already
 * published, in which case we keep the original date).
 */
export async function updatePostBySlug(
  db: D1Database,
  oldSlug: string,
  input: PostInput
): Promise<void> {
  const newSlug = normalizeSlug(input.slug);
  if (!newSlug) throw new Error("slug-required");
  const now = Date.now();
  const stats = computeWordStats(input.body_md);

  const existing = await db
    .prepare(`SELECT id, status, published_at FROM posts WHERE slug = ? LIMIT 1`)
    .bind(oldSlug)
    .first<{ id: number; status: PostStatus; published_at: number | null }>();
  if (!existing) throw new Error("post-not-found");

  let publishedAt = existing.published_at;
  if (input.status === "published" && existing.status !== "published") {
    publishedAt = now;
  } else if (input.status === "draft") {
    // Going draft again clears published_at so the index doesn't list it.
    publishedAt = null;
  }

  await db
    .prepare(
      `UPDATE posts SET
         slug = ?, title = ?, excerpt = ?, cover_image_key = ?, cover_alt = ?,
         body_md = ?, status = ?, published_at = ?, updated_at = ?,
         reading_time_min = ?, word_count = ?
       WHERE id = ?`
    )
    .bind(
      newSlug,
      input.title,
      input.excerpt,
      input.cover_image_key,
      input.cover_alt,
      input.body_md,
      input.status,
      publishedAt,
      now,
      stats.reading_time_min,
      stats.word_count,
      existing.id
    )
    .run();

  await replacePostTags(db, existing.id, input.tags);
}

export async function deletePostBySlug(db: D1Database, slug: string): Promise<boolean> {
  const res = await db
    .prepare(`DELETE FROM posts WHERE slug = ?`)
    .bind(slug)
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

async function replacePostTags(db: D1Database, postId: number, tags: string[]): Promise<void> {
  await db.prepare(`DELETE FROM post_tags WHERE post_id = ?`).bind(postId).run();
  const seen = new Set<string>();
  for (const raw of tags) {
    const t = normalizeTag(raw);
    if (!t || seen.has(t)) continue;
    seen.add(t);
    await db
      .prepare(`INSERT OR IGNORE INTO post_tags (post_id, tag) VALUES (?, ?)`)
      .bind(postId, t)
      .run();
  }
}

// ============ Read queries ============

export async function getPostBySlug(
  db: D1Database,
  slug: string
): Promise<PostWithTags | null> {
  const row = await db
    .prepare(`SELECT * FROM posts WHERE slug = ? LIMIT 1`)
    .bind(slug)
    .first<PostRow>();
  if (!row) return null;
  const tags = await getTagsForPost(db, row.id);
  return { ...row, tags };
}

export async function getPostBySlugIfPublished(
  db: D1Database,
  slug: string
): Promise<PostWithTags | null> {
  const row = await db
    .prepare(`SELECT * FROM posts WHERE slug = ? AND status = 'published' LIMIT 1`)
    .bind(slug)
    .first<PostRow>();
  if (!row) return null;
  const tags = await getTagsForPost(db, row.id);
  return { ...row, tags };
}

async function getTagsForPost(db: D1Database, postId: number): Promise<string[]> {
  const res = await db
    .prepare(`SELECT tag FROM post_tags WHERE post_id = ? ORDER BY tag`)
    .bind(postId)
    .all<{ tag: string }>();
  return (res.results ?? []).map((r) => r.tag);
}

/**
 * List all posts for the admin (any status). Newest activity first.
 */
export async function listAllPostsAdmin(db: D1Database): Promise<PostListItem[]> {
  const res = await db
    .prepare(
      `SELECT id, slug, title, excerpt, cover_image_key, cover_alt,
              status, published_at, updated_at, reading_time_min
       FROM posts
       ORDER BY updated_at DESC
       LIMIT 200`
    )
    .all<Omit<PostListItem, "tags">>();
  return await attachTags(db, res.results ?? []);
}

/**
 * List published posts for the public index. Newest published first.
 */
export async function listPublishedPosts(
  db: D1Database,
  opts: { limit?: number; offset?: number; tag?: string } = {}
): Promise<PostListItem[]> {
  const limit = Math.min(opts.limit ?? 50, 100);
  const offset = Math.max(opts.offset ?? 0, 0);
  let rows: Omit<PostListItem, "tags">[] = [];
  if (opts.tag) {
    const res = await db
      .prepare(
        `SELECT p.id, p.slug, p.title, p.excerpt, p.cover_image_key, p.cover_alt,
                p.status, p.published_at, p.updated_at, p.reading_time_min
         FROM posts p
         JOIN post_tags pt ON pt.post_id = p.id
         WHERE p.status = 'published' AND pt.tag = ?
         ORDER BY p.published_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(opts.tag, limit, offset)
      .all<Omit<PostListItem, "tags">>();
    rows = res.results ?? [];
  } else {
    const res = await db
      .prepare(
        `SELECT id, slug, title, excerpt, cover_image_key, cover_alt,
                status, published_at, updated_at, reading_time_min
         FROM posts
         WHERE status = 'published'
         ORDER BY published_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(limit, offset)
      .all<Omit<PostListItem, "tags">>();
    rows = res.results ?? [];
  }
  return await attachTags(db, rows);
}

/**
 * Get all tags currently attached to at least one published post. Returns
 * sorted by post count desc, then alpha. Used for the tag-chip bar on /writing.
 */
export async function listPublishedTags(
  db: D1Database
): Promise<{ tag: string; count: number }[]> {
  const res = await db
    .prepare(
      `SELECT pt.tag AS tag, COUNT(DISTINCT pt.post_id) AS count
       FROM post_tags pt
       JOIN posts p ON p.id = pt.post_id
       WHERE p.status = 'published'
       GROUP BY pt.tag
       ORDER BY count DESC, pt.tag ASC`
    )
    .all<{ tag: string; count: number }>();
  return res.results ?? [];
}

/**
 * Used for /writing/<slug>/ "More writing" — the 3 most recent published
 * siblings excluding the current post.
 */
export async function listSiblingPosts(
  db: D1Database,
  excludeSlug: string,
  limit = 3
): Promise<PostListItem[]> {
  const res = await db
    .prepare(
      `SELECT id, slug, title, excerpt, cover_image_key, cover_alt,
              status, published_at, updated_at, reading_time_min
       FROM posts
       WHERE status = 'published' AND slug != ?
       ORDER BY published_at DESC
       LIMIT ?`
    )
    .bind(excludeSlug, limit)
    .all<Omit<PostListItem, "tags">>();
  return await attachTags(db, res.results ?? []);
}

/**
 * Used for sitemap generation: just slugs + last-published timestamps for
 * every published post.
 */
export async function listPublishedSlugs(
  db: D1Database
): Promise<{ slug: string; published_at: number; updated_at: number }[]> {
  const res = await db
    .prepare(
      `SELECT slug, published_at, updated_at FROM posts
       WHERE status = 'published'
       ORDER BY published_at DESC`
    )
    .all<{ slug: string; published_at: number; updated_at: number }>();
  return res.results ?? [];
}

async function attachTags<T extends { id: number }>(
  db: D1Database,
  rows: T[]
): Promise<(T & { tags: string[] })[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const placeholders = ids.map(() => "?").join(",");
  const res = await db
    .prepare(
      `SELECT post_id, tag FROM post_tags WHERE post_id IN (${placeholders}) ORDER BY tag`
    )
    .bind(...ids)
    .all<{ post_id: number; tag: string }>();
  const byId = new Map<number, string[]>();
  for (const r of res.results ?? []) {
    const list = byId.get(r.post_id) ?? [];
    list.push(r.tag);
    byId.set(r.post_id, list);
  }
  return rows.map((r) => ({ ...r, tags: byId.get(r.id) ?? [] }));
}
