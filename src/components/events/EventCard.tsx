import Image from "next/image";
import { Link } from "../Link";
import type { SincEvent } from "@/content";
import { getT } from "@/content/server";
import { Reveal, ArrowIcon } from "../ui";
import { PillarTag } from "./PastEvents";

/** Poster card for an event: used for upcoming events and "misschien ook interessant". */
export async function EventCard({ event: e, delay = 0 }: { event: SincEvent; delay?: number }) {
  const { eventsPage } = await getT();
  return (
    <Reveal delay={delay}>
      <Link
        href={`/events/${e.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-ink-2 ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:ring-blue hover:shadow-[0_30px_70px_-25px_rgba(0,150,255,0.55)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={e.image}
            alt={e.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <PillarTag pillar={e.pillar} className="absolute left-4 top-4" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-display text-[28px] leading-[1.02]">{e.title}</h3>
          <p className="text-cream/70">{e.subtitle}</p>
          <p className="mt-auto pt-2 text-[14px] text-cream/50">
            {[e.upcoming ? null : eventsPage.pastLabel, e.location, e.date].filter(Boolean).join(" · ")}
          </p>
          <span className="flex items-center gap-2 text-[15px] font-bold text-blue">
            {eventsPage.moreInfo}
            <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-1"><ArrowIcon /></span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
