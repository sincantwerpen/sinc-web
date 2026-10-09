// All text of the site, per language. Dutch is the original (`./nl`), English mirrors it (`./en`) with
// exactly the same structure: TypeScript complains here if a text is missing in one of the languages.

import type { Lang } from "@/i18n";
import * as nlSite from "./nl/site";
import * as nlPages from "./nl/pages";
import * as nlEvents from "./nl/events";
import * as nlTeam from "./nl/team";
import * as enSite from "./en/site";
import * as enPages from "./en/pages";
import * as enEvents from "./en/events";
import * as enTeam from "./en/team";

export type { Pillar, SincEvent } from "./nl/events";
export type { LinkItem, Partner, PrivacyBlock } from "./nl/pages";
export type { Member, Department } from "./nl/team";

const nl = { ...nlSite, ...nlPages, ...nlEvents, ...nlTeam };
export type Content = typeof nl;
const en: Content = { ...enSite, ...enPages, ...enEvents, ...enTeam };

const content: Record<Lang, Content> = { nl, en };
export const getContent = (lang: Lang): Content => content[lang];

/** Event slugs are the same in both languages. */
export const eventSlugs = nl.sincEvents.map((e) => e.slug);
