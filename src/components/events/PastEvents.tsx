"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { pastEvents, pillars, type Pillar } from "@/content/events";
import { eventsPage } from "@/content/site";
import { Eyebrow, RevealText } from "../ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillarColor: Record<Pillar, string> = {
  Inspireren: "bg-blue text-white",
  Informeren: "bg-cream text-ink",
  Connecteren: "bg-white/10 text-blue ring-1 ring-blue/40",
  Activeren: "bg-yellow text-ink",
};

export function PillarTag({ pillar, className = "" }: { pillar: Pillar; className?: string }) {
  return (
    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${pillarColor[pillar]} ${className}`}>
      {pillar}
    </span>
  );
}

/** Poster that trails the cursor while you hover over the list (desktop only). */
function CursorPreview({ image, visible }: { image: string | null; visible: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotate = useSpring(0, { stiffness: 120, damping: 14 });

  useEffect(() => {
    let last = 0;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX + 28);
      y.set(e.clientY - 150);
      rotate.set(Math.max(-12, Math.min(12, (e.clientX - last) * 0.6)));
      last = e.clientX;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, rotate]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[300px] w-[300px] lg:block"
      style={{ x: sx, y: sy, rotate }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <AnimatePresence>
        {image && (
          <motion.div
            key={image}
            className="absolute inset-0 overflow-hidden rounded-[24px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Image src={image} alt="" fill sizes="300px" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PastEvents() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Pillar | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const list = filter ? pastEvents.filter((e) => e.pillar === filter) : pastEvents;
  const hoveredImage = pastEvents.find((e) => e.slug === hovered)?.image ?? null;

  return (
    <section className="relative py-24 sm:py-36" aria-labelledby="past-title">
      <div className="container-x flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <Eyebrow>{eventsPage.eyebrow}</Eyebrow>
            <RevealText id="past-title" text={eventsPage.pastTitle} className="text-display text-[clamp(44px,7vw,112px)]" />
          </div>

          <LayoutGroup>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter op pijler">
              {[null, ...pillars].map((p) => {
                const active = filter === p;
                return (
                  <button
                    key={p ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(p)}
                    className={`relative rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                      active ? "text-white" : "text-cream/70 hover:text-cream"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-blue"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {!active && <span className="absolute inset-0 rounded-full ring-1 ring-white/12" />}
                    <span className="relative">{p ?? eventsPage.allLabel}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <ul className="border-t border-white/10" onPointerLeave={() => setHovered(null)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((e, i) => (
              <motion.li
                key={e.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 6) * 0.03 }}
                className="border-b border-white/10"
              >
                <Link
                  href={`/events/${e.slug}`}
                  onPointerEnter={() => setHovered(e.slug)}
                  onFocus={() => setHovered(e.slug)}
                  className="group relative grid grid-cols-[88px_1fr] items-center gap-5 overflow-hidden py-5 sm:grid-cols-[120px_1fr] lg:grid-cols-[60px_1.6fr_1fr_auto] lg:gap-8 lg:py-8"
                >
                  {/* blue wipe on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-blue transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                  />

                  <span className="relative hidden text-[14px] font-bold tabular-nums text-cream/40 transition-colors group-hover:text-white/70 lg:block lg:pl-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* thumbnail on touch / small screens */}
                  <span className="relative aspect-square overflow-hidden rounded-2xl lg:hidden">
                    <Image src={e.image} alt="" fill sizes="120px" className="object-cover" />
                  </span>

                  <span className="relative flex min-w-0 flex-col gap-2">
                    <span className="text-display text-[clamp(24px,3.4vw,52px)] leading-[0.98] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                      {e.title}
                    </span>
                    <span className="text-[15px] text-cream/60 transition-colors group-hover:text-white/85 sm:text-base">
                      {e.subtitle}
                    </span>
                    <span className="flex flex-wrap items-center gap-2 lg:hidden">
                      <PillarTag pillar={e.pillar} />
                      <span className="text-[13px] text-cream/50">
                        {eventsPage.pastLabel}
                        {e.location ? ` · ${e.location}` : ""}
                      </span>
                    </span>
                  </span>

                  <span className="relative hidden flex-col gap-2 lg:flex">
                    <PillarTag pillar={e.pillar} className="group-hover:bg-white group-hover:text-ink group-hover:ring-0" />
                    <span className="text-[14px] text-cream/55 transition-colors group-hover:text-white/85">
                      {eventsPage.pastLabel}
                      {e.location ? ` · ${e.location}` : ""}
                      {e.date ? ` · ${e.date}` : ""}
                    </span>
                  </span>

                  <span className="relative hidden items-center gap-3 pr-4 text-[15px] font-bold lg:flex">
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">{eventsPage.moreInfo}</span>
                    <span className="flex size-12 items-center justify-center rounded-full border border-white/20 transition-all duration-500 ease-out-expo group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-blue">
                      →
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {!reduce && <CursorPreview image={hoveredImage} visible={hovered !== null} />}
    </section>
  );
}
