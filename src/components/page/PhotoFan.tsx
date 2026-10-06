"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Six portraits dealt out like a hand of cards. They fan open on load, follow the
 * cursor a little, and the card you point at pops out of the hand.
 */
export function PhotoFan({ photos }: { photos: string[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const tilt = useTransform(sx, [-1, 1], [-4, 4]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => mx.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, reduce]);

  const n = photos.length;
  const mid = (n - 1) / 2;

  return (
    <motion.div
      className="relative mx-auto h-[340px] w-full max-w-[620px] sm:h-[440px]"
      style={{ rotate: tilt }}
      onPointerLeave={() => setActive(null)}
    >
      {photos.map((src, i) => {
        const off = i - mid;
        const isActive = active === i;
        return (
          <motion.div
            key={src}
            className="absolute bottom-0 left-[34%] aspect-[3/4] w-[32%] origin-bottom cursor-pointer overflow-hidden rounded-[22px] bg-ink-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
            style={{ zIndex: isActive ? 20 : 10 - Math.abs(Math.round(off)) }}
            initial={{ rotate: 0, x: "0%", y: 80, opacity: 0 }}
            animate={{
              rotate: off * 7,
              x: `${off * 42}%`,
              y: isActive ? -50 : Math.abs(off) * 14,
              scale: isActive ? 1.08 : 1,
              opacity: 1,
            }}
            transition={{ duration: isActive ? 0.45 : 1.1, ease: EASE, delay: active === null ? 0.3 + i * 0.06 : 0 }}
            onPointerEnter={() => setActive(i)}
          >
            <Image src={src} alt="" fill sizes="220px" className="object-cover object-top" priority={i < 3} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
