"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, switchLang, type Lang } from "@/i18n";
import { useLang, useT } from "./LangProvider";

/**
 * NL | EN pill. The blue knob slides to the chosen language first, then the same page opens in that
 * language (a different language is a different root layout, so the page itself reloads).
 * The knob only moves sideways inside the pill (a plain CSS transform), so it stays put when the navbar
 * itself moves or changes height, e.g. after clicking a link.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const { siteMeta } = useT();
  const path = usePathname();
  const router = useRouter();
  const [active, setActive] = useState<Lang>(lang);

  const choose = (to: Lang) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let "open in new tab" work
    e.preventDefault();
    if (to === lang) return;
    setActive(to);
    window.setTimeout(() => router.push(switchLang(path, to) + window.location.hash), 260);
  };

  return (
    <nav aria-label={siteMeta.switchLabel} className={`relative flex h-12 items-center rounded-full bg-white/8 p-1 ring-1 ring-white/10 ${className}`}>
      <span
        aria-hidden
        className="absolute left-1 top-1 h-10 w-11 rounded-full bg-blue shadow-[0_6px_20px_-6px_rgba(0,150,255,0.9)] transition-transform duration-300 ease-out-expo"
        style={{ transform: `translateX(${locales.indexOf(active) * 100}%)` }}
      />
      {locales.map((l) => (
        <a
          key={l}
          href={switchLang(path, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={choose(l)}
          className={`relative flex h-10 w-11 items-center justify-center rounded-full text-[13px] font-bold tracking-[0.08em] transition-colors duration-300 ${
            l === active ? "text-white" : "text-cream/60 hover:text-white"
          }`}
        >
          <span className="relative">{l.toUpperCase()}</span>
        </a>
      ))}
    </nav>
  );
}
