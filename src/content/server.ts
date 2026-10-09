import type { Metadata } from "next";
import { lang as rootLang } from "next/root-params";
import { isLang, defaultLang, localize, type Lang } from "@/i18n";
import { getContent } from ".";

/** Language of the page being rendered (Server Components only). */
export async function getLang(): Promise<Lang> {
  const value = await rootLang();
  return value && isLang(value) ? value : defaultLang;
}

/** Texts of the page being rendered (Server Components only). */
export async function getT() {
  return getContent(await getLang());
}

/**
 * Title, description and language links for a page. `path` is the Dutch address, e.g. "/events".
 * `name` is a key of `siteMeta.pages`, or a ready-made title (event pages).
 */
/** Search engines show about 155 characters of a description: cut longer ones at a word. */
export function shortDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:!?\s]+$/, "")}…`;
}

export async function pageMeta(path: string, name: string, description: string): Promise<Metadata> {
  const lang = await getLang();
  const { siteMeta } = getContent(lang);
  const pageName = (siteMeta.pages as Record<string, string>)[name] ?? name;
  return {
    title: `${pageName} | SINC Antwerpen`,
    description: shortDescription(description),
    alternates: {
      canonical: localize(path, lang),
      languages: { nl: path, en: localize(path, "en"), "x-default": path },
    },
  };
}
