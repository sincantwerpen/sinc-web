"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Event poster that tilts in 3D towards the cursor, with a moving light reflection. */
export function TiltPoster({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55), transparent 55%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className="[perspective:1200px]"
      initial={{ opacity: 0, y: 60, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
      >
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: glare }}
        />
      </motion.div>
    </motion.div>
  );
}
