/**
 * POST /api/chat
 *
 * Streams a chat response from Groq with tool-calling against the KB.
 * Logs the conversation + every message + every tool call to D1.
 *
 * Request body:
 *   {
 *     conversation_id?: string,   // omit on first turn; server creates one
 *     message: string             // <= 1000 chars
 *   }
 *
 * Response: text/event-stream of JSON-encoded ChatStreamEvent. See
 * worker/lib/groq.ts for the event shape.
 *
 * Limits enforced (free tier safe):
 *   - per-IP rate limit: 20 req/min on this route
 *   - per-conversation cap: 20 turns
 *   - per-message cap: 1000 characters
 *   - tool-call loop cap: 5 iterations
 */

import type { Env } from "../types";
import { runChatLoop, SSEWriter, type GroqMessage } from "../lib/groq";
import { TOOL_SCHEMAS, runTool } from "../lib/tools";
import { SYSTEM_PROMPT } from "../system-prompt";
import {
  addMessage,
  bumpMessageCount,
  checkRateLimit,
  createConversation,
  getConversationMessageCount,
} from "../lib/db";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 20;
const RATE_LIMIT_PER_MIN = 20;
const ALLOWED_ORIGINS = new Set<string>([
  "https://labs.codantrix.com",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
]);

export async function handleChat(request: Request, env: Env): Promise<Response> {
  // Origin enforcement (browser CORS already blocks reads, this also blocks
  // server-to-server abuse: only requests from allowlisted Origin or with
  // no Origin at all from non-browser tooling are accepted).
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonError(403, "origin-not-allowed");
  }

  // Body parse + validate
  let body: { conversation_id?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid-json");
  }
  const userMessage = (body?.message ?? "").trim();
  if (!userMessage) return jsonError(400, "message-required");
  if (userMessage.length > MAX_MESSAGE_CHARS) {
    return jsonError(400, `message-too-long (max ${MAX_MESSAGE_CHARS} chars)`);
  }

  // Secret check
  if (!env.GROQ_API_KEY) {
    return jsonError(503, "chat-not-configured", {
      hint: "GROQ_API_KEY secret not set. Run: wrangler secret put GROQ_API_KEY",
    });
  }

  // Rate limit by IP
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const rl = await checkRateLimit(env.DB, `chat:${ip}`, RATE_LIMIT_PER_MIN);
  if (!rl.allowed) {
    return jsonError(429, "rate-limited", {
      limit_per_min: RATE_LIMIT_PER_MIN,
      retry_after_s: 60,
    });
  }

  // Conversation: load or create
  const ipCountry = request.headers.get("cf-ipcountry");
  const userAgent = request.headers.get("user-agent");
  let conversationId = body.conversation_id?.trim() || "";
  let history: GroqMessage[] = [];

  if (conversationId) {
    const count = await getConversationMessageCount(env.DB, conversationId);
    if (count === null) {
      // Stale id — start fresh rather than 404, so the widget doesn't have to retry
      conversationId = await createConversation(env.DB, {
        page: "/book/",
        ipCountry,
        userAgent,
      });
    } else if (count >= MAX_TURNS * 2) {
      return jsonError(429, "conversation-full", {
        max_turns: MAX_TURNS,
        suggestion:
          "Start a new chat or book a scope call at https://calendly.com/hassanalimehdi.",
      });
    } else {
      history = await loadHistory(env.DB, conversationId);
    }
  } else {
    conversationId = await createConversation(env.DB, {
      page: "/book/",
      ipCountry,
      userAgent,
    });
  }

  // Persist user message before streaming starts (so we don't lose it on disconnect)
  await addMessage(env.DB, {
    conversationId,
    role: "user",
    content: userMessage,
  });
  await bumpMessageCount(env.DB, conversationId, 1);

  // Build the message stack
  const messages: GroqMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessage },
  ];

  // SSE pipe
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const sse = new SSEWriter(writer);

  // Open with a meta event so the client can pin the conversation_id
  await sse.send({ type: "meta", conversation_id: conversationId });

  // Run loop in the background; flush + close at the end
  const ctx = {
    db: env.DB,
    conversationId,
    calendlyToken: env.CALENDLY_TOKEN,
  };
  const loopPromise = (async () => {
    try {
      await runChatLoop({
        apiKey: env.GROQ_API_KEY,
        model: env.GROQ_MODEL,
        messages,
        tools: TOOL_SCHEMAS,
        sse,
        onToolCall: (name, args) => runTool(name, args, ctx),
        onToolMessagePersisted: async (name, args, result) => {
          await addMessage(env.DB, {
            conversationId,
            role: "tool",
            content: typeof result === "string" ? result : JSON.stringify(result),
            toolName: name,
            toolArgs: args,
          });
        },
        onFinalAssistant: async (text) => {
          if (text) {
            await addMessage(env.DB, {
              conversationId,
              role: "assistant",
              content: text,
            });
            await bumpMessageCount(env.DB, conversationId, 1);
          }
          await sse.send({ type: "done" });
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "chat-failed";
      await sse.send({ type: "error", message });
    } finally {
      await sse.close();
    }
  })();

  // Don't await loopPromise — we need to return the Response immediately so
  // the browser can start consuming the stream. The writer keeps the body
  // open until close().
  void loopPromise;

  return new Response(readable, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}

// ============ helpers ============

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

interface HistoryRow {
  role: string;
  content: string;
  tool_name: string | null;
  tool_args: string | null;
}

/**
 * Load the most recent N messages for a conversation, oldest-first.
 * We deliberately don't reconstruct OpenAI tool_call_id chains from history —
 * we only feed back user/assistant content. The model gets fresh tool calls
 * each turn, so dropping prior tool_calls is safe and simpler.
 */
async function loadHistory(
  db: import("@cloudflare/workers-types").D1Database,
  conversationId: string,
  limit = 30
): Promise<GroqMessage[]> {
  const stmt = db
    .prepare(
      `SELECT role, content, tool_name, tool_args
       FROM messages
       WHERE conversation_id = ? AND role IN ('user', 'assistant')
       ORDER BY id DESC
       LIMIT ?`
    )
    .bind(conversationId, limit);
  const result = await stmt.all<HistoryRow>();
  const rows = (result.results ?? []).reverse();
  return rows.map((r) => ({
    role: r.role as "user" | "assistant",
    content: r.content,
  }));
}
