"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Member } from "@/content";
import { useT } from "../LangProvider";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current stroke-2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Round icon button. Without a link yet it shows dimmed and does nothing. */
function IconLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  const cls =
    "flex size-11 items-center justify-center rounded-full ring-1 transition-all duration-300 ease-out-expo";
  if (!href)
    return (
      <span aria-hidden className={`${cls} bg-white/5 text-white/35 ring-white/10`}>
        {children}
      </span>
    );
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className={`${cls} bg-white/10 text-white ring-white/25 hover:-translate-y-0.5 hover:bg-blue hover:ring-blue`}
    >
      {children}
    </a>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

/**
 * A team member: portrait card that flies in from the side as it scrolls into view,
 * then tilts towards the cursor with a soft light reflection.
 */
export function MemberCard({ m, from, big = false }: { m: Member; from: "left" | "right"; big?: boolean }) {
  const { teamPage } = useT();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // Fly-in, tied to scroll: off-screen while the card's top is at the bottom of the screen,
  // in place once it reaches ~70% of the screen height. Then it stays perfectly still.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "start 0.7"] });
  const sign = from === "left" ? -1 : 1;
  const ease = (v: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, v)), 3);
  const x = useTransform(scrollYProgress, (v) => `${sign * 70 * (1 - ease(v))}vw`);
  const rotate = useTransform(scrollYProgress, (v) => sign * -10 * (1 - ease(v)));
  const y = useTransform(scrollYProgress, (v) => 60 * (1 - ease(v)));

  // Cursor tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 160, damping: 18 });
  const glare = useTransform(
    [px, py],
    ([a, b]: number[]) => `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,0.22), transparent 55%)`,
  );
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !card.current) return;
    const r = card.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div ref={wrap} className="h-full [perspective:1200px]" style={reduce ? undefined : { x, y, rotate }}>
      <motion.article
        ref={card}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className={`group relative isolate h-full overflow-hidden bg-ink-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_40px_90px_-30px_rgba(0,150,255,0.55)] hover:ring-blue/60 ${
          big ? "min-h-[520px] rounded-[36px] sm:min-h-[600px]" : "aspect-[3/4] rounded-[28px]"
        }`}
      >
        {m.photo ? (
          <Image
            src={m.photo}
            alt={m.name}
            fill
            sizes={big ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
            className="-z-10 object-cover object-[50%_25%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-blue via-blue-deep to-ink">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <span className="text-display absolute inset-0 flex items-center justify-center pb-16 text-[clamp(90px,12vw,160px)] text-white/90">
              {initials(m.name)}
            </span>
          </div>
        )}

        {/* readability gradient + hover tint */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />

        <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 ${big ? "p-6 sm:p-9" : "p-4 sm:p-5"}`}>
          <div className={`flex min-w-0 flex-col items-start gap-2.5 ${big ? "sm:pr-28" : ""}`}>
            <span
              className={`whitespace-nowrap rounded-full px-3 py-1 font-bold uppercase max-[374px]:whitespace-normal max-[374px]:rounded-[10px] max-[374px]:leading-tight ${
                big ? "text-[11px] tracking-[0.14em]" : "text-[9.5px] tracking-[0.08em] sm:text-[11px] sm:tracking-[0.12em]"
              } ${
                m.lead ? "bg-yellow text-ink" : "bg-white/15 text-white"
              }`}
            >
              {m.role}
            </span>
            <h3
              className={`text-display text-white ${
                big ? "text-[clamp(36px,4.6vw,72px)]" : "text-[17px] leading-[1] min-[360px]:text-[19px] sm:text-[clamp(19px,2vw,28px)]"
              }`}
            >
              {m.name}
            </h3>
          </div>
        </div>

        {/* LinkedIn + email: top-right on phones and small cards, bottom-right on big cards from tablet up; on desktop they appear on hover */}
        <div
          className={`absolute flex gap-2 transition-all duration-500 ease-out-expo lg:opacity-0 lg:group-hover:opacity-100 ${
            big ? "right-5 top-5 sm:bottom-9 sm:right-9 sm:top-auto lg:translate-y-3 lg:group-hover:translate-y-0" : "right-4 top-4 lg:-translate-y-2 lg:group-hover:translate-y-0"
          }`}
        >
          <IconLink href={m.linkedin} label={`${teamPage.linkedinLabel}: ${m.name}`}>
            <LinkedInIcon />
          </IconLink>
          <IconLink href={m.email ? `mailto:${m.email}` : undefined} label={`${teamPage.emailLabel}: ${m.name}`}>
            <MailIcon />
          </IconLink>
        </div>
      </motion.article>
    </motion.div>
  );
}
