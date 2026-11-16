"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { defaultLang, type Lang } from "@/i18n";
import { getContent } from "@/content";

const LangContext = createContext<Lang>(defaultLang);
/** When the page was built (see renderNow): the browser shows the same events as the server did. */
const NowContext = createContext<number>(0);

export function LangProvider({ lang, now, children }: { lang: Lang; now: number; children: ReactNode }) {
  return (
    <LangContext.Provider value={lang}>
      <NowContext.Provider value={now}>
      {/* Respect "reduce motion" in the visitor's system settings for all motion animations. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </NowContext.Provider>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Texts in the current language (Client Components). */
export const useT = () => getContent(useLang(), useContext(NowContext));
