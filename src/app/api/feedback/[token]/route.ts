import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

// Answers from the feedback page go to the dashboard (one answer per personal link).
const TOKEN = /^[\w-]{1,80}(\.[\w-]{16})?$/;

export async function POST(request: Request, { params }: RouteContext<"/api/feedback/[token]">) {
  const { token } = await params;
  if (!dashboardConfigured() || !TOKEN.test(token)) return Response.json({ error: "not_found" }, { status: 404 });
  const body = await request.text();
  if (body.length > 20_000) return Response.json({ error: "too_large" }, { status: 413 });
  try {
    const res = await dashboardFetch(`/api/public/feedback/${token}`, { method: "POST", headers: { "Content-Type": "application/json" }, body });
    return Response.json(await res.json().catch(() => ({})), { status: res.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}
