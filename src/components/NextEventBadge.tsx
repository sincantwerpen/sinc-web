"use client";

import { Link } from "./Link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { getContent, type Content } from "@/content";
import { intlLocale, type Lang } from "@/i18n";
import { ArrowIcon } from "@/components/ui";
import { useLang, useT } from "./LangProvider";

const EASE = [0.16, 1, 0.3, 1] as const;
const TZ = "Europe/Brussels";

function dateParts(iso: string, lang: Lang) {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", timeZone: TZ }).format(d);
  const month = new Intl.DateTimeFormat(intlLocale[lang], { month: "short", timeZone: TZ })
    .format(d)
    .replace(".", "")
    .toUpperCase();
  return { day, month };
}

/** "vandaag", "morgen", "over 5 dagen" (calendar days in Brussels time). Only used inside the card,
 *  which exists only after a click, so it's always computed in the browser with the real date. */
function relativeDay(iso: string, copy: Content["nextEventBadge"]) {
  const ymd = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
  const days = Math.round((Date.parse(ymd(new Date(iso))) - Date.parse(ymd(new Date()))) / 86400000);
  return days <= 0 ? copy.today : days === 1 ? copy.tomorrow : copy.inDays(days);
}

/**
 * Round button in the bottom-right corner with the date of the next event. The text ring turns
 * slowly and speeds up on hover; clicking opens a small card that links to the event page.
 */
// Which event is next only depends on the dates, which are the same in every language.
const dated = getContent("nl").upcomingEvents.filter((e) => e.startsAt);
const noSubscribe = () => () => {};
/** First event that hasn't ended yet (counted as over 4 hours after the start). */
const nextSlug = () => dated.find((e) => Date.parse(e.startsAt!) + 4 * 3600_000 > Date.now())?.slug ?? null;

export function NextEventBadge() {
  // The page is built ahead of time, so the browser re-checks which event is next.
  const slug = useSyncExternalStore(noSubscribe, nextSlug, () => dated[0]?.slug ?? null);
  const lang = useLang();
  const { upcomingEvents, nextEventBadge: copy } = useT();
  const event = upcomingEvents.find((e) => e.slug === slug);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Phones: keep the hero buttons and the newsletter form in the footer free, so the badge only shows
  // between the hero and the footer. No scroll listener: the browser itself reports (IntersectionObserver)
  // when the top of the page or the footer is on screen; reading positions while scrolling makes phones stutter.
  const [away, setAway] = useState<boolean | null>(null); // null = not checked yet: hidden on phones only
  const heroMarker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 639px)");
    const footer = document.querySelector("footer");
    const seen = new Map<Element, boolean>();
    const update = () => setAway(phone.matches && [...seen.values()].some(Boolean));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target, e.isIntersecting);
      update();
    });
    if (heroMarker.current) io.observe(heroMarker.current);
    if (footer) io.observe(footer);
    phone.addEventListener("change", update);
    return () => {
      io.disconnect();
      phone.removeEventListener("change", update);
    };
  }, []);
  // Ring rotation with a smooth change of speed on hover (paused while the badge is hidden).
  const angle = useMotionValue(0);
  const speed = useRef(18);
  useAnimationFrame((_, delta) => {
    if (reduce || (away && !open)) return;
    const target = hover || open ? 110 : 18; // degrees per second
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    angle.set((angle.get() + (speed.current * delta) / 1000) % 360);
  });

  const visibility = open
    ? ""
    : away === null
      ? "max-sm:pointer-events-none max-sm:translate-y-6 max-sm:opacity-0"
      : away
        ? "pointer-events-none translate-y-6 opacity-0"
        : "";

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (!event?.startsAt) return null;
  const { day, month } = dateParts(event.startsAt, lang);
  const time = event.time?.split(/\s*[–-]\s*/)[0];
  const ringChars = [...copy.ring];

  return (
    <>
    {/* Covers the first 60% of the screen at the top of the page: while it's visible, the hero is. */}
    <div ref={heroMarker} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60svh]" />
    <div
      ref={rootRef}
      className={`fixed bottom-4 right-4 z-30 flex flex-col items-end gap-4 transition-[opacity,translate] duration-500 ease-out-expo sm:bottom-8 sm:right-8 ${
        visibility
      }`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id="next-event-panel"
            role="dialog"
            aria-label={copy.title}
            className="w-[min(380px,calc(100vw-32px))] origin-bottom-right overflow-hidden rounded-[28px] bg-blue p-6 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15"
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">{copy.eyebrow}</p>
            <p className="text-display mt-2 text-[32px] leading-[1]">{copy.title}</p>
            <p className="mt-1 text-[18px] font-bold italic text-yellow">{copy.subtitle}</p>

            <div className="my-5 border-t-2 border-dashed border-white/30" />

            <Link
              href={`/events/${event.slug}`}
              onClick={() => setOpen(false)}
              className="group relative grid grid-cols-[88px_1fr] rounded-[18px] bg-cream text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex flex-col items-center justify-center py-5">
                <span className="text-display text-[44px] leading-none text-blue">{day}</span>
                <span className="mt-1 text-[12px] font-bold tracking-[0.18em] text-ink/60">{month}</span>
              </div>
              {/* ticket perforation */}
              <span aria-hidden className="absolute bottom-3 left-[88px] top-3 border-l-2 border-dashed border-ink/15" />
              <span aria-hidden className="absolute -top-2 left-[81px] size-4 rounded-full bg-blue" />
              <span aria-hidden className="absolute -bottom-2 left-[81px] size-4 rounded-full bg-blue" />
              <div className="flex flex-col justify-center gap-1 py-4 pl-5 pr-4">
                <span className="text-display text-[22px] leading-[1.05]">
                  {event.title}: {event.subtitle}
                </span>
                <span className="text-[14px] text-ink/60">
                  {[time, relativeDay(event.startsAt, copy)].filter(Boolean).join(" · ")}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-[0.08em] text-blue">
                  {copy.moreInfo}
                  <span className="flex transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon className="size-4" /></span>
                </span>
              </div>
            </Link>

            <Link href="/events" onClick={() => setOpen(false)} className="group mt-5 flex w-fit items-center gap-2 text-[17px] font-bold">
              {copy.allEvents}
              <span className="flex transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* attention pulse */}
        {!open && !reduce && (
          <span aria-hidden className="absolute inset-0 animate-badge-pulse rounded-full bg-blue" />
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          aria-expanded={open}
          aria-controls={open ? "next-event-panel" : undefined}
          aria-label={open ? copy.close : `${copy.open}: ${event.title}, ${day} ${month}`}
          className="relative block size-[100px] rounded-full bg-blue text-white shadow-[0_18px_50px_-8px_rgba(0,150,255,0.85),inset_0_0_0_1px_rgba(255,255,255,0.25)] [--r:40px] sm:size-[120px] sm:[--r:49px]"
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: hover ? 0.9 : 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileTap={{ scale: 0.85 }}
        >
          {/* rotating ring of letters: plain HTML so it renders the same in every browser */}
          <motion.span aria-hidden className="absolute inset-0 will-change-transform" style={{ rotate: angle }}>
            {ringChars.map((ch, i) => (
              <span
                key={i}
                className="absolute left-1/2 w-3 text-center text-[9px] font-bold uppercase leading-none sm:text-[10.5px]"
                style={{
                  top: "calc(50% - var(--r))",
                  height: "var(--r)",
                  transformOrigin: "50% 100%",
                  transform: `translateX(-50%) rotate(${(360 / ringChars.length) * i}deg)`,
                }}
              >
                {ch}
              </span>
            ))}
          </motion.span>

          {/* centre: date (or a close cross while the card is open) */}
          <span className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-ink-2 to-[#0d1a2e] ring-2 ring-yellow">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  className="text-[22px] font-bold leading-none text-yellow sm:text-[26px]"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden
                >
                  ✕
                </motion.span>
              ) : (
                <motion.span
                  key="date"
                  className="flex flex-col items-center"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden
                >
                  <span className="text-display text-[24px] leading-none sm:text-[30px]">{day}</span>
                  <span className="mt-0.5 text-[9px] font-bold tracking-[0.16em] text-yellow sm:text-[10.5px]">{month}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </div>
    </>
  );
}
