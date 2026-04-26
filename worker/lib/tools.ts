/**
 * Tools for the /book scope assistant.
 *
 * Architecture decision (2026-04-26): only one tool. Everything else lives
 * in the system prompt (built from kb.ts). Keep this list minimal — every
 * tool is a chance for the model to mis-route or arg-parse-fail. Add a new
 * tool ONLY when:
 *   - it has side effects (writes to D1, calls an external API), OR
 *   - the data is dynamic per-request (live availability, per-user state).
 *
 * Static facts go in the system prompt, not here.
 */

import { insertLead } from "./db";
import type { D1Database } from "@cloudflare/workers-types";

export interface ToolSchema {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required?: string[];
      additionalProperties?: boolean;
    };
  };
}

export const TOOL_SCHEMAS: ToolSchema[] = [
  {
    type: "function",
    function: {
      name: "capture_lead",
      description:
        "Save the visitor's email so Hassan can follow up. Call this ONLY when the visitor has explicitly given an email AND asked for follow-up (e.g. 'email me', 'send me a proposal'). Do not call speculatively, on emails mentioned in passing, or when the visitor only asks for OUR email.",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Visitor's email address.",
          },
          name: {
            type: "string",
            description: "Visitor's name if shared. Pass empty string if unknown.",
          },
          context: {
            type: "string",
            description:
              "Short summary of what the visitor wants follow-up on (workflow, tier interest, timing, etc.). Pass empty string if none.",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
    },
  },
];

// ============ Executor ============

export interface ToolContext {
  db: D1Database;
  conversationId: string;
}

export async function runTool(
  name: string,
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  if (name !== "capture_lead") {
    return { error: `Unknown tool: ${name}` };
  }

  const email = String(args["email"] ?? "").trim();
  const visitorName = String(args["name"] ?? "").trim() || null;
  const context = String(args["context"] ?? "").trim() || null;

  // Server-side email shape check. The model can be over-eager.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Email format invalid. Ask the visitor to retype it." };
  }

  const result = await insertLead(ctx.db, {
    conversationId: ctx.conversationId,
    email,
    name: visitorName,
    context,
  });
  return {
    ok: true,
    inserted: result.inserted,
    note: result.inserted
      ? "Lead saved. Hassan will follow up within one business day."
      : "Email already on file from the last 24 hours. Skipping duplicate.",
  };
}
