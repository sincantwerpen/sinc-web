import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/Link";
import { notFound } from "next/navigation";
import { eventSlugs } from "@/content";
import { getT, pageMeta } from "@/content/server";
import { Button, Reveal, ArrowIcon } from "@/components/ui";
import { PillarTag } from "@/components/events/PastEvents";
import { EventCard } from "@/components/events/EventCard";
import { TiltPoster } from "@/components/events/TiltPoster";

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
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

const TIME = /^(\d{1,2}[:hu]\d{2}(?:\s*[–-]\s*±?\d{1,2}[:hu]\d{2})?)\s*[|–-]?\s*(.*)$/;

/** Text with line breaks; lines that start with a time ("18:30 | Welcome") get a blue timestamp. */
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const m = line.match(TIME);
        return (
          <span key={i} className="block">
            {m ? (
              <>
                <span className="mr-3 inline-block min-w-[3.5em] font-bold tabular-nums text-blue">{m[1]}</span>
                {m[2]}
              </>
            ) : (
              line || "\u00A0"
            )}
          </span>
        );
      })}
    </>
  );
}

/** Renders the "Over dit event" text: "## " = subheading, "- " lines = list, other lines kept as-is. */
function Body({ blocks }: { blocks: string[] }) {
  return (
    <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-cream/80 sm:text-lg">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          const [head, ...rest] = block.slice(3).split("\n");
          const items = rest.filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
          const other = rest.filter((l) => !l.startsWith("- "));
          return (
            <div key={i} className="mt-6 flex flex-col gap-4 first:mt-0">
              <h3 className="text-display text-[clamp(26px,3vw,36px)] text-cream">{head}</h3>
              {items.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {items.map((it, j) => (
                    <li key={j} className="rounded-full bg-white/[0.06] px-4 py-2 text-[15px] text-cream/85 ring-1 ring-white/10">
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {other.length > 0 && (
                <p>
                  <Lines text={other.join("\n")} />
                </p>
              )}
            </div>
          );
        }
        return (
          <p key={i}>
            <Lines text={block} />
          </p>
        );
      })}
    </div>
  );
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { slug } = await params;
  const { getEvent, eventsPage, upcomingEvents } = await getT();
  const e = getEvent(slug);
  if (!e) notFound();

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
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <Image src={e.image} alt="" fill sizes="100vw" className="scale-125 object-cover opacity-25 blur-[90px] saturate-150" />
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
            <div className="flex flex-col gap-6 rounded-[28px] bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
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
