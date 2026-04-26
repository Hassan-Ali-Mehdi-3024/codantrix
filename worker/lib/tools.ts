/**
 * Tools for the /book scope assistant.
 *
 * Architecture rule (locked 2026-04-26): a tool exists ONLY when it has
 * side effects (writes to D1, calls external APIs) or returns dynamic
 * per-request data. Static facts live in the system prompt.
 *
 * Current tools (3):
 *   capture_lead             — writes to D1
 *   check_availability       — reads live Calendly availability
 *   create_scheduling_link   — creates a one-time Calendly booking link
 */

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
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Check Hassan's live Calendly availability for the scope call. Returns up to 6 upcoming time slots within the next 7 days. Use this when the visitor asks 'when can we talk', 'what times work', or wants to know availability before deciding to book.",
      parameters: {
        type: "object",
        properties: {
          days_ahead: {
            type: "integer",
            description:
              "How many days from today to look ahead, max 7. Defaults to 7. Use a smaller number only if the visitor specifies a window (e.g. 'this week' \u2192 3).",
            minimum: 1,
            maximum: 7,
          },
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
        "Create a one-time Calendly scheduling link the visitor can use to book the scope call. Returns a URL valid for one booking. Use this when the visitor explicitly says they want to book / schedule / pick a time. Prefer this over surfacing the public Calendly URL because each link is single-use and trackable.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
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

// ============ capture_lead ============

async function runCaptureLead(
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  const email = String(args["email"] ?? "").trim();
  const visitorName = String(args["name"] ?? "").trim() || null;
  const context = String(args["context"] ?? "").trim() || null;

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

// ============ check_availability ============

async function runCheckAvailability(
  args: Record<string, unknown>,
  ctx: ToolContext
): Promise<unknown> {
  if (!ctx.calendlyToken) {
    return {
      ok: false,
      error: "calendly-not-configured",
      note:
        "Live availability isn't configured yet. Direct the visitor to https://calendly.com/hassanalimehdi to pick a slot.",
    };
  }

  const daysAheadRaw = Number(args["days_ahead"] ?? 7);
  const daysAhead =
    Number.isFinite(daysAheadRaw) && daysAheadRaw >= 1 && daysAheadRaw <= 7
      ? Math.floor(daysAheadRaw)
      : 7;

  const eventsRes = await listActiveEventTypes(ctx.calendlyToken);
  if (!eventsRes.ok) {
    return {
      ok: false,
      error: "calendly-error",
      message: eventsRes.error,
      note:
        "Calendly lookup failed. Direct the visitor to https://calendly.com/hassanalimehdi.",
    };
  }
  const event = pickScopeEventType(eventsRes.data);
  if (!event) {
    return {
      ok: true,
      slots: [],
      note:
        "No active Calendly event types yet. Suggest the visitor email hassan@codantrix.com to schedule.",
    };
  }

  const now = new Date();
  // Calendly requires start_time slightly in the future; +5 min is safe.
  const start = new Date(now.getTime() + 5 * 60 * 1000);
  const end = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  const slotsRes = await listAvailableTimes(
    ctx.calendlyToken,
    event.uri,
    start.toISOString(),
    end.toISOString()
  );
  if (!slotsRes.ok) {
    return {
      ok: false,
      error: "calendly-error",
      message: slotsRes.error,
      note:
        "Calendly availability lookup failed. Direct the visitor to https://calendly.com/hassanalimehdi.",
    };
  }

  const slots = slotsRes.data.slice(0, 6).map((s) => ({
    start_time_iso: s.start_time,
  }));

  return {
    ok: true,
    event_type: { name: event.name, duration_min: event.duration },
    slots,
    note:
      slots.length === 0
        ? "No open slots in the requested window. Suggest a different week or email hassan@codantrix.com."
        : "Times are in UTC; mention to the visitor that the booking page will display them in their local time.",
  };
}

// ============ create_scheduling_link ============

async function runCreateSchedulingLink(ctx: ToolContext): Promise<unknown> {
  if (!ctx.calendlyToken) {
    return {
      ok: false,
      error: "calendly-not-configured",
      booking_url: "https://calendly.com/hassanalimehdi",
      note:
        "Single-use links aren't configured yet. Use the public Calendly URL above for now.",
    };
  }

  const eventsRes = await listActiveEventTypes(ctx.calendlyToken);
  if (!eventsRes.ok) {
    return {
      ok: false,
      error: "calendly-error",
      message: eventsRes.error,
      booking_url: "https://calendly.com/hassanalimehdi",
      note: "Calendly call failed. Use the public URL above as fallback.",
    };
  }
  const event = pickScopeEventType(eventsRes.data);
  if (!event) {
    return {
      ok: false,
      error: "no-event-types",
      booking_url: "https://calendly.com/hassanalimehdi",
      note:
        "No active Calendly event types yet. Use the public URL above; it will show whatever Hassan creates.",
    };
  }

  const linkRes = await cdyCreateSchedulingLink(ctx.calendlyToken, event.uri);
  if (!linkRes.ok) {
    return {
      ok: false,
      error: "calendly-error",
      message: linkRes.error,
      booking_url: event.scheduling_url,
      note: "Falling back to the event-type's public URL.",
    };
  }

  return {
    ok: true,
    booking_url: linkRes.data.booking_url,
    event_type: { name: event.name, duration_min: event.duration },
    single_use: true,
    note: "Single-use scheduling link. Surface it on its own line so the widget renders it as a clickable URL.",
  };
}
