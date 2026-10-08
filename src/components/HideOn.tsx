"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders its children on every page except the given path. */
export function HideOn({ path, children }: { path: string; children: ReactNode }) {
  return usePathname() === path ? null : <>{children}</>;
}
