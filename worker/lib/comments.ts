/**
 * D1 helpers for the /writing comments system.
 *
 * Schema in schema/0005_writing_comments.sql:
 *   comments              — name + email + body, tied to a post
 *   verified_emails       — 90-day cache: skip verification on repeat
 *   comment_verify_tokens — single-use, 24h TTL email-verification tokens
 *
 * Status flow:
 *   pending_unverified → pending → approved | rejected
 *
 * Functions catch missing-table errors and return safe defaults so admin
 * surfaces don't break before migration 0005 has been applied.
 */

import type { D1Database } from "@cloudflare/workers-types";

// ============ Types ============

export type CommentStatus = "pending_unverified" | "pending" | "approved" | "rejected";

export interface CommentRow {
  id: number;
  author_name: string;
  body: string;
  created_at: number;
}

export interface AdminCommentRow {
  id: number;
  post_id: number;
  post_slug: string;
  post_title: string;
  author_name: string;
  author_email: string;
  body: string;
  status: CommentStatus;
  created_at: number;
  approved_at: number | null;
}

export interface PostCommentInit {
  postId: number;
  authorName: string;
  authorEmail: string;
  body: string;
  ipCountry: string | null;
  userAgent: string | null;
  /** If true, the email is already verified — comment lands directly in 'pending'. */
  emailVerified: boolean;
}

export interface PostCommentResult {
  commentId: number;
  status: CommentStatus;
  /** Token to send to the user IF status === pending_unverified. */
  verifyToken?: string;
  verifyTokenExpiresAt?: number;
}

// ============ Constants ============

const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;   // 24 hours
const VERIFIED_EMAIL_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

// ============ Read paths used by public + admin ============

export async function countPendingComments(db: D1Database): Promise<number> {
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM comments WHERE status = 'pending'`)
      .first<{ n: number }>();
    return row?.n ?? 0;
  } catch {
    return 0;
  }
}

export async function listApprovedCommentsForPost(
  db: D1Database,
  postId: number
): Promise<CommentRow[]> {
  try {
    const res = await db
      .prepare(
        `SELECT id, author_name, body, created_at FROM comments
         WHERE post_id = ? AND status = 'approved'
         ORDER BY created_at ASC`
      )
      .bind(postId)
      .all<CommentRow>();
    return res.results ?? [];
  } catch {
    return [];
  }
}

export async function listAdminComments(
  db: D1Database,
  filter: "pending" | "approved" | "rejected" | "all"
): Promise<AdminCommentRow[]> {
  try {
    let sql = `SELECT c.id, c.post_id, c.author_name, c.author_email, c.body, c.status,
                      c.created_at, c.approved_at, p.slug AS post_slug, p.title AS post_title
               FROM comments c JOIN posts p ON p.id = c.post_id`;
    const binds: unknown[] = [];
    if (filter === "pending") {
      sql += ` WHERE c.status = ?`; binds.push("pending");
    } else if (filter === "approved") {
      sql += ` WHERE c.status = ?`; binds.push("approved");
    } else if (filter === "rejected") {
      sql += ` WHERE c.status = ?`; binds.push("rejected");
    } else {
      // 'all' excludes pending_unverified — those are noise until the user
      // clicks the link.
      sql += ` WHERE c.status != 'pending_unverified'`;
    }
    sql += ` ORDER BY c.created_at DESC LIMIT 200`;
    const res = await db.prepare(sql).bind(...binds).all<AdminCommentRow>();
    return res.results ?? [];
  } catch {
    return [];
  }
}

// ============ Write paths ============

/**
 * Insert a comment. If emailVerified is true (90-day cache hit), the comment
 * lands in 'pending' and no token is created. Otherwise it lands in
 * 'pending_unverified' and a single-use token is generated for the email
 * verification round-trip.
 */
export async function postComment(
  db: D1Database,
  init: PostCommentInit
): Promise<PostCommentResult> {
  const now = Date.now();
  const status: CommentStatus = init.emailVerified ? "pending" : "pending_unverified";
  const row = await db
    .prepare(
      `INSERT INTO comments
         (post_id, author_name, author_email, body, status, created_at, ip_country, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING id`
    )
    .bind(
      init.postId,
      init.authorName,
      init.authorEmail.toLowerCase(),
      init.body,
      status,
      now,
      init.ipCountry,
      init.userAgent
    )
    .first<{ id: number }>();
  if (!row) throw new Error("comment-insert-failed");

  if (init.emailVerified) {
    return { commentId: row.id, status: "pending" };
  }

  const token = generateHexToken();
  const expiresAt = now + VERIFY_TOKEN_TTL_MS;
  await db
    .prepare(
      `INSERT INTO comment_verify_tokens (token, comment_id, email, expires_at, consumed_at, created_at)
       VALUES (?, ?, ?, ?, NULL, ?)`
    )
    .bind(token, row.id, init.authorEmail.toLowerCase(), expiresAt, now)
    .run();
  return {
    commentId: row.id,
    status: "pending_unverified",
    verifyToken: token,
    verifyTokenExpiresAt: expiresAt,
  };
}

/**
 * Atomically consume a comment-verification token. On success: marks the
 * token consumed, promotes the comment to 'pending', and stamps the email
 * into verified_emails for 90 days. Returns the comment row + post info or
 * null on invalid/expired/already-consumed.
 */
export async function consumeCommentVerifyToken(
  db: D1Database,
  token: string
): Promise<{
  commentId: number;
  postSlug: string;
  email: string;
} | null> {
  const now = Date.now();
  const row = await db
    .prepare(
      `UPDATE comment_verify_tokens
         SET consumed_at = ?
       WHERE token = ?
         AND consumed_at IS NULL
         AND expires_at > ?
       RETURNING comment_id, email`
    )
    .bind(now, token, now)
    .first<{ comment_id: number; email: string }>();
  if (!row) return null;

  // Promote the comment.
  await db
    .prepare(`UPDATE comments SET status = 'pending' WHERE id = ? AND status = 'pending_unverified'`)
    .bind(row.comment_id)
    .run();

  // Cache the verified email.
  const expiresAt = now + VERIFIED_EMAIL_TTL_MS;
  await db
    .prepare(
      `INSERT INTO verified_emails (email, verified_at, expires_at)
       VALUES (?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET verified_at = excluded.verified_at, expires_at = excluded.expires_at`
    )
    .bind(row.email, now, expiresAt)
    .run();

  // Find the post slug for the redirect.
  const post = await db
    .prepare(
      `SELECT p.slug AS slug FROM comments c JOIN posts p ON p.id = c.post_id WHERE c.id = ?`
    )
    .bind(row.comment_id)
    .first<{ slug: string }>();
  return {
    commentId: row.comment_id,
    postSlug: post?.slug ?? "",
    email: row.email,
  };
}

/** Returns true iff the email is currently in the 90-day verified cache. */
export async function isEmailVerified(db: D1Database, email: string): Promise<boolean> {
  const now = Date.now();
  const row = await db
    .prepare(`SELECT 1 AS one FROM verified_emails WHERE email = ? AND expires_at > ? LIMIT 1`)
    .bind(email.toLowerCase(), now)
    .first<{ one: number }>();
  return !!row;
}

export async function setCommentStatus(
  db: D1Database,
  id: number,
  status: "approved" | "rejected" | "pending"
): Promise<boolean> {
  const now = Date.now();
  const approvedAt = status === "approved" ? now : null;
  const res = await db
    .prepare(`UPDATE comments SET status = ?, approved_at = ? WHERE id = ?`)
    .bind(status, approvedAt, id)
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

export async function deleteCommentById(db: D1Database, id: number): Promise<boolean> {
  const res = await db.prepare(`DELETE FROM comments WHERE id = ?`).bind(id).run();
  return (res.meta?.changes ?? 0) > 0;
}

export async function getCommentById(
  db: D1Database,
  id: number
): Promise<{ id: number; post_id: number; post_slug: string } | null> {
  const row = await db
    .prepare(
      `SELECT c.id AS id, c.post_id AS post_id, p.slug AS post_slug
       FROM comments c JOIN posts p ON p.id = c.post_id WHERE c.id = ? LIMIT 1`
    )
    .bind(id)
    .first<{ id: number; post_id: number; post_slug: string }>();
  return row ?? null;
}

// ============ Token gen ============

function generateHexToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  const hex: string[] = new Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    hex[i] = (buf[i] as number).toString(16).padStart(2, "0");
  }
  return hex.join("");
}
