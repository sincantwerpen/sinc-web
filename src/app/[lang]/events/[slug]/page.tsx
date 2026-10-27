import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/Link";
import { notFound } from "next/navigation";
import { allEventSlugs, getT, pageMeta } from "@/content/server";
import { Button, Reveal, ArrowIcon } from "@/components/ui";
import { PillarTag } from "@/components/events/PastEvents";
import { EventCard } from "@/components/events/EventCard";
import { TiltPoster } from "@/components/events/TiltPoster";
import { Body } from "@/components/events/EventBody";
import { LumaEvent } from "@/components/events/LumaEvent";

// Events published later in the dashboard are rendered on their first visit.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await allEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = (await getT()).getEvent(slug);
  if (!e) return {};
  const { siteMeta } = await getT();
  return {
    ...(await pageMeta(`/events/${slug}`, e.title, e.excerpt)),
    openGraph: { title: `${e.title}: ${e.subtitle}`, description: e.excerpt, images: [e.image], locale: siteMeta.ogLocale, type: "website" },
  };
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { slug } = await params;
  const { getEvent, eventsPage, upcomingEvents } = await getT();
  const e = getEvent(slug);
  if (!e) notFound();
  if (e.dashboard) return <LumaEvent event={e} />;

  const { detail } = eventsPage;
  const info = [
    { label: detail.labels.date, value: e.date },
    { label: detail.labels.time, value: e.time },
    { label: detail.labels.doors, value: e.doors },
    { label: detail.labels.location, value: e.location },
    { label: detail.labels.price, value: e.price },
  ].filter((r) => r.value);
  const related = upcomingEvents.filter((u) => u.slug !== e.slug).slice(0, 3);

  return (
    <main className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[900px] transform-gpu overflow-hidden">
        <Image src={e.image} alt="" fill sizes="96px" className="scale-125 object-cover opacity-25 blur-[90px] saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
      </div>

      <section className="container-x pt-32 sm:pt-40">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[14px] font-bold text-cream/80 transition-colors hover:border-white/40 hover:text-white"
        >
          <span className="flex transition-transform duration-500 ease-out-expo group-hover:-translate-x-1"><ArrowIcon dir="left" /></span>
          {detail.back}
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <PillarTag pillar={e.pillar} />
              {!e.upcoming && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/80">
                  {eventsPage.pastLabel}
                </span>
              )}
            </div>
            <h1 className="text-display text-[clamp(48px,7.4vw,120px)]">{e.title}</h1>
            <p className="text-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-blue">
              {e.subtitle}
            </p>
            <p className="text-cream/60">{e.topics}</p>
            {e.upcoming && e.ticketUrl && (
              <div className="pt-2">
                <Button href={e.ticketUrl}>{detail.ticket}</Button>
              </div>
            )}
          </Reveal>
          <TiltPoster src={e.image} alt={e.title} />
        </div>
      </section>

      <section className="container-x mt-20 grid gap-12 pb-10 sm:mt-28 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <h2 className="text-display text-[clamp(36px,4.4vw,64px)]">{detail.about}</h2>
          <Body blocks={e.body} />
        </Reveal>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 rounded-[28px] bg-white/[0.04] p-7 ring-1 ring-white/10 sm:p-8 lg:backdrop-blur-xl">
              <p className="text-display text-[28px]">{e.title}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                {info.map((r) => (
                  <div key={r.label} className="flex flex-col gap-1">
                    <dt className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{r.label}</dt>
                    <dd className="text-[17px] font-bold text-cream">{r.value}</dd>
                  </div>
                ))}
              </dl>
              {e.upcoming && e.ticketUrl && <Button href={e.ticketUrl}>{detail.ticket}</Button>}
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="container-x py-24 sm:py-32">
        <h2 className="text-display max-w-[760px] text-[clamp(36px,4.4vw,64px)]">{detail.relatedTitle}</h2>
        {related.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <EventCard key={r.slug} event={r} delay={i * 0.08} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-[640px] text-lg text-cream/60">{detail.relatedEmpty}</p>
        )}
      </section>
    </main>
  );
}
