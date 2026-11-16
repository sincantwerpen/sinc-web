"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { defaultLang, type Lang } from "@/i18n";
import { getContent, type Content } from "@/content";
import { withLive, type Live } from "@/lib/dashboard/live";

const LangContext = createContext<{ lang: Lang; content: Content; live: Live | null }>({
  lang: defaultLang,
  content: getContent(defaultLang),
  live: null,
});

/**
 * `live`: the dashboard's events, team and photos (src/lib/dashboard), laid over the site's own texts.
 * `now`: when the page was built (see renderNow), so the browser shows the same events as the server did.
 */
export function LangProvider({ lang, live = null, now, children }: { lang: Lang; live?: Live | null; now: number; children: ReactNode }) {
  const value = useMemo(() => ({ lang, content: withLive(getContent(lang, now), live), live }), [lang, live, now]);
  return (
    <LangContext.Provider value={value}>
      {/* Respect "reduce motion" in the visitor's system settings for all motion animations. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext).lang;

/** Texts in the current language (Client Components). */
export const useT = () => useContext(LangContext).content;

/** The dashboard data (choice lists of the registration form), or null without a dashboard. */
export const useLive = () => useContext(LangContext).live;
