"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Buttery inertial scrolling. Skipped for people who prefer reduced motion. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const backForward = useRef(false);
  const path = usePathname();

  useEffect(() => {
    const onPop = () => (backForward.current = true);
    window.addEventListener("popstate", onPop);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("popstate", onPop);
    }
    const l = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // Scrolling inside the open phone menu must not move the (locked) page behind it.
      prevent: (node) => !!node.closest("#mobile-menu"),
    });
    lenis.current = l;
    let frame = requestAnimationFrame(function raf(time) {
      l.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      window.removeEventListener("popstate", onPop);
      cancelAnimationFrame(frame);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // A new page always starts at the top (Lenis can otherwise keep the old position). Back/forward keeps
  // the browser's own scroll restore, and links to an anchor (#...) scroll to that anchor.
  useEffect(() => {
    if (backForward.current) {
      backForward.current = false;
      return;
    }
    if (window.location.hash) return;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [path]);

  return null;
}
