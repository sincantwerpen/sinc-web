import Image from "next/image";
import type { SincEvent } from "@/content";
import { getLang, getT } from "@/content/server";
import { intlLocale, localize } from "@/i18n";
import { googleCalendarUrl } from "@/lib/calendar";
import { dashLang } from "@/lib/dashboard/live";
import { Link } from "@/components/Link";
import { ArrowIcon, Reveal } from "@/components/ui";
import { PillarTag } from "./PastEvents";
import { EventCard } from "./EventCard";
import { TiltPoster } from "./TiltPoster";
import { Body } from "./EventBody";
import { RegistrationCard } from "./RegistrationCard";

const SITE = "https://www.sincantwerpen.be";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

/**
 * Event page like Luma (plan section 5), for events from the SINC dashboard: square poster on the
 * left, then title, "Hosted by SINC", the date block, the location with a map link, and the
 * registration card with the ticket types and one big "Inschrijven" button (the panel opens on
 * this page). The "Over dit event" text follows under it.
 */
export async function LumaEvent({ event: e }: { event: SincEvent }) {
  const d = e.dashboard!;
  const lang = await getLang();
  const t = await getT();
  const { registration: r, eventsPage, upcomingEvents } = t;
  const day = new Date(`${d.date}T12:00:00Z`);
  const month = day.toLocaleDateString(intlLocale[lang], { month: "short", timeZone: "Europe/Brussels" }).replace(".", "").toUpperCase();
  const weekday = day.toLocaleDateString(intlLocale[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Brussels" });
  const notice = d.items[dashLang(lang)]?.notice ?? d.items.NL?.notice;
  const related = upcomingEvents.filter((u) => u.slug !== e.slug).slice(0, 3);
  const url = SITE + localize(`/events/${e.slug}`, lang);
  const calendar = d.startsAt
    ? {
        google: googleCalendarUrl({ id: e.slug, title: `${e.title} · SINC Antwerpen`, startsAt: d.startsAt, endsAt: d.endsAt, location: d.location, url, details: e.excerpt }),
        ics: `/api/events/${e.slug}/ics?lang=${lang}`,
      }
    : null;

  return (
    <main className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[900px] transform-gpu overflow-hidden">
        <Image src={e.image} alt="" fill sizes="96px" className="scale-125 object-cover opacity-25 blur-[90px] saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
      </div>

      <section className="container-x pt-28 sm:pt-36">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[14px] font-bold text-cream/80 transition-colors hover:border-white/40 hover:text-white"
        >
          <span className="flex transition-transform duration-500 ease-out-expo group-hover:-translate-x-1"><ArrowIcon dir="left" /></span>
          {eventsPage.detail.back}
        </Link>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
          {/* Left: poster and host */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="mx-auto w-full max-w-[440px]">
              <TiltPoster src={e.image} alt={e.title} />
            </div>
            <div className="hidden flex-col gap-3 border-t border-white/10 pt-5 lg:flex">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-cream/50">{r.hostedBy}</p>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
                  <Image src="/images/brand/sinc-logo-blue.webp" alt="" width={32} height={32} className="object-contain" />
                </span>
                <span className="font-bold">{r.host}</span>
              </div>
            </div>
          </div>

          {/* Right: what, when, where, registration, about */}
          <div className="flex min-w-0 flex-col gap-7">
            <Reveal className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <PillarTag pillar={e.pillar} />
                {!e.upcoming && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/80">
                    {d.cancelled ? r.cancelled : eventsPage.pastLabel}
                  </span>
                )}
              </div>
              <h1 className="text-display text-[clamp(44px,6.4vw,96px)] [overflow-wrap:anywhere]">{e.title}</h1>
              {e.subtitle && (
                <p className="text-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-blue">{e.subtitle}</p>
              )}
              <p className="flex items-center gap-2 text-[15px] text-cream/60 lg:hidden">
                {r.hostedBy} <span className="font-bold text-cream">{r.host}</span>
              </p>
            </Reveal>

            <Reveal delay={0.05} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 flex-col overflow-hidden rounded-2xl text-center ring-1 ring-white/15">
                  <span className="bg-white/10 py-0.5 text-[10px] font-bold tracking-[0.1em] text-cream/70">{month}</span>
                  <span className="flex flex-1 items-center justify-center text-[22px] font-bold leading-none">{day.getUTCDate()}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold first-letter:uppercase">{weekday}</p>
                  <p className="text-cream/60">{e.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-cream/70 ring-1 ring-white/15">
                  <PinIcon />
                </div>
                <div className="min-w-0">
                  <p className="font-bold [overflow-wrap:anywhere]">{d.location}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-blue hover:underline"
                  >
                    {r.map} <ArrowIcon dir="up-right" className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {notice && <p className="rounded-2xl bg-yellow/10 px-5 py-4 text-[15px] font-bold text-yellow ring-1 ring-yellow/30">{notice}</p>}

            <Reveal delay={0.1}>
              <RegistrationCard event={d} title={e.title} calendar={calendar} />
            </Reveal>

            {e.body.length > 0 && (
              <section className="flex flex-col gap-6 border-t border-white/10 pt-8">
                <h2 className="text-display text-[clamp(30px,3.4vw,48px)]">{eventsPage.detail.about}</h2>
                <Body blocks={e.body} />
              </section>
            )}
          </div>
        </div>
      </section>

      <section className="container-x py-24 sm:py-32">
        <h2 className="text-display max-w-[760px] text-[clamp(36px,4.4vw,64px)]">{eventsPage.detail.relatedTitle}</h2>
        {related.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <EventCard key={rel.slug} event={rel} delay={i * 0.08} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-[640px] text-lg text-cream/60">{eventsPage.detail.relatedEmpty}</p>
        )}
      </section>
    </main>
  );
}
