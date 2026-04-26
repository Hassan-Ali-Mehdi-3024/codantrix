import type { Env } from "../types";

/**
 * GET /api/health
 *
 * Sanity check that the Worker is running and the D1 binding resolves.
 * Returns 200 when both Worker code and DB binding are reachable, 503 if D1
 * is not bound (e.g. `database_id` still placeholder in wrangler.jsonc).
 */
export async function handleHealth(_request: Request, env: Env): Promise<Response> {
  const ts = Date.now();

  let db: "ok" | "unbound" | "error" = "unbound";
  try {
    if (env.DB) {
      // Cheapest read possible — does not require a table.
      await env.DB.prepare("SELECT 1 AS one").first();
      db = "ok";
    }
  } catch {
    db = "error";
  }

  const ok = db === "ok";
  return new Response(
    JSON.stringify({ ok, ts, db, model: env.LLM_MODEL }, null, 2),
    {
      status: ok ? 200 : 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    }
  );
}
