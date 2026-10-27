import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

// The payment page (/betalen/<token>, the button in the payment mail): what to transfer, and the
// optional proof of payment, which goes straight on to the dashboard (it is stored there).
const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;
// Vercel functions accept at most 4.5 MB per request.
const MAX_BYTES = 4 * 1024 * 1024;

export async function GET(_request: Request, { params }: RouteContext<"/api/payment/[token]">) {
  const { token } = await params;
  if (!dashboardConfigured() || !TOKEN.test(token)) return Response.json({ error: "not_found" }, { status: 404 });
  try {
    const res = await dashboardFetch(`/api/public/payment/${token}`);
    return Response.json(await res.json().catch(() => ({})), { status: res.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}

export async function POST(request: Request, { params }: RouteContext<"/api/payment/[token]">) {
  const { token } = await params;
  if (!dashboardConfigured() || !TOKEN.test(token)) return Response.json({ error: "not_found" }, { status: 404 });
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTES + 64 * 1024) return Response.json({ error: "too_large" }, { status: 413 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) return Response.json({ error: "no_file" }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "too_large" }, { status: 413 });
  const out = new FormData();
  out.set("file", file, file.name);
  try {
    const res = await dashboardFetch(`/api/public/payment/${token}`, { method: "POST", body: out, signal: AbortSignal.timeout(30_000) });
    return Response.json(await res.json().catch(() => ({})), { status: res.status });
  } catch {
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
}
