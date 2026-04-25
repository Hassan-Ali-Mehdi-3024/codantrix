import type { Env } from "../types";

/**
 * POST /api/chat
 *
 * STUB — Phase 2. Replaced in Phase 3 with the Groq tool-calling loop +
 * SSE stream + D1 conversation logging.
 *
 * Returning 501 here so the route exists and the wiring (worker dispatch,
 * D1 binding, secret slot) is provably correct before any model code is
 * written.
 */
export async function handleChat(_request: Request, _env: Env): Promise<Response> {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "chat-not-implemented",
      phase: 2,
      next: "Phase 3 wires Groq + tools + D1 logging. See plan replicated-questing-alpaca.md.",
    }),
    {
      status: 501,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
}
