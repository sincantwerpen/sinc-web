"use client";

import { usePathname } from "next/navigation";
import { switchLang } from "@/i18n";

/** Hides its children on one page (given as the Dutch address, e.g. "/partners"), in every language. */
export function HideOn({ path, children }: { path: string; children: React.ReactNode }) {
  return switchLang(usePathname(), "nl") === path ? null : <>{children}</>;
}
