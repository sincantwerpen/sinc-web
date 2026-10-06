"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { hero } from "@/content/site";
import { Button } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));


/**
 * "Students for / Innovation & / Cooperation" — on scroll the blue S, I, N and C glide
 * together into SINC on the third line and stop dead still. Positions are measured from the
 * rendered letters, so it lines up at every screen size and with any fallback font.
 */
function MorphTitle({ progress }: { progress: MotionValue<number> }) {
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const sRef = useRef<HTMLSpanElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const yS = useMotionValue(0);
  const yIn = useMotionValue(0);
  const xIn = useMotionValue(0);
  const xC = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      const [l1, l2, l3] = lines.current;
      if (!l1 || !l2 || !l3 || !sRef.current || !capRef.current) return;
      const wS = sRef.current.getBoundingClientRect().width;
      const wIN = capRef.current.getBoundingClientRect().width;
      yS.set(l3.offsetTop - l1.offsetTop);
      yIn.set(l3.offsetTop - l2.offsetTop);
      xIn.set(wS);
      xC.set(wS + wIN);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [yS, yIn, xIn, xC]);

  const t = useTransform(progress, (v) => easeOutCubic(clamp01(v)));
  const times = ([v, d]: number[]) => v * d;
  const sY = useTransform([t, yS], times);
  const inX = useTransform([t, xIn], times);
  const inY = useTransform([t, yIn], times);
  const cX = useTransform([t, xC], times);
  const lowerOpacity = useTransform(t, [0, 0.35], [1, 0]);
  const upperOpacity = useTransform(t, [0.05, 0.4], [0, 1]);
  const restOpacity = useTransform(t, [0, 0.4], [1, 0]);
  const restX = useTransform(t, [0, 1], [0, 40]);
  const restBlur = useTransform(t, [0, 0.4], ["blur(0px)", "blur(8px)"]);

  const rest = "inline-block whitespace-pre text-cream";
  const keeper = "inline-block text-blue will-change-transform";

  const lineIn = (i: number) => ({
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: EASE, delay: 0.25 + i * 0.09 },
  });

  return (
    <h1
      aria-label={hero.title}
      className="text-display relative flex flex-col text-[clamp(50px,8.2vw,124px)] leading-[0.92]"
    >
      <motion.span ref={(el) => { lines.current[0] = el; }} className="flex" aria-hidden {...lineIn(0)}>
        <motion.span ref={sRef} className={keeper} style={{ y: sY }}>S</motion.span>
        <motion.span className={rest} style={{ opacity: restOpacity, x: restX, filter: restBlur }}>tudents for</motion.span>
      </motion.span>
      <motion.span ref={(el) => { lines.current[1] = el; }} className="flex" aria-hidden {...lineIn(1)}>
        <motion.span className={`${keeper} relative`} style={{ x: inX, y: inY }}>
          <motion.span className="inline-block" style={{ opacity: lowerOpacity }}>In</motion.span>
          <motion.span ref={capRef} className="absolute left-0 top-0" style={{ opacity: upperOpacity }}>IN</motion.span>
        </motion.span>
        <motion.span className={rest} style={{ opacity: restOpacity, x: restX, filter: restBlur }}>novation &amp;</motion.span>
      </motion.span>
      <motion.span ref={(el) => { lines.current[2] = el; }} className="flex" aria-hidden {...lineIn(2)}>
        <motion.span className={keeper} style={{ x: cX }}>C</motion.span>
        <motion.span className={rest} style={{ opacity: restOpacity, x: restX, filter: restBlur }}>ooperation</motion.span>
      </motion.span>
    </h1>
  );
}

/** Six team portraits that float at different scroll speeds and tilt towards the cursor. */
function PhotoStack({ scroll }: { scroll: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 20 });
  const sry = useSpring(ry, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ry.set((e.clientX / window.innerWidth - 0.5) * 10);
      rx.set(-(e.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rx, ry]);

  const speeds = [-60, 40, -110, 70, -30, 110];
  const offsets = ["", "mt-6 sm:mt-16", "mt-3 sm:mt-6", "sm:mt-24", "", "mt-6 sm:mt-12"];
  const ys = [
    useTransform(scroll, [0, 800], [0, speeds[0]]),
    useTransform(scroll, [0, 800], [0, speeds[1]]),
    useTransform(scroll, [0, 800], [0, speeds[2]]),
    useTransform(scroll, [0, 800], [0, speeds[3]]),
    useTransform(scroll, [0, 800], [0, speeds[4]]),
    useTransform(scroll, [0, 800], [0, speeds[5]]),
  ];

  return (
    <motion.div
      className="relative grid grid-cols-3 gap-3 [perspective:1400px] sm:gap-4"
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
    >
      {hero.photos.map((p, i) => (
        <motion.div key={p.src} style={{ y: reduce || !wide ? 0 : ys[i] }} className={offsets[i]}>
          <motion.div
            className="group relative aspect-[3/4] overflow-hidden rounded-[22px] bg-ink-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:rounded-[28px]"
            initial={{ opacity: 0, y: 80, scale: 0.85, rotate: i % 2 ? 6 : -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.5 + i * 0.08 }}
            whileHover={{ scale: 1.04, rotate: i % 2 ? 2 : -2 }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 14vw, 30vw"
              priority={i < 3}
              className="object-cover object-[50%_30%] transition-transform duration-700 ease-out-expo group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        </motion.div>
      ))}

      {/* Spinning badge */}
      <motion.div
        className="absolute -bottom-10 -left-8 hidden size-32 items-center justify-center rounded-full bg-yellow text-ink shadow-[0_20px_40px_-15px_rgba(255,216,77,0.6)] sm:flex lg:-left-14 lg:size-36"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
        style={{ z: 60 }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
          <defs>
            <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-ink text-[7.4px] font-bold uppercase">
            <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
              Students for Innovation &amp; Cooperation •
            </textPath>
          </text>
        </svg>
        <span className="text-3xl" aria-hidden>🚀</span>
      </motion.div>
    </motion.div>
  );
}

/** Soft blue light that trails the cursor across the hero. */
function Spotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,150,255,0.18),transparent_65%)]"
      style={{ x: sx, y: sy }}
    />
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const morph = useMotionValue(0);

  useEffect(() => {
    if (reduce) return;
    return scrollY.on("change", (v) => morph.set(v / Math.max(260, window.innerHeight * 0.5)));
  }, [scrollY, morph, reduce]);

  const glowY = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <section className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44 lg:min-h-[100svh] lg:pb-32">
      {/* Background: drifting aurora, masked grid, cursor light */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div style={{ y: glowY }} className="absolute inset-0">
          <div className="absolute -right-[20%] -top-[30%] size-[70vw] max-w-[1100px] animate-[spin_40s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg,#0096ff,#0060d6,#0b0e14,#0096ff)] opacity-40 blur-[120px]" />
          <div className="absolute -left-[15%] top-[40%] size-[45vw] rounded-full bg-blue/25 blur-[140px]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>
      {!reduce && <Spotlight />}

      <div className="container-x grid items-start gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start gap-8">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-bold text-cream/90 backdrop-blur-md sm:text-[13px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            {hero.eyebrow}
          </motion.span>

          <MorphTitle progress={morph} />

          <motion.p
            className="max-w-[560px] text-[17px] leading-[1.6] text-cream/70 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            {hero.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.72 }}
          >
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="ghost" arrow={false}>
              {hero.secondary.label}
            </Button>
          </motion.div>
        </div>

        <div className="lg:pt-6">
          <PhotoStack scroll={scrollY} />
        </div>
      </div>
    </section>
  );
}
