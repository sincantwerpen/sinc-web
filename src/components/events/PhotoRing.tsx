"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useVelocity,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A curved wall of event photos that slowly turns in 3D. Scroll speed adds spin,
 * and you can grab it and throw it around (it keeps some momentum).
 */
export function PhotoRing({ photos }: { photos: string[] }) {
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 240, h: 400, r: 760 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) setSize({ w: 150, h: 260, r: 380 });
      else if (vw < 1024) setSize({ w: 190, h: 330, r: 560 });
      else setSize({ w: 240, h: 400, r: 760 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fill the whole ring with photos, spaced roughly one card width apart.
  const count = Math.max(photos.length, Math.floor((2 * Math.PI * size.r) / (size.w * 1.15)));
  const cards = Array.from({ length: count }, (_, i) => photos[i % photos.length]);
  const step = 360 / count;

  const angle = useMotionValue(0);
  const spin = useRef(0); // extra angular velocity from dragging, in deg/s
  const drag = useRef<{ x: number; t: number } | null>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const dt = delta / 1000;
    if (!drag.current) {
      const fromScroll = Math.max(-60, Math.min(60, scrollVelocity.get() * 0.04));
      angle.set(angle.get() - (6 + fromScroll + spin.current) * dt);
      spin.current *= Math.pow(0.05, dt); // momentum fades out
    }
  });

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, t: performance.now() };
    spin.current = 0;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const now = performance.now();
    const dx = e.clientX - drag.current.x;
    const da = dx * 0.18;
    angle.set(angle.get() + da);
    const dt = Math.max(1, now - drag.current.t) / 1000;
    spin.current = -(da / dt) * 0.6;
    drag.current = { x: e.clientX, t: now };
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <motion.div
      className="relative mx-auto flex w-full cursor-grab touch-pan-y select-none items-center justify-center overflow-hidden active:cursor-grabbing [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]"
      style={{ height: size.h + 120, perspective: 1500 }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
      aria-hidden
    >
      <div
        className="relative"
        style={{ width: size.w, height: size.h, transformStyle: "preserve-3d", transform: `translateZ(${-size.r}px)` }}
      >
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", rotateY: angle }}>
        {cards.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden rounded-[26px] bg-ink-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 [backface-visibility:hidden]"
            style={{ transform: `rotateY(${i * step}deg) translateZ(${size.r}px)` }}
          >
            <Image src={src} alt="" fill sizes="240px" className="pointer-events-none object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>
      </div>
    </motion.div>
  );
}
