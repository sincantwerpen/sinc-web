import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

// The guest's own ticket (from the mail link or right after registering): view and change.
// The signed token is the key; the dashboard checks it.
const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;

async function pass(token: string, init?: RequestInit) {
  if (!dashboardConfigured() || !TOKEN.test(token)) return Response.json({ error: "not_found" }, { status: 404 });
  try {
    const res = await dashboardFetch(`/api/public/tickets/${token}`, init);
    return Response.json(await res.json().catch(() => ({})), { status: res.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}

export async function GET(_request: Request, { params }: RouteContext<"/api/ticket/[token]">) {
  return pass((await params).token);
}

export async function PATCH(request: Request, { params }: RouteContext<"/api/ticket/[token]">) {
  const body = await request.text();
  if (body.length > 5000) return Response.json({ error: "too_large" }, { status: 413 });
  return pass((await params).token, { method: "PATCH", headers: { "Content-Type": "application/json" }, body });
}
