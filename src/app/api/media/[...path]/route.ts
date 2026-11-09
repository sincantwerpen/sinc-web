import { dashboardConfigured, dashboardUrl } from "@/lib/dashboard/client";

// Posters, team portraits, photos and partner logos that live in the SINC dashboard, served from this site's own
// address (so next/image can optimise them and the dashboard's address stays out of the page).
// Only these kinds of paths are passed on.
const ALLOWED = [/^events\/[a-z0-9-]+\/cover$/, /^files\/(team-photos|site-photos)\/[0-9a-f-]{36}\.jpg$/, /^files\/partner-logos\/[0-9a-f-]{36}\.png$/];

export async function GET(request: Request, { params }: RouteContext<"/api/media/[...path]">) {
  const path = (await params).path.join("/");
  if (!dashboardConfigured() || !ALLOWED.some((re) => re.test(path))) return new Response("Not found", { status: 404 });
  const search = new URL(request.url).search;
  try {
    const res = await fetch(dashboardUrl(`/api/public/${path}${search}`), { cache: "no-store", signal: AbortSignal.timeout(10_000) });
    if (!res.ok || !res.body) return new Response("Not found", { status: 404 });
    return new Response(res.body, {
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "image/jpeg",
        // A new photo always gets a new address (?v=... or a new file name).
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
