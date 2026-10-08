import type { Metadata } from "next";
import Image from "next/image";
import { overSinc } from "@/content/pages";
import { PageHero } from "@/components/page/PageHero";
import { PhotoFan } from "@/components/page/PhotoFan";
import { LinkedInBlock, NetworkCards } from "@/components/page/Sections";
import { Stats } from "@/components/page/Stats";
import { PillarStack } from "@/components/Pillars";
import { Button, Reveal, RevealText } from "@/components/ui";

export const metadata: Metadata = {
  title: "Over SINC | SINC Antwerpen",
  description: overSinc.lead,
};

export default function OverSincPage() {
  const { team } = overSinc;
  return (
    <main>
      <PageHero
        eyebrow={overSinc.eyebrow}
        title={overSinc.title}
        lead={overSinc.lead}
        ctas={[overSinc.cta]}
        visual={<PhotoFan photos={overSinc.heroPhotos} />}
      />

      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-white/10">
              <Image src={team.image} alt="Het SINC team 2026–2027" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div
              aria-hidden
              className="text-display absolute -bottom-8 -right-4 flex size-36 items-center justify-center rounded-full bg-blue text-[64px] text-white shadow-[0_20px_60px_-10px_rgba(0,150,255,0.8)] sm:-right-8 sm:size-44 sm:text-[80px]"
            >
              19
            </div>
          </Reveal>
          <div className="flex flex-col items-start gap-7">
            <RevealText text={team.title} className="text-display text-[clamp(36px,4.8vw,72px)]" />
            <Reveal delay={0.1} className="flex flex-col items-start gap-7">
              <p className="max-w-[520px] text-lg leading-[1.6] text-cream/70">{team.text}</p>
              <Button href={team.cta.href} variant="light">
                {team.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <Stats title={overSinc.statsTitle} stats={overSinc.stats} />

      <section className="pb-16 pt-8 sm:pb-24">
        <div className="container-x">
          <PillarStack pillars={overSinc.pillars} />
        </div>
      </section>

      <NetworkCards />
      <LinkedInBlock />
    </main>
  );
}
