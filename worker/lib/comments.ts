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
