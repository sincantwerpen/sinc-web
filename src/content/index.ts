// All text of the site, per language. Dutch is the original (`./nl`), English mirrors it (`./en`) with
// exactly the same structure: TypeScript complains here if a text is missing in one of the languages.

import type { Lang } from "@/i18n";
import * as nlSite from "./nl/site";
import * as nlPages from "./nl/pages";
import * as nlEvents from "./nl/events";
import * as nlTeam from "./nl/team";
import * as nlRegistration from "./nl/registration";
import * as enSite from "./en/site";
import * as enPages from "./en/pages";
import * as enEvents from "./en/events";
import * as enTeam from "./en/team";
import * as enRegistration from "./en/registration";

import type { SincEvent } from "./nl/events";
export type { Pillar, SincEvent } from "./nl/events";
export type { LinkItem, Partner, PrivacyBlock } from "./nl/pages";
export type { Member, Department } from "./nl/team";

const nl = { ...nlSite, ...nlPages, ...nlEvents, ...nlTeam, ...nlRegistration };
export type Content = typeof nl;
const en: Content = { ...enSite, ...enPages, ...enEvents, ...enTeam, ...enRegistration };

const content: Record<Lang, Content> = { nl, en };

/** An event counts as over this long after its start (`startsAt`). */
export const EVENT_OVER_AFTER = 5 * 3600_000;
export const isOver = (e: SincEvent, now: number) => !!e.startsAt && Date.parse(e.startsAt) + EVENT_OVER_AFTER < now;

/**
 * An event marked `upcoming` moves to the past events by itself once it is over. `now` is the moment
 * the page is built: the pages are rebuilt every hour (`revalidate` in app/[lang]/layout.tsx).
 */
function withDates(c: Content, now: number): Content {
  const sincEvents = c.sincEvents.map((e) => (e.upcoming && isOver(e, now) ? { ...e, upcoming: false } : e));
  const start = (e: SincEvent) => (e.startsAt ? Date.parse(e.startsAt) : Number.POSITIVE_INFINITY);
  return {
    ...c,
    sincEvents,
    upcomingEvents: sincEvents.filter((e) => e.upcoming).sort((a, b) => start(a) - start(b)),
    pastEvents: sincEvents.filter((e) => !e.upcoming),
    getEvent: (slug: string) => sincEvents.find((e) => e.slug === slug),
  };
}

const memo = new Map<string, Content>();
export const getContent = (lang: Lang, now: number = Date.now()): Content => {
  // The same hour gives the same object (stable for React); events only change by the hour anyway.
  const hour = Math.floor(now / 3600_000);
  const key = `${lang}:${hour}`;
  let c = memo.get(key);
  if (!c) {
    if (memo.size > 8) memo.clear();
    c = withDates(content[lang], now);
    memo.set(key, c);
  }
  return c;
};

/** The site's own event slugs (the same in both languages); with the dashboard's: allEventSlugs(). */
export const eventSlugs = nl.sincEvents.map((e) => e.slug);
