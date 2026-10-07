"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Endless band of words. It drifts on its own and speeds up (or reverses)
 * with the speed and direction of your scroll.
 */
export function VelocityMarquee({
  words,
  baseVelocity = -2.2,
  className = "",
}: {
  words: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);
  const box = useRef<HTMLDivElement>(null);
  const visible = useInView(box);

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 sm:px-10">{w}</span>
          <svg viewBox="0 0 24 24" className="size-[0.5em] fill-current opacity-90" aria-hidden>
            <path d="M12 0l2.8 9.2L24 12l-9.2 2.8L12 24l-2.8-9.2L0 12l9.2-2.8z" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div ref={box} className={`overflow-hidden ${className}`} aria-label={words.join(", ")}>
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }} aria-hidden>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
