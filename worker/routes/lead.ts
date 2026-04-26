/**
 * POST /api/lead
 *
 * Standalone lead capture (works with or without an active conversation).
 * The chat assistant has its own capture_lead tool; this route exists for
 * the "Email follow-up instead" form that visitors who skip the chat may
 * still want.
 *
 * Request body:
 *   {
 *     email: string,
 *     name?: string,
 *     context?: string,
 *     conversation_id?: string  // optional — if visitor was in a chat
 *   }
 *
 * Response: JSON { ok, inserted } on success, or { ok: false, error } on
 * validation / rate-limit failure.
 */

import type { Env } from "../types";
import { checkRateLimit, insertLead } from "../lib/db";

const MAX_FIELD_CHARS = 500;
const RATE_LIMIT_PER_MIN = 5;
const ALLOWED_ORIGINS = new Set<string>([
  "https://labs.codantrix.com",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
]);

export async function handleLead(request: Request, env: Env): Promise<Response> {
  // Origin enforcement
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonError(403, "origin-not-allowed");
  }

  let body: {
    email?: string;
    name?: string;
    context?: string;
    conversation_id?: string;
  };
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid-json");
  }

  const email = (body?.email ?? "").trim().toLowerCase();
  const name = (body?.name ?? "").trim().slice(0, MAX_FIELD_CHARS) || null;
  const context = (body?.context ?? "").trim().slice(0, MAX_FIELD_CHARS) || null;
  const conversationId = (body?.conversation_id ?? "").trim() || null;

  if (!email) return jsonError(400, "email-required");
  if (email.length > MAX_FIELD_CHARS) return jsonError(400, "email-too-long");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError(400, "email-format-invalid");
  }

  // Rate limit by IP
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const rl = await checkRateLimit(env.DB, `lead:${ip}`, RATE_LIMIT_PER_MIN);
  if (!rl.allowed) {
    return jsonError(429, "rate-limited", {
      limit_per_min: RATE_LIMIT_PER_MIN,
      retry_after_s: 60,
    });
  }

  const result = await insertLead(env.DB, {
    conversationId,
    email,
    name,
    context,
  });

  return new Response(
    JSON.stringify({
      ok: true,
      inserted: result.inserted,
      message: result.inserted
        ? "Saved. Hassan will follow up within one business day."
        : "Already on file from the last 24 hours. We'll be in touch.",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
}

function jsonError(
  status: number,
  error: string,
  extra: Record<string, unknown> = {}
): Response {
  return new Response(
    JSON.stringify({ ok: false, error, ...extra }),
    {
      status,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
}
