"use client";

import { motion } from "motion/react";
import { FeaturedEvent } from "./events/FeaturedEvent";
import { Button, Eyebrow, Reveal, RevealText } from "./ui";
import { useT } from "./LangProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Concentric rings with a blue pulse: "we're scanning the horizon for the next event". */
export function Radar() {
  return (
    <div aria-hidden className="relative aspect-square w-full max-w-[420px]">
      {[1, 0.78, 0.56, 0.34].map((s, i) => (
        <motion.div
          key={s}
          className="absolute inset-0 m-auto rounded-full border border-white/10"
          style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
        />
      ))}
      <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(0,150,255,0.45)_360deg)]" />
      {[
        { top: "22%", left: "64%", d: 0 },
        { top: "66%", left: "26%", d: 1.2 },
        { top: "58%", left: "74%", d: 2.1 },
      ].map((p) => (
        <span key={p.top} className="absolute size-2.5" style={{ top: p.top, left: p.left }}>
          <span
            className="absolute inline-flex size-full animate-ping-slow rounded-full bg-blue"
            style={{ animationDelay: `${p.d}s` }}
          />
          <span className="relative inline-flex size-2.5 rounded-full bg-blue" />
        </span>
      ))}
      <div className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-blue shadow-[0_0_60px_rgba(0,150,255,0.7)]">
        <svg viewBox="0 0 24 24" className="size-8 fill-none stroke-white stroke-2" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/** "No events planned" card with the radar. Shared by the homepage and the events page. */
export function EmptyEventsCard({ showCta = true }: { showCta?: boolean }) {
  const { events } = useT();
  return (
    <Reveal>
      <div className="relative grid items-center gap-10 overflow-hidden rounded-[32px] bg-gradient-to-br from-ink-2 to-[#0d1a2e] p-8 ring-1 ring-white/10 sm:p-14 md:grid-cols-[1fr_auto]">
        <div className="absolute -right-40 -top-40 size-[500px] glow text-blue/20" aria-hidden />
        <div className="relative flex max-w-[560px] flex-col gap-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-[13px] font-bold text-cream/80">
            <span className="size-2 rounded-full bg-yellow" />
            {events.title}
          </span>
          <p className="text-display text-[clamp(30px,3.8vw,52px)] leading-[1.02]">{events.empty}</p>
          {showCta && <Button href={events.cta.href}>{events.cta.label}</Button>}
        </div>
        <div className="relative mx-auto w-full max-w-[360px] md:w-[360px]">
          <Radar />
        </div>
      </div>
    </Reveal>
  );
}

export function Events() {
  const { events, upcomingEvents } = useT();
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="events-title">
      <div className="container-x flex flex-col gap-14 sm:gap-20">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{events.eyebrow}</Eyebrow>
            <RevealText id="events-title" text={events.title} className="text-display text-[clamp(44px,7vw,112px)]" />
          </div>
          <Reveal className="flex flex-col items-start gap-7" delay={0.15}>
            <p className="text-lg leading-[1.6] text-cream/70">{events.lead}</p>
            <Button href={events.cta.href} variant="light">
              {events.cta.label}
            </Button>
          </Reveal>
        </div>

        {upcomingEvents.length === 0 ? (
          <EmptyEventsCard />
        ) : (
          <div className="flex flex-col gap-6">
            {upcomingEvents.map((e) => (
              <FeaturedEvent key={e.slug} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
