"use client";

import { useSyncExternalStore } from "react";

/** Live result of a CSS media query (false during server rendering). */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Large screen with a mouse: where the heavier decorative motion runs. */
export const DESKTOP = "(min-width: 1024px) and (hover: hover)";
