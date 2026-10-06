"use client";

import { useRef, type ReactNode } from "react";

/** Card with a soft blue light that follows the cursor across its surface and border. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-[28px] bg-ink-2 p-px transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 ${className}`}
      style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,0%), rgba(0,150,255,0.7), rgba(255,255,255,0.08) 45%)" }}
    >
      <div className="relative h-full rounded-[27px] bg-ink-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[27px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(500px circle at var(--x,50%) var(--y,0%), rgba(0,150,255,0.14), transparent 55%)" }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
