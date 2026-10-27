import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

// Live places left of a dashboard event, for the registration card: the page itself may be a
// minute old, this never is.
export async function GET(_request: Request, { params }: RouteContext<"/api/events/[id]/status">) {
  const { id } = await params;
  if (!dashboardConfigured() || !/^[a-z0-9-]+$/.test(id)) return Response.json({ error: "not_found" }, { status: 404 });
  try {
    const res = await dashboardFetch(`/api/public/events/${id}`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return Response.json({ error: "not_found" }, { status: 404 });
    const e = await res.json();
    return Response.json(
      { placesLeft: e.placesLeft, waitlist: e.waitlist, ticketTypes: e.ticketTypes, open: !!e.registration?.enabled, ended: e.ended, cancelled: e.cancelled },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "unreachable" }, { status: 503 });
  }
}
