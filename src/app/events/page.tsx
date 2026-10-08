import type { Metadata } from "next";
import { eventsPage } from "@/content/site";
import { upcomingEvents } from "@/content/events";
import { Eyebrow, Reveal, RevealText } from "@/components/ui";
import { EmptyEventsCard } from "@/components/Events";
import { PhotoRing } from "@/components/events/PhotoRing";
import { PastEvents } from "@/components/events/PastEvents";
import { FeaturedEvent } from "@/components/events/FeaturedEvent";

export const metadata: Metadata = {
  title: "Events | SINC Antwerpen",
  description: eventsPage.lead,
};

export default function EventsPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden pt-36 sm:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[30%] size-[80vw] max-w-[1200px] -translate-x-1/2 glow text-blue/20" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
        </div>

        <div className="container-x flex flex-col items-center gap-7 text-center">
          <Eyebrow>{eventsPage.eyebrow}</Eyebrow>
          <RevealText as="h1" text={eventsPage.title} className="text-display text-[clamp(48px,14.5vw,64px)] sm:text-[clamp(56px,11vw,180px)]" />
          <Reveal delay={0.2}>
            <p className="mx-auto max-w-[640px] text-lg leading-[1.6] text-cream/70">{eventsPage.lead}</p>
          </Reveal>
        </div>

        <div className="mt-6 sm:mt-10">
          <PhotoRing photos={eventsPage.heroPhotos} />
        </div>
      </section>

      <section className="relative pt-10 sm:pt-16" aria-label={eventsPage.title}>
        <div className="container-x">
          {upcomingEvents.length === 0 ? (
            <EmptyEventsCard showCta={false} />
          ) : (
            <div className="flex flex-col gap-6">
              {upcomingEvents.map((e) => (
                <FeaturedEvent key={e.slug} event={e} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PastEvents />
    </main>
  );
}
