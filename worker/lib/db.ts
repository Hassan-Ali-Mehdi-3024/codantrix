/**
 * D1 helpers for the chat assistant + lead capture + rate limiting.
 *
 * Schema lives in schema/0001_init.sql (conversations, messages, leads)
 * and schema/0002_rate_limit.sql (rate_limit). Apply with:
 *   wrangler d1 execute codantrix-labs-db --remote --file=./schema/...
 */

import type { D1Database } from "@cloudflare/workers-types";

// ============ CONVERSATIONS ============

export interface ConversationInit {
  page: string;
  ipCountry: string | null;
  userAgent: string | null;
}

/**
 * Create a new conversation row. Returns the generated UUID.
 * UUID generation uses crypto.randomUUID() which is available in CF Workers.
 */
export async function createConversation(
  db: D1Database,
  init: ConversationInit
): Promise<string> {
  const id = crypto.randomUUID();
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO conversations (id, created_at, page, ip_country, user_agent, message_count)
       VALUES (?, ?, ?, ?, ?, 0)`
    )
    .bind(id, now, init.page, init.ipCountry, init.userAgent)
    .run();
  return id;
}

/**
 * Bump message_count on a conversation. Best-effort; ignored if the conv id
 * does not exist (a stale id from the client).
 */
export async function bumpMessageCount(
  db: D1Database,
  conversationId: string,
  by = 1
): Promise<void> {
  await db
    .prepare(
      `UPDATE conversations SET message_count = message_count + ? WHERE id = ?`
    )
    .bind(by, conversationId)
    .run();
}

/**
 * Verify that a conversation exists and return its current message_count.
 * Returns null if not found.
 */
export async function getConversationMessageCount(
  db: D1Database,
  conversationId: string
): Promise<number | null> {
  const row = await db
    .prepare(`SELECT message_count FROM conversations WHERE id = ?`)
    .bind(conversationId)
    .first<{ message_count: number }>();
  return row?.message_count ?? null;
}

// ============ MESSAGES ============

export type MessageRole = "user" | "assistant" | "tool";

export interface MessageInit {
  conversationId: string;
  role: MessageRole;
  content: string;
  toolName?: string;
  toolArgs?: unknown;          // serialized to JSON
}

export async function addMessage(
  db: D1Database,
  init: MessageInit
): Promise<void> {
  const now = Date.now();
  const toolArgs = init.toolArgs === undefined ? null : JSON.stringify(init.toolArgs);
  await db
    .prepare(
      `INSERT INTO messages (conversation_id, role, content, tool_name, tool_args, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(
      init.conversationId,
      init.role,
      init.content,
      init.toolName ?? null,
      toolArgs,
      now
    )
    .run();
}

// ============ LEADS ============

export interface LeadInit {
  conversationId: string | null;
  email: string;
  name: string | null;
  context: string | null;
}

/**
 * Insert a lead. Dedupes by (email, 24h window) — if the same email was
 * captured in the last day, the new row is skipped (returns false).
 */
export async function insertLead(
  db: D1Database,
  init: LeadInit
): Promise<{ inserted: boolean }> {
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;
  const existing = await db
    .prepare(
      `SELECT id FROM leads WHERE email = ? AND created_at > ? LIMIT 1`
    )
    .bind(init.email.toLowerCase(), dayAgo)
    .first();
  if (existing) return { inserted: false };

  await db
    .prepare(
      `INSERT INTO leads (conversation_id, email, name, context, created_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(
      init.conversationId,
      init.email.toLowerCase(),
      init.name,
      init.context,
      now
    )
    .run();
  return { inserted: true };
}

// ============ RATE LIMIT ============

/**
 * Check + atomically increment a per-(key, minute) counter. Returns:
 *   { allowed: true,  count }   if the increment kept count <= limitPerMinute
 *   { allowed: false, count }   if the limit was already reached
 *
 * Old buckets (older than 5 minutes) are pruned opportunistically when
 * we successfully increment a fresh bucket. This keeps the table small
 * without a scheduled job.
 */
export async function checkRateLimit(
  db: D1Database,
  key: string,
  limitPerMinute: number
): Promise<{ allowed: boolean; count: number }> {
  const bucket = Math.floor(Date.now() / 1000 / 60);

  // INSERT … ON CONFLICT: bump the counter atomically. SQLite returns the
  // updated row when we use RETURNING.
  const row = await db
    .prepare(
      `INSERT INTO rate_limit (key, bucket, count) VALUES (?, ?, 1)
       ON CONFLICT(key, bucket) DO UPDATE SET count = count + 1
       RETURNING count`
    )
    .bind(key, bucket)
    .first<{ count: number }>();

  const count = row?.count ?? 1;
  const allowed = count <= limitPerMinute;

  // Best-effort prune of buckets older than 5 minutes. Fire-and-forget;
  // ignore errors. Only prune occasionally to avoid spamming D1.
  if (allowed && (count === 1 || count % 10 === 0)) {
    const cutoff = bucket - 5;
    db.prepare(`DELETE FROM rate_limit WHERE bucket < ?`)
      .bind(cutoff)
      .run()
      .catch(() => {});
  }

  return { allowed, count };
}
