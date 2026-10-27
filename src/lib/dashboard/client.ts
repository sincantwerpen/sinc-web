import type { SitePayload } from "./types";

// Server-to-server connection with the SINC dashboard. DASHBOARD_URL + DASHBOARD_API_KEY
// (the same key as in the dashboard). Without them, or when the dashboard does not answer,
// every page keeps the site's own content from src/content (nothing breaks).

/** Cache tag of everything that comes from the dashboard; /api/revalidate refreshes it. */
export const DASHBOARD_TAG = "dashboard";
/** Safety net when a refresh signal from the dashboard got lost: at most this old (seconds). */
const MAX_AGE = 60;
const TIMEOUT_MS = 4000;

export function dashboardConfigured(): boolean {
  return !!(process.env.DASHBOARD_URL && process.env.DASHBOARD_API_KEY);
}

export function dashboardUrl(path: string): string {
  return `${(process.env.DASHBOARD_URL ?? "").replace(/\/+$/, "")}${path}`;
}

function headers(extra?: HeadersInit): Headers {
  const h = new Headers(extra);
  h.set("x-api-key", process.env.DASHBOARD_API_KEY ?? "");
  return h;
}

/** A live call to the dashboard (registrations, tickets, payments): never cached. */
export async function dashboardFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(dashboardUrl(path), {
    ...init,
    headers: headers(init.headers),
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(15_000),
  });
}

/**
 * Events, team and photos from the dashboard, cached under DASHBOARD_TAG. null when the
 * dashboard is not configured or not reachable: the caller then uses the site's own content.
 */
export async function fetchSite(): Promise<SitePayload | null> {
  if (!dashboardConfigured()) return null;
  try {
    const res = await fetch(dashboardUrl("/api/public/site"), {
      headers: headers(),
      next: { revalidate: MAX_AGE, tags: [DASHBOARD_TAG] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[dashboard] /api/public/site answered ${res.status}`);
      return null;
    }
    const data = (await res.json()) as SitePayload;
    return Array.isArray(data?.events) ? data : null;
  } catch (err) {
    console.error("[dashboard] not reachable:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** The x-api-key of a call from the dashboard (e.g. /api/revalidate). */
export function fromDashboard(request: Request): boolean {
  const expected = process.env.DASHBOARD_API_KEY;
  const got = request.headers.get("x-api-key");
  if (!expected || !got || got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
