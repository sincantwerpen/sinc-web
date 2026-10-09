// Languages: Dutch lives at the normal addresses (/events), English under /en (/en/events).

export const locales = ["nl", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "nl";

export const isLang = (value: string): value is Lang => (locales as readonly string[]).includes(value);

/** Internal link for a language: "/events" → "/en/events" in English. External links stay as they are. */
export function localize(href: string, lang: Lang) {
  if (lang === defaultLang || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/en" || href.startsWith("/en/") || href.startsWith("/en#") || /^\/(images|api)\//.test(href)) return href;
  return href === "/" ? "/en" : href.startsWith("/#") ? `/en${href.slice(1)}` : `/en${href}`;
}

/**
 * Address as the visitor sees it. Dutch pages are served internally as /nl/…, and Next.js can report
 * that internal path, so the /nl prefix is removed here.
 */
export function visiblePath(pathname: string) {
  return pathname === "/nl" ? "/" : pathname.startsWith("/nl/") ? pathname.slice(3) : pathname;
}

/** The current page in the other language. */
export function switchLang(pathname: string, to: Lang) {
  const path = visiblePath(pathname);
  const bare = path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
  return localize(bare, to);
}

/** Locale for dates and numbers. */
export const intlLocale: Record<Lang, string> = { nl: "nl-BE", en: "en-GB" };
