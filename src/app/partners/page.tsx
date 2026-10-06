import type { Metadata } from "next";
import Image from "next/image";
import { partnersPage, type Partner } from "@/content/pages";
import { PageHero } from "@/components/page/PageHero";
import { PhotoFan } from "@/components/page/PhotoFan";
import { CtaBand } from "@/components/page/Sections";
import { SpotlightCard } from "@/components/page/SpotlightCard";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partners | SINC Antwerpen",
  description: partnersPage.lead,
};

function Logo({ p, tall = false }: { p: Partner; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[20px] px-8 ${tall ? "h-40" : "h-28"} ${
        p.lightTile ? "bg-cream" : "bg-white/[0.04] ring-1 ring-white/8"
      }`}
    >
      <Image src={p.logo} alt={p.name} width={260} height={100} className="max-h-14 w-auto object-contain" />
    </div>
  );
}

function PartnerLinks({ p }: { p: Partner }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
            i === 0 ? "bg-cream text-ink hover:bg-white" : "text-cream ring-1 ring-white/20 hover:bg-blue hover:ring-blue"
          }`}
        >
          {l.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}

export default function PartnersPage() {
  const [moore, ...mainRest] = partnersPage.main;
  return (
    <main>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.title}
        lead={partnersPage.lead}
        ctas={[partnersPage.cta]}
        visual={<PhotoFan photos={partnersPage.heroPhotos} />}
      />

      <section className="py-20 sm:py-28" aria-label="Hoofdpartners">
        <div className="container-x flex flex-col gap-5">
          <Reveal>
            <SpotlightCard>
              <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
                <div className="flex flex-col gap-6">
                  <Logo p={moore} tall />
                  <h2 className="text-display text-[clamp(40px,5vw,72px)]">{moore.name}</h2>
                  <PartnerLinks p={moore} />
                </div>
                <p className="text-[17px] leading-[1.75] text-cream/75">{moore.text}</p>
              </div>
            </SpotlightCard>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {mainRest.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <SpotlightCard>
                  <div className="flex flex-col gap-6 p-7 sm:p-8">
                    <Logo p={p} tall />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h2 className="text-display text-[32px]">{p.name}</h2>
                      <PartnerLinks p={p} />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-label="Partners">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {partnersPage.featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-6 p-7 sm:p-8">
                  <Logo p={p} />
                  <h2 className="text-display text-[32px]">{p.name}</h2>
                  <p className="flex-1 leading-[1.7] text-cream/75">{p.text}</p>
                  <PartnerLinks p={p} />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-label="Meer partners">
        <div className="container-x flex flex-col gap-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {partnersPage.others.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={(i % 4) * 0.06}>
                  <a
                    href={p.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-[24px] bg-white/[0.04] p-6 ring-1 ring-white/8 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-blue/15 hover:ring-blue"
                  >
                    <Image src={p.logo} alt="" width={200} height={80} className="max-h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                    <span className="flex items-center gap-1.5 text-[14px] font-bold text-cream/60 transition-colors group-hover:text-white">
                      {p.name}
                      <span aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={partnersPage.band.title} cta={partnersPage.band.cta} />
    </main>
  );
}
