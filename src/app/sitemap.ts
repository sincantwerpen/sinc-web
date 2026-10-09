import type { MetadataRoute } from "next";
import { eventSlugs } from "@/content";
import { localize } from "@/i18n";

const SITE = "https://sincantwerpen.be";

/** /sitemap.xml: every page in Dutch with its English version, for Google. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/events", "/partners", "/community", "/over-sinc", "/het-team", "/contact", "/privacy", ...eventSlugs.map((s) => `/events/${s}`)];
  return paths.flatMap((path) =>
    (["nl", "en"] as const).map((lang) => ({
      url: SITE + (localize(path, lang) === "/" ? "" : localize(path, lang)),
      changeFrequency: path.startsWith("/events") ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/events" ? 0.9 : 0.7,
      alternates: { languages: { nl: SITE + (path === "/" ? "" : path), en: SITE + localize(path, "en") } },
    })),
  );
}
