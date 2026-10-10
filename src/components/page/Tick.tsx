"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Blue circle that pops in, then the tick draws itself. */
export function Tick() {
  return (
    <motion.div
      aria-hidden
      className="flex size-24 items-center justify-center rounded-full bg-blue shadow-[0_20px_60px_-10px_rgba(0,150,255,0.8)] sm:size-28"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
    >
      <svg viewBox="0 0 24 24" className="size-12 sm:size-14" fill="none" stroke="white" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M5 12.5 10 17.5 19.5 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
        />
      </svg>
    </motion.div>
  );
}
