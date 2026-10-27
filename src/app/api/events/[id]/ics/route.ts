import { getContent } from "@/content";
import { fetchSite } from "@/lib/dashboard/client";
import { liveFor, withLive } from "@/lib/dashboard/live";
import { icsFile } from "@/lib/calendar";
import { localize } from "@/i18n";

const SITE = "https://www.sincantwerpen.be";

/** "Apple / Outlook": the event as an .ics file. ?lang=en for the English title and link. */
export async function GET(request: Request, { params }: RouteContext<"/api/events/[id]/ics">) {
  const { id } = await params;
  const lang = new URL(request.url).searchParams.get("lang") === "en" ? "en" : "nl";
  const e = withLive(getContent(lang), liveFor(await fetchSite(), lang)).getEvent(id);
  const startsAt = e?.dashboard?.startsAt ?? e?.startsAt;
  if (!e || !startsAt) return new Response("Not found", { status: 404 });
  const body = icsFile({
    id: e.slug,
    title: `${e.title} · SINC Antwerpen`,
    startsAt,
    endsAt: e.dashboard?.endsAt ?? null,
    location: e.location ?? "",
    url: SITE + localize(`/events/${e.slug}`, lang),
    details: e.excerpt,
  });
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="${e.slug}.ics"` },
  });
}
