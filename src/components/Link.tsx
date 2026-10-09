"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localize } from "@/i18n";
import { useLang } from "./LangProvider";

/** next/link that sends internal links to the current language ("/events" → "/en/events" in English). */
export function Link({ href, ...props }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  return <NextLink href={localize(href, useLang())} {...props} />;
}
