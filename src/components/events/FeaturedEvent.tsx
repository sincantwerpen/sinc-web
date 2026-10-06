"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { SincEvent } from "@/content/events";
import { eventsPage } from "@/content/site";
import { Button, Reveal } from "../ui";
import { PillarTag } from "./PastEvents";

function useCountdown(iso?: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (!iso) return;
    const target = new Date(iso).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return left;
}

function Countdown({ iso }: { iso?: string }) {
  const left = useCountdown(iso);
  if (left === null || left === 0) return null;
  const s = Math.floor(left / 1000);
  const parts = [
    { v: Math.floor(s / 86400), l: eventsPage.countdown.days },
    { v: Math.floor((s % 86400) / 3600), l: eventsPage.countdown.hours },
    { v: Math.floor((s % 3600) / 60), l: eventsPage.countdown.minutes },
    { v: s % 60, l: eventsPage.countdown.seconds },
  ];
  return (
    <div className="flex gap-2" aria-hidden>
      {parts.map((p) => (
        <div key={p.l} className="flex min-w-[64px] flex-col items-center rounded-2xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
          <span className="relative h-8 overflow-hidden text-display text-[30px] tabular-nums leading-8">
            <motion.span
              key={p.v}
              className="block"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {String(p.v).padStart(2, "0")}
            </motion.span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cream/50">{p.l}</span>
        </div>
      ))}
    </div>
  );
}

/** Big card for an upcoming event: poster, key info, countdown, "Registreer" + "Meer info". */
export function FeaturedEvent({ event: e }: { event: SincEvent }) {
  const { labels } = eventsPage.detail;
  const info = [
    { label: labels.date, value: e.date },
    { label: labels.time, value: e.time },
    { label: labels.location, value: e.location },
    { label: labels.price, value: e.price },
  ].filter((r) => r.value);

  return (
    <Reveal>
      <article className="relative isolate overflow-hidden rounded-[32px] bg-ink-2 p-5 ring-1 ring-white/10 sm:p-8 lg:p-10">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={e.image} alt="" fill sizes="100vw" className="scale-150 object-cover opacity-30 blur-[80px] saturate-150" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/40 to-ink/90" />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-14">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-[24px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <Image src={e.image} alt={`${e.title}: ${e.subtitle}`} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
          </motion.div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-ink" />
                </span>
                {eventsPage.title}
              </span>
              <PillarTag pillar={e.pillar} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-display text-[clamp(44px,6vw,88px)]">{e.title}</h3>
              <p className="text-display text-[clamp(24px,2.8vw,40px)] leading-[1.05] text-blue">{e.subtitle}</p>
            </div>

            <p className="max-w-[560px] text-lg leading-[1.6] text-cream/75">{e.excerpt}</p>

            <dl className="grid max-w-[560px] grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {info.map((r) => (
                <div key={r.label} className="flex flex-col gap-1">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">{r.label}</dt>
                  <dd className="font-bold text-cream">{r.value}</dd>
                </div>
              ))}
            </dl>

            <Countdown iso={e.startsAt} />

            <div className="flex flex-wrap gap-3 pt-1">
              {e.ticketUrl && <Button href={e.ticketUrl}>{eventsPage.register}</Button>}
              <Button href={`/events/${e.slug}`} variant="ghost" arrow={false}>
                {eventsPage.moreInfo}
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
