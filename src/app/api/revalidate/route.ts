import { revalidateTag } from "next/cache";
import { DASHBOARD_TAG, fromDashboard } from "@/lib/dashboard/client";

// The SINC dashboard calls this after every change the site shows (an event published or edited,
// a registration, the team, a photo), with the shared DASHBOARD_API_KEY. The next visit starts a
// refresh in the background (it still gets the previous version), the ones after it get the new
// one: within seconds instead of after the one-minute cache.
// "max" (stale-while-revalidate) rather than { expire: 0 }: the site keeps answering from its
// cache while the dashboard is slow or down, instead of making a visitor wait for it.
export async function POST(request: Request) {
  if (!fromDashboard(request)) return Response.json({ error: "unauthorized" }, { status: 401 });
  revalidateTag(DASHBOARD_TAG, "max");
  return Response.json({ ok: true, at: new Date().toISOString() });
}
