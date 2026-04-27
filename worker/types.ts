/**
 * Shared types for the Codantrix Labs worker.
 *
 * Bindings come from wrangler.jsonc. Secrets are added via:
 *   npx wrangler secret put LLM_API_KEY
 *   npx wrangler secret put RESEND_API_KEY
 */

import type { D1Database, Fetcher, R2Bucket } from "@cloudflare/workers-types";

export interface Env {
  // Static asset binding (./site).
  ASSETS: Fetcher;

  // D1 — codantrix-labs-db.
  DB: D1Database;

  // ---- /book chat assistant (Phase 3) ----
  LLM_MODEL: string;        // var (set in wrangler.jsonc)
  LLM_API_KEY: string;      // secret — Groq API key
  CALENDLY_TOKEN?: string;  // secret — Calendly Personal Access Token (optional)

  // ---- /writing system (Phase W1+) ----
  RESEND_API_KEY: string;                       // secret — Resend API key
  R2_PUBLIC_URL?: string;                       // var — pub-<hash>.r2.dev or media.codantrix.com (W2)
  codantrix_writing_images?: R2Bucket;          // R2 binding (used in W2 for cover image upload)
}

export type JSONResponse<T> = T & { ok: boolean };
