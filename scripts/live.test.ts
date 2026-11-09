// Tests for src/lib/dashboard/live.ts and src/lib/calendar.ts: the dashboard's data laid over the
// site's own content, and the "add to calendar" links. Run: npm test (Node 22.6+, type stripping).

import assert from "node:assert/strict";
import { register } from "node:module";

// "@/..." imports resolve to src/... (like tsconfig paths), and extensionless imports get ".ts".
register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(spec, ctx, next) {
        if (spec.startsWith("@/")) spec = new URL("../src/" + spec.slice(2), ${JSON.stringify(import.meta.url)}).href;
        try { return await next(spec, ctx); } catch (e) {
          if (/\\.[cm]?[jt]s$/.test(spec)) throw e;
          return next(spec + ".ts", ctx);
        }
      }`),
);

const { getContent } = await import("../src/content/index.ts");
const live = await import("../src/lib/dashboard/live.ts");
const cal = await import("../src/lib/calendar.ts");

const event = (over: Record<string, unknown> = {}) => ({
  id: "kickoff-2026",
  category: "connecteren",
  date: "2099-11-12",
  startTime: "18:30",
  endTime: "23:00",
  startsAt: "2099-11-12T17:30:00.000Z",
  endsAt: "2099-11-12T22:00:00.000Z",
  location: "Humgy Central",
  recurrence: null,
  price: { free: true },
  image: "/api/public/events/kickoff-2026/cover?v=abcd1234",
  ended: false,
  cancelled: false,
  registrationMode: "sinc",
  placesLeft: 12,
  waitlist: true,
  ticketTypes: [],
  registration: { enabled: true, fields: { phone: true, dietary: false, comment: true }, fieldSettings: {}, customFields: [], extraConfirm: null },
  items: { NL: { title: "Kickoff", subtitle: "Het begin", description: "Eerste alinea over het event.\n\n## Programma\n- Talk\n- Netwerken" } },
  ...over,
});

const payload = (over: Record<string, unknown> = {}) => ({
  events: [event()],
  homepage: ["kickoff-2026"],
  team: [],
  photos: {},
  choices: { schools: [], studyYears: [], entrepreneurStages: [] },
  at: new Date().toISOString(),
  ...over,
});

// Without dashboard data nothing changes.
const nl = getContent("nl");
assert.equal(live.withLive(nl, null), nl);
assert.equal(live.liveFor(null, "nl"), null);

// Mapping one event.
{
  const e = live.toSincEvent(event() as never, "nl");
  assert.equal(e.slug, "kickoff-2026");
  assert.equal(e.title, "Kickoff");
  assert.equal(e.subtitle, "Het begin");
  assert.equal(e.pillar, "Connecteren");
  assert.equal(e.image, "/api/media/events/kickoff-2026/cover?v=abcd1234");
  assert.equal(e.date, "12 november");
  assert.equal(e.time, "18:30 – 23:00");
  assert.equal(e.price, "GRATIS");
  assert.equal(e.ticketUrl, "/events/kickoff-2026#inschrijven");
  assert.equal(e.excerpt, "Eerste alinea over het event.");
  assert.deepEqual(e.body, ["Eerste alinea over het event.", "## Programma\n- Talk\n- Netwerken"]);
  assert.equal(e.upcoming, true);
  // English falls back to the Dutch text, dates and prices follow the language.
  const en = live.toSincEvent(event() as never, "en");
  assert.equal(en.title, "Kickoff");
  assert.equal(en.date, "12 November");
  assert.equal(en.price, "FREE");
  // No poster: the pillar photo. Luma: the button opens Luma. Over: no button.
  assert.equal(live.toSincEvent(event({ image: null }) as never, "nl").image, "/images/pillars/connecteren.webp");
  assert.equal(live.toSincEvent(event({ registrationMode: "luma", lumaUrl: "https://luma.com/x" }) as never, "nl").ticketUrl, "https://luma.com/x");
  const over = live.toSincEvent(event({ ended: true }) as never, "nl");
  assert.equal(over.ticketUrl, undefined);
  assert.equal(over.upcoming, false);
}

// Prices.
assert.equal(live.priceText(event({ ticketTypes: [{ id: "a", name: "A", priceCents: 3200, placesLeft: null }] }) as never, "nl"), "€32");
assert.equal(
  live.priceText(event({ ticketTypes: [{ id: "a", name: "A", priceCents: 750, placesLeft: null }, { id: "b", name: "B", priceCents: 1000, placesLeft: null }] }) as never, "en"),
  "from €7,50",
);
assert.equal(
  live.priceText(event({ ticketTypes: [{ id: "a", name: "A", priceCents: 0, placesLeft: null }, { id: "b", name: "B", priceCents: 500, placesLeft: null }] }) as never, "nl"),
  "GRATIS / €5",
);

// Merging: a dashboard event replaces the site's own event with the same slug; the rest stays.
{
  const ownUpcoming = nl.upcomingEvents[0];
  const merged = live.withLive(nl, live.liveFor(payload({ events: [event(), event({ id: ownUpcoming?.slug ?? "x", items: { NL: { title: "Uit het dashboard", description: "" } } })] }) as never, "nl"));
  assert.equal(merged.getEvent("kickoff-2026")?.dashboard?.id, "kickoff-2026");
  if (ownUpcoming) assert.equal(merged.getEvent(ownUpcoming.slug)?.title, "Uit het dashboard");
  // kickoff is new, the other one replaces the site's own event of that address.
  assert.equal(merged.sincEvents.length, nl.sincEvents.length + 1);
  assert.ok(merged.pastEvents.length >= nl.pastEvents.length - 1, "the archive stays");
  assert.equal(merged.homeEvents[0]?.slug, "kickoff-2026", "the dashboard picks the homepage");
  assert.ok(merged.homeEvents.length <= 3);
  // Upcoming sorted by start.
  const starts = merged.upcomingEvents.map((e) => (e.startsAt ? Date.parse(e.startsAt) : Infinity));
  assert.deepEqual(starts, [...starts].sort((a, b) => a - b));
}

// Team: replaced when the dashboard has one, kept otherwise.
{
  const team = [{ id: "events", name: { NL: "Events", EN: "Events" }, members: [{ id: "a", name: "An Peeters", role: { NL: "Event Manager", EN: "Event Manager" }, photo: "/api/public/files/team-photos/00000000-0000-0000-0000-000000000000.jpg", email: null, linkedin: null, lead: true }] }];
  const merged = live.withLive(nl, live.liveFor(payload({ team }) as never, "nl"));
  assert.equal(merged.departments.length, 1);
  assert.equal(merged.allMembers[0].photo, "/api/media/files/team-photos/00000000-0000-0000-0000-000000000000.jpg");
  assert.equal(merged.allMembers[0].lead, true);
  assert.equal(live.withLive(nl, live.liveFor(payload() as never, "nl")).departments, nl.departments);
}

// Photos: every use of a replaced photo changes, in every text block.
{
  const path = nl.hero.photos[0].src;
  const merged = live.withLive(nl, live.liveFor(payload({ photos: { [path]: "/api/public/files/site-photos/11111111-1111-1111-1111-111111111111.jpg" } }) as never, "nl"));
  assert.equal(merged.hero.photos[0].src, "/api/media/files/site-photos/11111111-1111-1111-1111-111111111111.jpg");
  assert.equal(merged.hero.photos[1].src, nl.hero.photos[1].src);
  assert.equal(typeof merged.getEvent, "function");
}

// Partners: the dashboard's three groups replace the site's, the footer logos follow in the same order.
{
  const logo = "/api/public/files/partner-logos/22222222-2222-2222-2222-222222222222.png";
  const partner = (id: string, over: Record<string, unknown> = {}) => ({
    id,
    name: id.toUpperCase(),
    logo,
    logoRatio: 2.5,
    lightTile: false,
    url: `https://${id}.example`,
    text: { NL: "Tekst", EN: "" },
    links: [{ label: { NL: "Ontdek meer", EN: "Discover more" }, href: { NL: `https://${id}.example/nl`, EN: `https://${id}.example/en` } }],
    ...over,
  });
  const partners = { main: [partner("cronos", { text: { NL: "", EN: "" } })], featured: [partner("xerius")], others: [partner("vlajo", { links: [], logo: "/images/partners/vlajo.webp", logoRatio: null })] };
  const nlMerged = live.withLive(nl, live.liveFor(payload({ partners }) as never, "nl"));
  assert.deepEqual(nlMerged.partnersPage.main.map((p) => p.name), ["CRONOS"]);
  assert.equal(nlMerged.partnersPage.main[0].logo, "/api/media/files/partner-logos/22222222-2222-2222-2222-222222222222.png");
  assert.equal(nlMerged.partnersPage.main[0].ratio, 2.5);
  assert.equal(nlMerged.partnersPage.main[0].text, undefined, "no text on a main partner");
  assert.equal(nlMerged.partnersPage.featured[0].links[0].href, "https://xerius.example/nl");
  assert.deepEqual(nlMerged.partnersPage.others[0].links, [{ label: "Ontdek meer", href: "https://vlajo.example" }], "logo wall links to the partner's site");
  assert.equal(nlMerged.partnersPage.others[0].logo, "/images/partners/vlajo.webp", "a website logo stays a website path");
  assert.equal(nlMerged.partnersPage.title, nl.partnersPage.title, "page texts stay the site's");
  assert.deepEqual(nlMerged.partners.logos.map((l) => l.name), ["CRONOS", "XERIUS", "VLAJO"]);
  const en = getContent("en");
  const enMerged = live.withLive(en, live.liveFor(payload({ partners }) as never, "en"));
  assert.equal(enMerged.partnersPage.featured[0].text, "Tekst", "English falls back to the Dutch text");
  assert.equal(enMerged.partnersPage.featured[0].links[0].label, "Discover more");
  assert.equal(enMerged.partnersPage.featured[0].links[0].href, "https://xerius.example/en");
  // An empty or missing partners block keeps the site's own partners (also an older dashboard).
  assert.equal(live.withLive(nl, live.liveFor(payload({ partners: { main: [], featured: [], others: [] } }) as never, "nl")).partnersPage, nl.partnersPage);
  assert.equal(live.withLive(nl, live.liveFor(payload() as never, "nl")).partners, nl.partners);
}

// Calendar links.
{
  const e = { id: "kickoff-2026", title: "Kickoff, SINC", startsAt: "2099-11-12T17:30:00.000Z", endsAt: null, location: "Meir 78; Antwerpen", url: "https://www.sincantwerpen.be/events/kickoff-2026" };
  const g = new URL(cal.googleCalendarUrl(e));
  assert.equal(g.searchParams.get("dates"), "20991112T173000Z/20991112T193000Z");
  const ics = cal.icsFile(e);
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /SUMMARY:Kickoff\\, SINC\r\n/);
  assert.match(ics, /LOCATION:Meir 78\; Antwerpen\r\n/);
  assert.ok(ics.split("\r\n").every((l) => Buffer.byteLength(l) <= 75));
}

console.log("live tests ok");
