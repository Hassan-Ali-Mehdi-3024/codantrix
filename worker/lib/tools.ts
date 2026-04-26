/**
 * Tool definitions for the /book scope assistant.
 *
 * Schemas use OpenAI function-calling format (Groq is OpenAI-compatible).
 * Executors return plain JSON-serializable objects which we send back to
 * the model as the tool message content.
 *
 * Design rule: tools return FACTS, not prose. The model composes the prose.
 * That way the system prompt's voice rules survive — tools don't get to
 * decide tone.
 */

import { KB, searchFaqs } from "./kb";
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
      name: "get_studio_overview",
      description:
        "Get the basic studio info: name, founder, location, time zone, working hours, founding year, one-line pitch, and manifesto. Use when the visitor asks who you are, what you do, where you're based, or for a general overview.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "get_services",
      description:
        "Get both engagement tiers (A and B) with their price ranges, durations, and what's included. Use when the visitor asks about services, pricing, what we offer, or compares options.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "get_tier_detail",
      description:
        "Get one tier's full detail: name, price, duration, description, includes list. Use when the visitor wants depth on Tier A or Tier B specifically.",
      parameters: {
        type: "object",
        properties: {
          tier: {
            type: "string",
            enum: ["A", "B"],
            description: "Which tier — 'A' for Production system or 'B' for Agentic MVP.",
          },
        },
        required: ["tier"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_process",
      description:
        "Get the 4-phase delivery process (Map, Build, Wire, Ship) with descriptions and durations per phase. Use when the visitor asks how we work, the timeline, or what to expect at each stage.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "get_work",
      description:
        "Get summaries of past work — anonymized client cards covering vertical, tier, duration, what was built, outcome, and stack. Use when the visitor asks for case studies, examples, or proof we've done this before.",
      parameters: {
        type: "object",
        properties: {
          tier: {
            type: "string",
            enum: ["A", "B", "any"],
            description: "Optionally filter to one tier. Defaults to 'any'.",
          },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_build_vs_buy",
      description:
        "Get the honest comparison: when to hire us vs use a no-code platform like Lindy or Relevance. Use when the visitor asks about no-code, why not Lindy/Relevance/Make/Zapier, or whether they should DIY.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "search_faq",
      description:
        "Search the FAQ index for an answer to the visitor's question. Returns up to 3 best-effort matches as Q+A pairs. Use this for procedural questions: pricing structure, IP ownership, time zones, NDAs, post-handoff support.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Visitor's question or keywords to search for.",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_contact",
      description:
        "Get contact details: email, calendly URL, location. Use when the visitor wants to reach out, book a call, or asks how to get in touch.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "get_links",
      description:
        "Get external links: LinkedIn, GitHub, founder's personal site. Use when the visitor wants to verify the founder, see code samples, or check the studio's web presence.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "book_call",
      description:
        "Surface the Calendly URL so the visitor can book a 30-min scope call. Call this when the visitor explicitly says they want to book, schedule, or set up a call.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "capture_lead",
      description:
        "Save the visitor's email so we can follow up. Call this ONLY when the visitor has explicitly given an email and asked us to follow up, or said they want a written response. Never call this on speculation.",
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

// ============ EXECUTORS ============

export interface ToolContext {
  db: D1Database;
  conversationId: string;
}

/**
 * Run a tool by name with parsed args. Returns a JSON-serializable result
 * (plain object). The result is sent back to the model as the tool message
 * content (JSON-stringified by the caller).
 *
 * Errors are returned as { error: string } rather than thrown — the model
 * can recover ("the lookup failed, ask the user instead").
 */
export async function runTool(
  name: string,
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  switch (name) {
    case "get_studio_overview":
      return KB.studio;

    case "get_services":
      return {
        tiers: KB.tiers.map((t) => ({
          id: t.id,
          name: t.name,
          tagline: t.tagline,
          price_range: t.price_range,
          duration_range: t.duration_range,
        })),
        note: "Both engagements are fixed-scope, fixed-price. No hourly billing.",
      };

    case "get_tier_detail": {
      const id = String(args["tier"] ?? "").toUpperCase();
      if (id !== "A" && id !== "B") return { error: "tier must be 'A' or 'B'" };
      const tier = KB.tiers.find((t) => t.id === id);
      return tier ?? { error: "tier not found" };
    }

    case "get_process":
      return KB.process;

    case "get_work": {
      const filter = String(args["tier"] ?? "any").toUpperCase();
      const cards =
        filter === "A" || filter === "B"
          ? KB.work.filter((w) => w.tier === filter)
          : KB.work;
      return {
        cards: cards.map((w) => ({
          vertical: w.vertical,
          tier: w.tier,
          duration: w.duration,
          title: w.title,
          summary: w.description,
          outcome: w.outcome,
          stack: w.stack,
        })),
        anonymized:
          "Past clients are kept anonymous by default. Names shared only with written sign-off.",
      };
    }

    case "get_build_vs_buy":
      return KB.build_vs_buy;

    case "search_faq": {
      const q = String(args["query"] ?? "");
      const matches = searchFaqs(q, 3);
      if (matches.length === 0) {
        return {
          matches: [],
          note: "No FAQ match. Suggest asking on the call or via email.",
        };
      }
      return { matches };
    }

    case "get_contact":
      return KB.contact;

    case "get_links":
      return KB.links;

    case "book_call":
      return {
        calendly_url: KB.contact.calendly_url,
        duration_min: 30,
        cost: "free",
        note: "30-min scope call. No deck, no obligation. By the end the visitor will know fit, cost, and timeline.",
      };

    case "capture_lead": {
      const email = String(args["email"] ?? "").trim();
      const name = String(args["name"] ?? "").trim() || null;
      const context = String(args["context"] ?? "").trim() || null;

      // Server-side email shape check. The model can be over-eager.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, error: "Email format invalid. Ask the visitor to retype it." };
      }

      const result = await insertLead(ctx.db, {
        conversationId: ctx.conversationId,
        email,
        name,
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

    default:
      return { error: `Unknown tool: ${name}` };
  }
}
