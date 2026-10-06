"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { RevealText } from "../ui";

type Stat = { value: number; suffix: string; label: string };

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const fmt = (n: number) => String(Math.round(n)) + suffix;
    if (reduce) {
      el.textContent = fmt(value);
      return;
    }
    const c = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => c.stop();
  }, [inView, value, suffix, reduce]);
  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/** "SINC in cijfers": numbers count up when they scroll into view. */
export function Stats({ title, stats }: { title: string; stats: Stat[] }) {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="stats-title">
      <div className="container-x flex flex-col gap-12">
        <RevealText id="stats-title" text={title} className="text-display text-[clamp(38px,5.4vw,84px)]" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex aspect-square flex-col justify-between rounded-[28px] p-6 sm:p-8 ${
                ["bg-blue text-white", "bg-cream text-ink", "bg-ink-2 text-cream ring-1 ring-white/10", "bg-yellow text-ink"][i % 4]
              }`}
            >
              <span className="text-display text-[clamp(44px,5.4vw,88px)]">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[15px] font-bold sm:text-lg">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
