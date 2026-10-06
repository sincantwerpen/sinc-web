import type { Metadata } from "next";
import Image from "next/image";
import { ecoPage } from "@/content/pages";
import { PageHero } from "@/components/page/PageHero";
import { PhotoColumns } from "@/components/page/PhotoColumns";
import { SpotlightCard } from "@/components/page/SpotlightCard";
import { Reveal, RevealText } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ecosysteem | SINC Antwerpen",
  description: ecoPage.lead,
};

export default function EcosysteemPage() {
  const { intro } = ecoPage;
  return (
    <main>
      <PageHero
        eyebrow={ecoPage.eyebrow}
        title={ecoPage.title}
        lead={ecoPage.lead}
        visual={<PhotoColumns photos={ecoPage.heroPhotos} />}
      />

      <section className="py-24 sm:py-32" aria-labelledby="eco-title">
        <div className="container-x flex flex-col gap-14 sm:gap-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
            <RevealText id="eco-title" text={intro.title} className="text-display text-[clamp(38px,5vw,76px)]" />
            <Reveal delay={0.1}>
              <p className="text-lg leading-[1.7] text-cream/75">
                {intro.text}{" "}
                <a
                  href={intro.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue underline decoration-2 underline-offset-4 hover:text-white"
                >
                  {intro.link.label}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ecoPage.orgs.map((o, i) => (
              <li key={o.name}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <SpotlightCard className="h-full">
                    <div className="flex h-full flex-col gap-6 p-7">
                      <div className="flex items-center gap-4">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
                          <Image src={o.image} alt={o.person} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-display text-[26px] leading-[1.05]">{o.name}</h3>
                          <p className="text-[15px] text-cream/55">{o.person}</p>
                        </div>
                      </div>
                      <p className="flex-1 leading-[1.6] text-cream/75">{o.text}</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={o.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[14px] font-bold text-ink transition-colors hover:bg-white"
                        >
                          {ecoPage.websiteLabel} <span aria-hidden>↗</span>
                        </a>
                        <a
                          href={`mailto:${o.email}`}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-cream ring-1 ring-white/20 transition-colors hover:bg-blue hover:ring-blue"
                          aria-label={`${ecoPage.contactLabel}: ${o.email}`}
                        >
                          {ecoPage.contactLabel} <span aria-hidden>→</span>
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
