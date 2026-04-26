/**
 * Shared types for the Codantrix Labs worker.
 *
 * Bindings come from wrangler.jsonc. Secrets are added via:
 *   npx wrangler secret put GROQ_API_KEY
 */

import type { D1Database, Fetcher } from "@cloudflare/workers-types";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GROQ_MODEL: string;
  GROQ_API_KEY: string;     // secret — wrangler secret put GROQ_API_KEY
  CALENDLY_TOKEN?: string;  // secret — wrangler secret put CALENDLY_TOKEN (optional)
}

export type JSONResponse<T> = T & { ok: boolean };
