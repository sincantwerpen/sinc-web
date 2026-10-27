import { dashboardConfigured, dashboardUrl } from "@/lib/dashboard/client";

const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;

/** The A4 ticket (PDF), made by the dashboard. */
export async function GET(request: Request, { params }: RouteContext<"/api/ticket/[token]/pdf">) {
  const { token } = await params;
  if (!dashboardConfigured() || !TOKEN.test(token)) return new Response("Not found", { status: 404 });
  const lang = new URL(request.url).searchParams.get("lang") === "EN" ? "EN" : "NL";
  try {
    const res = await fetch(dashboardUrl(`/ticket/${token}/pdf?lang=${lang}`), { cache: "no-store", signal: AbortSignal.timeout(20_000) });
    if (!res.ok || !res.body) return new Response("Not found", { status: res.status === 409 ? 409 : 404 });
    return new Response(res.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": res.headers.get("content-disposition") ?? 'attachment; filename="ticket.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("Unavailable", { status: 502 });
  }
}
