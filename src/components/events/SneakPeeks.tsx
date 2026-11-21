"use client";

import { useLang, useT } from "../LangProvider";
import { Reveal } from "../ui";
import { LangTag } from "./PastEvents";

const LOCALE = { nl: "nl-BE", en: "en-GB" } as const;

/**
 * "Save the date": small cards for events further ahead that only have a name, theme and date
 * (`sneakPeeks` in src/content/nl/events.ts). Deliberately much smaller than the big event cards.
 */
export function SneakPeeks() {
  const { sneakPeeks, eventsPage } = useT();
  const lang = useLang();
  if (sneakPeeks.length === 0) return null;

  const part = (ymd: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${ymd}T12:00:00Z`).toLocaleDateString(LOCALE[lang], { timeZone: "Europe/Brussels", ...opts });

  return (
    <div className="flex flex-col gap-5">
      <Reveal>
        <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-cream/60">
          <span aria-hidden className="h-px w-8 bg-cream/30" />
          {eventsPage.sneakPeek.title}
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {sneakPeeks.map((p, i) => (
          <Reveal key={p.id} delay={0.08 * i} className="h-full">
            <article className="group flex h-full items-center gap-5 rounded-[24px] bg-white/[0.03] p-4 ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white/[0.05] hover:ring-white/25 sm:p-5">
              <time
                dateTime={p.date}
                className="flex w-[76px] shrink-0 flex-col items-center rounded-[18px] bg-blue py-2.5 text-white shadow-[0_16px_40px_-18px_rgba(0,150,255,0.9)] sm:w-[84px]"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
                  {part(p.date, { month: "short" }).replace(".", "")}
                </span>
                <span className="text-display text-[36px] leading-none tabular-nums">{part(p.date, { day: "numeric" })}</span>
                <span className="text-[11px] font-bold tabular-nums text-white/70">{part(p.date, { year: "numeric" })}</span>
              </time>
              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="text-display text-[clamp(24px,2.4vw,32px)] leading-[1]">{p.title}</h3>
                <p className="font-bold leading-snug text-blue">{p.subtitle}</p>
                <p className="flex flex-wrap items-center gap-2 pt-1 text-[13px] text-cream/50">
                  <LangTag lang={p.language} />
                  <span className="inline-flex items-start gap-1.5">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-yellow" />
                    {eventsPage.sneakPeek.soon}
                  </span>
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
