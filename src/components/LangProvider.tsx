"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { defaultLang, type Lang } from "@/i18n";
import { getContent } from "@/content";

const LangContext = createContext<Lang>(defaultLang);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LangContext.Provider value={lang}>
      {/* Respect "reduce motion" in the visitor's system settings for all motion animations. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Texts in the current language (Client Components). */
export const useT = () => getContent(useLang());
