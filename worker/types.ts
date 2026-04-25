/**
 * Shared types for the Codantrix Labs worker.
 *
 * Bindings come from wrangler.jsonc. Secrets (GROQ_API_KEY, CALENDLY_TOKEN)
 * are added to this Env interface when their phases land — Phase 3 for both.
 */

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GROQ_MODEL: string;
  // GROQ_API_KEY: string;     // Phase 3
  // CALENDLY_TOKEN: string;   // Phase 3
}

export type JSONResponse<T> = T & { ok: boolean };
