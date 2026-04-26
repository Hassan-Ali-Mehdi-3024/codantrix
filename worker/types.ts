/**
 * Shared types for the Codantrix Labs worker.
 *
 * Bindings come from wrangler.jsonc. Secrets are added via:
 *   npx wrangler secret put LLM_API_KEY
 */

import type { D1Database, Fetcher } from "@cloudflare/workers-types";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  LLM_MODEL: string;        // var (set in wrangler.jsonc) e.g. "google/gemma-4-31b-it:free"
  LLM_API_KEY: string;      // secret — wrangler secret put LLM_API_KEY (OpenRouter key)
  CALENDLY_TOKEN?: string;  // secret — wrangler secret put CALENDLY_TOKEN (optional)
}

export type JSONResponse<T> = T & { ok: boolean };
