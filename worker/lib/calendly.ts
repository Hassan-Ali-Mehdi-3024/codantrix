/**
 * Calendly API client.
 *
 * Uses the user's Personal Access Token (set via `wrangler secret put
 * CALENDLY_TOKEN`). Token grants are read+write on event_types,
 * scheduled_events, scheduling_links, availability — see Calendly docs:
 *   https://developers.calendly.com/api-docs
 *
 * This file ONLY does the minimum needed by the two tools the agent
 * exposes: list active event types, list available time slots for one
 * event type, and create a one-time scheduling link.
 *
 * Errors return { ok: false, error, hint } so the model can recover
 * gracefully (e.g. "no event type configured yet, here's the page link").
 */

const API = "https://api.calendly.com";

export interface CalendlyResult<T> {
  ok: true;
  data: T;
}
export interface CalendlyError {
  ok: false;
  error: string;
  status?: number;
  hint?: string;
}
export type CalendlyResponse<T> = CalendlyResult<T> | CalendlyError;

// ============ Types (subset of API responses we actually use) ============

export interface CurrentUser {
  resource: {
    uri: string;
    name: string;
    slug: string;
    timezone: string;
    scheduling_url: string;
  };
}

export interface EventType {
  uri: string;
  name: string;
  slug: string;
  duration: number;
  active: boolean;
  scheduling_url: string;
  description_plain?: string;
}

export interface AvailableTime {
  status: string;            // "available"
  start_time: string;        // ISO 8601
  invitee_events_uri?: string;
  scheduling_url?: string;
}

export interface SchedulingLink {
  booking_url: string;
  owner: string;
  owner_type: string;
}

// ============ Low-level fetch ============

async function callApi<T>(
  path: string,
  token: string,
  init: RequestInit = {}
): Promise<CalendlyResponse<T>> {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  headers.set("content-type", "application/json");
  let response: Response;
  try {
    response = await fetch(`${API}${path}`, { ...init, headers });
  } catch (err) {
    return {
      ok: false,
      error: "calendly-network",
      hint: err instanceof Error ? err.message : "network error",
    };
  }
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    /* non-JSON */
  }
  if (!response.ok) {
    const msg =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : `Calendly HTTP ${response.status}`;
    return { ok: false, error: msg, status: response.status };
  }
  return { ok: true, data: body as T };
}

// ============ High-level helpers ============

let cachedUserUri: string | null = null;
let cachedUserSchedulingUrl: string | null = null;

/**
 * Get the current user's resource URI. Cached for the lifetime of the
 * isolate (workers are short-lived, so this is effectively per-request
 * with no cross-request leak risk).
 */
export async function getCurrentUserUri(
  token: string
): Promise<CalendlyResponse<{ uri: string; scheduling_url: string }>> {
  if (cachedUserUri && cachedUserSchedulingUrl) {
    return { ok: true, data: { uri: cachedUserUri, scheduling_url: cachedUserSchedulingUrl } };
  }
  const res = await callApi<CurrentUser>("/users/me", token);
  if (!res.ok) return res;
  cachedUserUri = res.data.resource.uri;
  cachedUserSchedulingUrl = res.data.resource.scheduling_url;
  return { ok: true, data: { uri: cachedUserUri, scheduling_url: cachedUserSchedulingUrl } };
}

/**
 * List active event types for the authenticated user. Returns an empty
 * array when the account has no event types (Calendly empty-state — the
 * agent should fall back to a friendly "no event types yet" answer).
 */
export async function listActiveEventTypes(
  token: string
): Promise<CalendlyResponse<EventType[]>> {
  const userRes = await getCurrentUserUri(token);
  if (!userRes.ok) return userRes;

  const params = new URLSearchParams({
    user: userRes.data.uri,
    active: "true",
    count: "20",
    sort: "name:asc",
  });
  const res = await callApi<{ collection: EventType[] }>(
    `/event_types?${params.toString()}`,
    token
  );
  if (!res.ok) return res;
  return { ok: true, data: res.data.collection };
}

/**
 * Pick a sensible default event type for the scope call.
 * Heuristic: prefer one whose name matches /scope|intro|consult|30/i,
 * else fall back to the shortest active event type.
 */
export function pickScopeEventType(events: EventType[]): EventType | null {
  if (events.length === 0) return null;
  const named = events.find((e) => /scope|intro|consult|30/i.test(e.name));
  if (named) return named;
  return events.slice().sort((a, b) => a.duration - b.duration)[0] ?? null;
}

/**
 * List available 30-min slots for a given event type within a window.
 * Calendly's max single window is 7 days; we let the caller specify.
 */
export async function listAvailableTimes(
  token: string,
  eventTypeUri: string,
  startTimeIso: string,
  endTimeIso: string
): Promise<CalendlyResponse<AvailableTime[]>> {
  const params = new URLSearchParams({
    event_type: eventTypeUri,
    start_time: startTimeIso,
    end_time: endTimeIso,
  });
  const res = await callApi<{ collection: AvailableTime[] }>(
    `/event_type_available_times?${params.toString()}`,
    token
  );
  if (!res.ok) return res;
  return { ok: true, data: res.data.collection };
}

/**
 * Create a one-time scheduling link for an event type. The link can be
 * used exactly `max_event_count` times (we use 1) before expiring.
 */
export async function createSchedulingLink(
  token: string,
  eventTypeUri: string,
  ownerType: "EventType" | "User" = "EventType",
  maxEventCount = 1
): Promise<CalendlyResponse<SchedulingLink>> {
  const res = await callApi<{ resource: SchedulingLink }>(
    "/scheduling_links",
    token,
    {
      method: "POST",
      body: JSON.stringify({
        max_event_count: maxEventCount,
        owner: eventTypeUri,
        owner_type: ownerType,
      }),
    }
  );
  if (!res.ok) return res;
  return { ok: true, data: res.data.resource };
}
