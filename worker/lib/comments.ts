/**
 * D1 helpers for the /writing comments system.
 *
 * Phase W2 stub — only countPendingComments is exported because the admin
 * shell shows a "Pending: N" badge on the Comments tab. The full schema
 * (migration 0005) and the rest of these helpers land in Phase W4.
 *
 * Until 0005 is applied, the table doesn't exist and the count query throws —
 * we catch and return 0 so the admin UI doesn't break. After W4 ships, this
 * file is fleshed out with post/list/moderate helpers.
 */

import type { D1Database } from "@cloudflare/workers-types";

export interface CommentRow {
  id: number;
  author_name: string;
  body: string;
  created_at: number;
}

export async function countPendingComments(db: D1Database): Promise<number> {
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM comments WHERE status = 'pending'`)
      .first<{ n: number }>();
    return row?.n ?? 0;
  } catch {
    // Table missing (W4 migration not applied yet) → no pending.
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
