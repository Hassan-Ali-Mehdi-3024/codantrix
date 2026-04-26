/**
 * LLM streaming client + tool-calling loop.
 *
 * Provider-agnostic by virtue of OpenAI-compatible request/response shape.
 *
 * Provider history (2026-04-26):
 *   morning: Groq llama-3.1-8b-instant (direct, hit TPM ceiling under test load)
 *   noon:    OpenRouter google/gemma-4-31b-it:free (upstream Google AI Studio
 *            shared pool 429s)
 *   pm:      OpenRouter meta-llama/llama-3.3-70b-instruct:free (Venice
 *            shared pool 429s)
 *   evening: Groq llama-3.3-70b-versatile (direct, our own free quota,
 *            no shared upstream pool — stable for low-volume /book widget)
 *
 * Internal types still carry 'Groq' prefix for historical reasons; the
 * wire format is identical between Groq / OpenAI / OpenRouter, so renaming
 * would be cosmetic churn.
 *
 * Streams response tokens as they arrive AND executes tool calls when
 * the model emits them, looping until the model gives a final answer
 * with no tool calls. Output is forwarded to the client as a
 * Server-Sent Events stream of JSON-encoded events (see ChatStreamEvent).
 */

import type { ToolSchema } from "./tools";

// ============ Types ============

export interface GroqMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_call_id?: string;
  tool_calls?: GroqToolCall[];
}

export interface GroqToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;          // JSON string per OpenAI/Groq spec
  };
}

export type ChatStreamEvent =
  | { type: "meta"; conversation_id: string }
  | { type: "content"; text: string }
  | { type: "tool"; name: string; status: "running" }
  | { type: "tool"; name: string; status: "done"; ms: number }
  | { type: "tool"; name: string; status: "error"; message: string }
  | { type: "done" }
  | { type: "error"; message: string };

// ============ SSE writer ============

/** A small helper around a WritableStreamDefaultWriter that JSON-encodes events. */
export class SSEWriter {
  private encoder = new TextEncoder();
  private closed = false;
  constructor(private writer: WritableStreamDefaultWriter<Uint8Array>) {}

  async send(event: ChatStreamEvent): Promise<void> {
    if (this.closed) return;
    try {
      await this.writer.write(
        this.encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
      );
    } catch {
      // Client disconnected; mark closed so subsequent sends are no-ops.
      this.closed = true;
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    try {
      await this.writer.close();
    } catch {
      // already closed
    }
  }
}

// ============ Tool-call streaming accumulator ============

interface PartialToolCall {
  id: string;
  name: string;
  argsBuffer: string;
}

/**
 * Tool calls arrive across many SSE chunks. Each chunk is a delta that may
 * contain partial id, partial function.name, and a partial slice of
 * function.arguments JSON. We merge by index until the stream ends.
 */
class ToolCallAccumulator {
  private byIndex = new Map<number, PartialToolCall>();

  ingest(deltaToolCalls: Array<{
    index: number;
    id?: string;
    function?: { name?: string; arguments?: string };
  }>): void {
    for (const tc of deltaToolCalls) {
      const existing = this.byIndex.get(tc.index) ?? { id: "", name: "", argsBuffer: "" };
      if (tc.id) existing.id = tc.id;
      if (tc.function?.name) existing.name = tc.function.name;
      if (tc.function?.arguments) existing.argsBuffer += tc.function.arguments;
      this.byIndex.set(tc.index, existing);
    }
  }

  finalize(): GroqToolCall[] {
    return Array.from(this.byIndex.values())
      .filter((tc) => tc.name)
      .map((tc) => ({
        id: tc.id || `call_${crypto.randomUUID().slice(0, 8)}`,
        type: "function" as const,
        function: { name: tc.name, arguments: tc.argsBuffer || "{}" },
      }));
  }

  hasAny(): boolean {
    return this.byIndex.size > 0;
  }
}

// ============ Main loop ============

export interface RunChatLoopArgs {
  apiKey: string;
  model: string;
  messages: GroqMessage[];     // includes system + history + new user message
  tools: ToolSchema[];
  sse: SSEWriter;
  /** Called for each tool-call request; should execute and return a JSON-stringifiable result. */
  onToolCall: (
    name: string,
    args: Record<string, unknown>
  ) => Promise<unknown>;
  /** Called once with the final assistant text after the loop ends. */
  onFinalAssistant?: (text: string) => Promise<void>;
  /** Called for each tool message that should be persisted (after onToolCall). */
  onToolMessagePersisted?: (
    name: string,
    args: Record<string, unknown>,
    result: unknown
  ) => Promise<void>;
  maxIterations?: number;       // default 5
  signal?: AbortSignal;
}

const LLM_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function runChatLoop(args: RunChatLoopArgs): Promise<void> {
  const maxIters = args.maxIterations ?? 5;
  const messages = [...args.messages];

  for (let iter = 0; iter < maxIters; iter++) {
    const response = await fetch(LLM_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${args.apiKey}`,
      },
      body: JSON.stringify({
        model: args.model,
        messages,
        tools: args.tools,
        tool_choice: "auto",
        stream: true,
        temperature: 0.4,
        max_tokens: 800,
      }),
      signal: args.signal,
    });

    if (!response.ok || !response.body) {
      const errBody = await safeText(response);
      throw new Error(`LLM HTTP ${response.status}: ${errBody.slice(0, 300)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantContent = "";
    const toolAcc = new ToolCallAccumulator();

    // Stream loop: read chunks, parse SSE events, dispatch deltas
    streamRead: while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let eventEnd: number;
      while ((eventEnd = buffer.indexOf("\n\n")) >= 0) {
        const rawEvent = buffer.slice(0, eventEnd);
        buffer = buffer.slice(eventEnd + 2);

        // Each SSE event is one or more "data: ..." lines. Groq sends one per event.
        for (const line of rawEvent.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") break streamRead;
          if (!data) continue;

          let chunk: any;
          try { chunk = JSON.parse(data); } catch { continue; }
          const delta = chunk?.choices?.[0]?.delta;
          if (!delta) continue;

          if (typeof delta.content === "string" && delta.content.length > 0) {
            assistantContent += delta.content;
            await args.sse.send({ type: "content", text: delta.content });
          }
          if (Array.isArray(delta.tool_calls)) {
            toolAcc.ingest(delta.tool_calls);
          }
        }
      }
    }

    // Stream ended for this iteration. Decide: tool calls or final answer?
    const toolCalls = toolAcc.finalize();

    if (toolCalls.length === 0) {
      // Final answer.
      if (args.onFinalAssistant) await args.onFinalAssistant(assistantContent);
      return;
    }

    // Push the assistant turn (with tool_calls) into history, then execute each tool.
    messages.push({
      role: "assistant",
      content: assistantContent || null,
      tool_calls: toolCalls,
    });

    for (const call of toolCalls) {
      let parsedArgs: Record<string, unknown> = {};
      try { parsedArgs = JSON.parse(call.function.arguments || "{}"); } catch { /* keep {} */ }

      await args.sse.send({ type: "tool", name: call.function.name, status: "running" });
      const t0 = Date.now();
      let result: unknown;
      try {
        result = await args.onToolCall(call.function.name, parsedArgs);
        await args.sse.send({
          type: "tool",
          name: call.function.name,
          status: "done",
          ms: Date.now() - t0,
        });
      } catch (err) {
        result = { error: err instanceof Error ? err.message : "tool failed" };
        await args.sse.send({
          type: "tool",
          name: call.function.name,
          status: "error",
          message: err instanceof Error ? err.message : "tool failed",
        });
      }

      if (args.onToolMessagePersisted) {
        await args.onToolMessagePersisted(call.function.name, parsedArgs, result);
      }

      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }

    // Loop: feed tool results back to the model for the next pass.
  }

  // Reached iteration cap without a clean final. Tell the client.
  await args.sse.send({
    type: "error",
    message:
      "Tool-call loop hit iteration cap. Try rephrasing or book a scope call.",
  });
}

async function safeText(r: Response): Promise<string> {
  try { return await r.text(); } catch { return "<no body>"; }
}
