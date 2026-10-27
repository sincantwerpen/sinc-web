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

export type { Pillar, SincEvent } from "./nl/events";
export type { LinkItem, Partner, PrivacyBlock } from "./nl/pages";
export type { Member, Department } from "./nl/team";

const nl = { ...nlSite, ...nlPages, ...nlEvents, ...nlTeam, ...nlRegistration };
export type Content = typeof nl;
const en: Content = { ...enSite, ...enPages, ...enEvents, ...enTeam, ...enRegistration };

const content: Record<Lang, Content> = { nl, en };
export const getContent = (lang: Lang): Content => content[lang];

/** The site's own event slugs (the same in both languages); with the dashboard's: allEventSlugs(). */
export const eventSlugs = nl.sincEvents.map((e) => e.slug);
