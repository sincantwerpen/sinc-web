"use client";

import { Link } from "./Link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Small label above a section title: blue dot + uppercase text. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] ${
        light ? "text-ink/70" : "text-cream/70"
      }`}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-blue opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-blue" />
      </span>
      {children}
    </span>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease: EASE, delay: i * 0.045 } }),
};

/** Headline that slides in word by word from behind a mask when it enters the viewport. */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  id,
}: {
  text: string;
  id?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={text}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
          <motion.span className="inline-block" variants={wordVariants} custom={i}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Generic fade-and-rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Bold arrow icon used on every button and link. `dir` turns it: left (back) or up-right (external). */
export function ArrowIcon({ className = "size-[18px]", dir = "right" }: { className?: string; dir?: "right" | "left" | "up-right" }) {
  const rotate = dir === "left" ? "rotate-180" : dir === "up-right" ? "-rotate-45" : "";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 ${rotate} ${className}`}
    >
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
    </svg>
  );
}

/** Button arrow: slides out to the right on hover while a second one slides in. */
function Arrow() {
  return (
    <span className="relative inline-flex size-[18px] shrink-0 overflow-hidden" aria-hidden>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:translate-x-full">
        <ArrowIcon />
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
        <ArrowIcon />
      </span>
    </span>
  );
}

type ButtonVariant = "primary" | "ghost" | "dark" | "light";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-blue text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] hover:shadow-[0_16px_50px_-8px_rgba(0,150,255,0.95)]",
  ghost: "border border-white/20 bg-ink/40 text-cream hover:border-white/50 hover:bg-white/5",
  dark: "bg-ink text-cream hover:bg-ink-2",
  light: "bg-cream text-ink hover:bg-white",
};

/** Pill button that leans towards the cursor a little (magnetic hover). */
export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const external = /^(https?:|mailto:)/.test(href);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  const cls = `group inline-flex h-13 items-center gap-3 rounded-full px-7 text-[15px] font-bold tracking-[-0.01em] transition-[background,box-shadow,border-color] duration-300 ${variantClass[variant]} ${className}`;

  return (
    <motion.span style={{ x, y }} className="inline-flex" onPointerMove={onMove} onPointerLeave={reset}>
      {external ? (
        <a ref={ref} href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      ) : (
        <Link ref={ref} href={href} className={cls}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}
