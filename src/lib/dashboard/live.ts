// Turns the dashboard's answer (types.ts) into the site's own content shapes, and lays it over the
// texts in src/content. Pure: used on the server (getT) and in the browser (useT), and tested in
// scripts/live.test.ts. When there is no dashboard data, the content stays exactly as it is.

import type { Lang } from "@/i18n";
import type { Content, Department, Pillar, SincEvent } from "@/content";
import type { Choice, DashEvent, DashLang, SitePayload } from "./types";

/** The dashboard data for one language, small enough to hand to the browser. */
export type Live = {
  events: SincEvent[];
  homepage: string[];
  departments: Department[] | null;
  photos: Record<string, string>;
  choices: SitePayload["choices"];
};

const PILLAR: Record<DashEvent["category"], Pillar> = {
  inspireren: "Inspireren",
  informeren: "Informeren",
  connecteren: "Connecteren",
  activeren: "Activeren",
};

export const dashLang = (lang: Lang): DashLang => (lang === "en" ? "EN" : "NL");

/** A dashboard path (/api/public/...) as a path on this site, which passes it on (/api/media/...). */
export function mediaPath(path: string): string {
  return path.startsWith("/api/public/") ? `/api/media/${path.slice("/api/public/".length)}` : path;
}

const DATE_LOCALE: Record<Lang, string> = { nl: "nl-BE", en: "en-GB" };

/** "2026-11-12" -> "12 november" / "12 November", like the dates in src/content. */
export function formatDay(ymd: string, lang: Lang): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return ymd;
  return d.toLocaleDateString(DATE_LOCALE[lang], { day: "numeric", month: "long", timeZone: "Europe/Brussels" });
}

export function formatEuro(cents: number): string {
  return `€${cents % 100 ? (cents / 100).toFixed(2).replace(".", ",") : cents / 100}`;
}

/** "GRATIS", "€5", "vanaf €5" (several prices), or the team's own price text. */
export function priceText(e: DashEvent, lang: Lang): string {
  const free = lang === "en" ? "FREE" : "GRATIS";
  const prices = [...new Set(e.ticketTypes.map((t) => t.priceCents))].sort((a, b) => a - b);
  if (prices.length === 0 || prices.every((p) => p === 0)) return e.price.label || free;
  if (prices.length === 1) return formatEuro(prices[0]);
  const low = prices[0] === 0 ? prices[1] : prices[0];
  return prices[0] === 0 ? `${free} / ${formatEuro(low)}` : `${lang === "en" ? "from" : "vanaf"} ${formatEuro(low)}`;
}

/** First real paragraph of the description, as the short text on cards and for Google. */
export function excerptOf(paragraphs: string[], max = 220): string {
  const first = paragraphs.find((p) => !p.startsWith("## ") && !p.startsWith("- ")) ?? paragraphs[0] ?? "";
  const flat = first.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:!?\s]+$/, "")}…`;
}

/** Can a visitor register on this site right now (not via Luma, not closed, not over)? */
export function opensHere(e: DashEvent): boolean {
  return e.registrationMode === "sinc" && e.registration.enabled && !e.ended && !e.cancelled;
}

export function toSincEvent(e: DashEvent, lang: Lang): SincEvent {
  const item = e.items[dashLang(lang)] ?? e.items.NL ?? { title: e.id, description: "" };
  const body = item.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const luma = e.registrationMode === "luma" && e.lumaUrl && !e.ended && !e.cancelled ? e.lumaUrl : undefined;
  return {
    slug: e.id,
    title: item.title,
    subtitle: item.subtitle ?? "",
    topics: "",
    pillar: PILLAR[e.category] ?? "Inspireren",
    image: e.image ? mediaPath(e.image) : `/images/pillars/${e.category}.webp`,
    excerpt: excerptOf(body),
    date: formatDay(e.date, lang),
    time: e.endTime ? `${e.startTime} – ${e.endTime}` : e.startTime,
    startsAt: e.startsAt ?? undefined,
    location: e.location,
    price: priceText(e, lang),
    ticketUrl: luma ?? (opensHere(e) ? `/events/${e.id}#inschrijven` : undefined),
    body,
    upcoming: !e.ended && !e.cancelled,
    dashboard: e,
  };
}

export function toDepartments(team: SitePayload["team"], lang: Lang): Department[] | null {
  if (!team.length) return null;
  const l = dashLang(lang);
  return team.map((d) => ({
    id: d.id,
    name: d.name[l] || d.name.NL,
    members: d.members.map((m) => ({
      name: m.name,
      role: m.role[l] || m.role.NL,
      ...(m.photo ? { photo: mediaPath(m.photo) } : {}),
      ...(m.email ? { email: m.email } : {}),
      ...(m.linkedin ? { linkedin: m.linkedin } : {}),
      ...(m.lead ? { lead: true } : {}),
    })),
  }));
}

export function liveFor(payload: SitePayload | null, lang: Lang): Live | null {
  if (!payload) return null;
  const photos: Record<string, string> = {};
  for (const [path, to] of Object.entries(payload.photos ?? {})) photos[path] = mediaPath(to);
  return {
    events: payload.events.map((e) => toSincEvent(e, lang)),
    homepage: payload.homepage ?? [],
    departments: toDepartments(payload.team ?? [], lang),
    photos,
    choices: payload.choices,
  };
}

/** Every string in `value` that is a replaced photo becomes its replacement. */
export function replacePhotos<T>(value: T, photos: Record<string, string>): T {
  if (typeof value === "string") return (photos[value] ?? value) as T;
  if (Array.isArray(value)) return value.map((v) => replacePhotos(v, photos)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = k === "dashboard" ? v : replacePhotos(v, photos);
    return out as T;
  }
  return value;
}

const startOf = (e: SincEvent) => (e.startsAt ? Date.parse(e.startsAt) : Number.POSITIVE_INFINITY);

/**
 * The site's content with the dashboard's events, team and photos laid over it. A dashboard
 * event replaces the site's own event with the same address (slug); the site's other events
 * (the archive, or an event still on Luma) stay. The homepage shows the dashboard's choice.
 */
export function withLive(content: Content, live: Live | null): Content {
  if (!live) return content;
  const own = new Set(live.events.map((e) => e.slug));
  const kept = content.sincEvents.filter((e) => !own.has(e.slug));
  const upcoming = [...live.events.filter((e) => e.upcoming), ...kept.filter((e) => e.upcoming)].sort((a, b) => startOf(a) - startOf(b));
  const past = [
    ...live.events.filter((e) => !e.upcoming).sort((a, b) => (b.dashboard?.date ?? "").localeCompare(a.dashboard?.date ?? "")),
    ...kept.filter((e) => !e.upcoming),
  ];
  const sincEvents = [...upcoming, ...past];
  const bySlug = new Map(sincEvents.map((e) => [e.slug, e]));
  const picks = live.homepage.map((id) => bySlug.get(id)).filter((e): e is SincEvent => !!e && !!e.upcoming);
  const homeEvents = [...picks, ...upcoming.filter((e) => !picks.includes(e) && !own.has(e.slug))].slice(0, 3);
  const departments = live.departments ?? content.departments;
  const merged: Content = {
    ...content,
    sincEvents,
    upcomingEvents: upcoming,
    pastEvents: past,
    homeEvents,
    departments,
    allMembers: departments.flatMap((d) => d.members),
  };
  const photos = Object.keys(live.photos).length ? replacePhotos(merged, live.photos) : merged;
  return { ...photos, getEvent: (slug: string) => photos.sincEvents.find((e) => e.slug === slug) };
}

/** Label of a choice in a language. */
export const choiceLabel = (list: Choice[], id: string, lang: Lang) => list.find((c) => c.id === id)?.labels[dashLang(lang)] ?? id;
