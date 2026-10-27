import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;

/** The guest cancels their own registration; the place goes to the waiting list. */
export async function POST(_request: Request, { params }: RouteContext<"/api/ticket/[token]/cancel">) {
  const { token } = await params;
  if (!dashboardConfigured() || !TOKEN.test(token)) return Response.json({ error: "not_found" }, { status: 404 });
  try {
    const res = await dashboardFetch(`/api/public/tickets/${token}/cancel`, { method: "POST" });
    return Response.json(await res.json().catch(() => ({})), { status: res.status });
  } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}
