import type { Env } from "../types";

/**
 * POST /api/lead
 *
 * STUB — Phase 2. Replaced in Phase 3 with the validated insert into the
 * `leads` D1 table (email, name?, context?, conversation_id?).
 */
export async function handleLead(_request: Request, _env: Env): Promise<Response> {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "lead-not-implemented",
      phase: 2,
      next: "Phase 3 wires the form POST + D1 insert + dedupe by email/24h.",
    }),
    {
      status: 501,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
}
