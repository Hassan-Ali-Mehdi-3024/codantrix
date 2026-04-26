/**
 * Tools for the /book scope assistant.
 *
 * Architecture (locked 2026-04-26 evening): 4 tools, kept tight to fit
 * Groq's 6K TPM cap on a 2-call tool-using turn.
 *
 *   get_info               unified read-only KB dispatcher (topic-driven)
 *   capture_lead           writes to D1
 *   check_availability     reads Calendly
 *   create_scheduling_link writes Calendly (creates single-use link)
 *
 * Why one info tool instead of four: each schema entry costs ~80–150
 * tokens of prompt every turn. Going from 4 read tools to 1 saved
 * ~400 input tokens. The model picks topic via a string param instead
 * of picking among separate tool names — slightly less reliable but
 * fits the TPM budget. If quality regresses, the right move is a paid
 * tier with prompt caching, not more tools.
 */

import { KB } from "./kb";
import { insertLead } from "./db";
import {
  createSchedulingLink as cdyCreateSchedulingLink,
  listActiveEventTypes,
  listAvailableTimes,
  pickScopeEventType,
} from "./calendly";
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
      name: "get_info",
      description:
        "Fetch read-only studio info by topic. Use 'tier_a' or 'tier_b' for full tier includes/scope; 'process' for the 4-phase delivery; 'work' for past anonymized projects; 'faq:<keywords>' for FAQ search (e.g. 'faq:IP ownership', 'faq:NDA', 'faq:pricing structure').",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "One of: tier_a, tier_b, process, work, faq:<keywords>",
          },
        },
        required: ["topic"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "capture_lead",
      description:
        "Save the visitor's email so Hassan can follow up. PREFERRED when visitor signals interest. Call ONLY when visitor has given an email in the conversation.",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string", description: "Visitor's email." },
          name: { type: "string", description: "Visitor's name if shared, else empty." },
          context: { type: "string", description: "Short summary of what they want follow-up on." },
        },
        required: ["email"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Read live Calendly slots (next 7 days, up to 6 results). Call ONLY when visitor asks 'when can we talk' or 'what times work'.",
      parameters: {
        type: "object",
        properties: {
          days_ahead: { type: "integer", minimum: 1, maximum: 7 },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_scheduling_link",
      description:
        "Create a single-use Calendly URL. Call ONLY when visitor explicitly says they want to book/schedule. Do NOT call when visitor expresses pain or interest — those are signals for capture_lead, not this.",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
];

// ============ Executor ============

export interface ToolContext {
  db: D1Database;
  conversationId: string;
  calendlyToken?: string;
}

export async function runTool(
  name: string,
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  switch (name) {
    case "get_info":
      return runGetInfo(args);
    case "capture_lead":
      return runCaptureLead(args, ctx);
    case "check_availability":
      return runCheckAvailability(args, ctx);
    case "create_scheduling_link":
      return runCreateSchedulingLink(ctx);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ============ get_info dispatcher ============

function runGetInfo(args: Record<string, unknown>): unknown {
  const raw = String(args["topic"] ?? "").trim().toLowerCase();
  if (!raw) return { error: "topic required" };

  if (raw === "tier_a" || raw === "tier-a" || raw === "a") {
    return tierPayload("A");
  }
  if (raw === "tier_b" || raw === "tier-b" || raw === "b") {
    return tierPayload("B");
  }
  if (raw === "process") {
    return processPayload();
  }
  if (raw === "work") {
    return workPayload();
  }
  if (raw.startsWith("faq:") || raw.startsWith("faq ")) {
    const query = raw.replace(/^faq[: ]/, "").trim();
    return faqPayload(query);
  }
  // Loose fallback: any unrecognized topic gets treated as a FAQ search.
  return faqPayload(raw);
}

function tierPayload(id: "A" | "B"): unknown {
  const tier = KB.tiers.find((t) => t.id === id);
  if (!tier) return { error: "tier not found" };
  return {
    tier_id: tier.id,
    name: tier.name,
    price: tier.price_range,
    duration: tier.duration_range,
    description: tier.description,
    includes: tier.includes,
    note: "Fixed-scope, fixed-price. 50% upfront, 50% on delivery.",
  };
}

function processPayload(): unknown {
  return {
    duration_range: KB.process.duration_range,
    phases: KB.process.phases.map((p) => ({
      step: `${p.num} ${p.name}`,
      title: p.title,
      description: p.description,
      duration: p.duration,
    })),
  };
}

function workPayload(): unknown {
  return {
    cards: KB.work.map((w) => ({
      vertical: w.vertical,
      tier: w.tier,
      duration: w.duration,
      title: w.title,
      summary: w.description,
      outcome: w.outcome,
      stack: w.stack,
    })),
    note: "Past clients anonymous by default. Names shared only with sign-off.",
  };
}

function faqPayload(query: string): unknown {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (tokens.length === 0) {
    return { matches: [], note: "Topic too short. Suggest the visitor ask on the call." };
  }
  const scored = KB.faqs.map((f) => {
    const hay = (f.q + " " + f.a).toLowerCase();
    let s = 0;
    for (const tok of tokens) if (hay.includes(tok)) s += 1;
    return { f, s };
  });
  const matches = scored
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => ({ q: x.f.q, a: x.f.a }));
  if (matches.length === 0) {
    return { matches: [], note: "No FAQ match. Suggest the call or email." };
  }
  return { matches };
}

// ============ Action executors ============

async function runCaptureLead(
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  const email = String(args["email"] ?? "").trim();
  const visitorName = String(args["name"] ?? "").trim() || null;
  const context = String(args["context"] ?? "").trim() || null;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Email format invalid. Ask the visitor to retype." };
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
      ? "Lead saved. Confirm Hassan will follow up within one business day. If they want to also book, you can offer create_scheduling_link."
      : "Already on file from the last 24h. Confirm they're in the queue.",
  };
}

async function runCheckAvailability(
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  if (!ctx.calendlyToken) {
    return {
      ok: false,
      error: "calendly-not-configured",
      note: "Direct visitor to https://calendly.com/hassanalimehdi.",
    };
  }
  const daysRaw = Number(args["days_ahead"] ?? 7);
  const days =
    Number.isFinite(daysRaw) && daysRaw >= 1 && daysRaw <= 7 ? Math.floor(daysRaw) : 7;

  const evRes = await listActiveEventTypes(ctx.calendlyToken);
  if (!evRes.ok) {
    return { ok: false, error: "calendly-error", note: "Direct to https://calendly.com/hassanalimehdi." };
  }
  const event = pickScopeEventType(evRes.data);
  if (!event) {
    return {
      ok: true,
      slots: [],
      note: "No active event types yet. Suggest emailing hassan@codantrix.com.",
    };
  }
  const now = new Date();
  const start = new Date(now.getTime() + 5 * 60 * 1000);
  const end = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const slotsRes = await listAvailableTimes(
    ctx.calendlyToken,
    event.uri,
    start.toISOString(),
    end.toISOString()
  );
  if (!slotsRes.ok) {
    return { ok: false, error: "calendly-error", note: "Direct to https://calendly.com/hassanalimehdi." };
  }
  const slots = slotsRes.data.slice(0, 6).map((s) => ({ start_time_iso: s.start_time }));
  return {
    ok: true,
    event_type: { name: event.name, duration_min: event.duration },
    slots,
    note:
      slots.length === 0
        ? "No open slots in window. Suggest different week or email."
        : "Times in UTC. Tell visitor booking page shows local time.",
  };
}

async function runCreateSchedulingLink(ctx: ToolContext): Promise<unknown> {
  if (!ctx.calendlyToken) {
    return {
      ok: false,
      booking_url: "https://calendly.com/hassanalimehdi",
      note: "Use public URL as fallback.",
    };
  }
  const evRes = await listActiveEventTypes(ctx.calendlyToken);
  if (!evRes.ok) {
    return {
      ok: false,
      booking_url: "https://calendly.com/hassanalimehdi",
      note: "Calendly call failed; use public URL.",
    };
  }
  const event = pickScopeEventType(evRes.data);
  if (!event) {
    return {
      ok: false,
      booking_url: "https://calendly.com/hassanalimehdi",
      note: "No active event types. Use public URL.",
    };
  }
  const linkRes = await cdyCreateSchedulingLink(ctx.calendlyToken, event.uri);
  if (!linkRes.ok) {
    return { ok: false, booking_url: event.scheduling_url, note: "Falling back to public event URL." };
  }
  return {
    ok: true,
    booking_url: linkRes.data.booking_url,
    single_use: true,
    note: "Surface URL on its own line so widget renders it clickable.",
  };
}
