import type { Metadata } from "next";
import type { Partner } from "@/content";
import { getT, pageMeta } from "@/content/server";
import { PageHero } from "@/components/page/PageHero";
import { PhotoFan } from "@/components/page/PhotoFan";
import { CtaBand } from "@/components/page/Sections";
import { SpotlightCard } from "@/components/page/SpotlightCard";
import { Eyebrow, Reveal, ArrowIcon } from "@/components/ui";
import { PartnerLogo } from "@/components/PartnerLogo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMeta("/partners", "partners", t.partnersPage.lead);
}

/** Logo on its own tile; all tiles of one group have the same height so the cards line up. */
function Logo({ p, tall = false }: { p: Partner; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[20px] px-6 ${tall ? "h-44" : "h-32"} ${
        p.lightTile ? "bg-cream" : "bg-white/[0.04] ring-1 ring-white/8"
      }`}
    >
      <PartnerLogo src={p.logo} alt={p.name} area={tall ? 13000 : 9000} maxWidth={tall ? 280 : 230} maxHeight={tall ? 110 : 80} />
    </div>
  );
}

/** Small heading above each group of partners. */
function TierHead({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <Reveal className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-display text-[min(clamp(30px,3.6vw,52px),9vw)]">{title}</h2>
    </Reveal>
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
          {l.label} <ArrowIcon dir="up-right" className="size-4" />
        </a>
      ))}
    </div>
  );
}

export default async function PartnersPage() {
  const { partnersPage } = await getT();
  const [moore, ...mainRest] = partnersPage.main;
  const { tiers } = partnersPage;
  return (
    <main>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.title}
        lead={partnersPage.lead}
        ctas={[partnersPage.cta]}
        visual={<PhotoFan photos={partnersPage.heroPhotos} />}
      />

      {/* Main partners: Moore with its story, then De Cronos Groep and Stad Antwerpen */}
      <section className="pb-12 pt-20 sm:pt-28" aria-labelledby="tier-main">
        <div className="container-x flex flex-col gap-8">
          <TierHead id="tier-main" eyebrow={tiers.main.eyebrow} title={tiers.main.title} />
          <Reveal>
            <SpotlightCard>
              <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
                <div className="flex flex-col gap-6">
                  <Logo p={moore} tall />
                  <h3 className="sr-only">{moore.name}</h3>
                  <PartnerLinks p={moore} />
                </div>
                <p className="text-[17px] leading-[1.75] text-cream/75">{moore.text}</p>
              </div>
            </SpotlightCard>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {mainRest.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col gap-6 p-7 sm:p-8">
                    <Logo p={p} tall />
                    <h3 className="sr-only">{p.name}</h3>
                    <PartnerLinks p={p} />
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners with a description: equal columns, buttons lined up at the bottom */}
      <section className="py-12" aria-labelledby="tier-featured">
        <div className="container-x flex flex-col gap-8">
          <TierHead id="tier-featured" eyebrow={tiers.featured.eyebrow} title={tiers.featured.title} />
          <div className="grid gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2 lg:grid-cols-3 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {partnersPage.featured.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col gap-6 p-7 sm:p-8">
                    <Logo p={p} />
                    <h3 className="sr-only">{p.name}</h3>
                    <p className="flex-1 whitespace-pre-line leading-[1.7] text-cream/75">{p.text}</p>
                    <PartnerLinks p={p} />
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logo wall: equal tiles, the last row centred instead of leaving a gap */}
      <section className="pb-20 pt-12 sm:pb-28" aria-labelledby="tier-others">
        <div className="container-x flex flex-col gap-8">
          <TierHead id="tier-others" eyebrow={tiers.others.eyebrow} title={tiers.others.title} />
          <ul className="flex flex-wrap justify-center gap-3">
            {partnersPage.others.map((p, i) => (
              <li key={p.name} className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]">
                <Reveal delay={(i % 4) * 0.06}>
                  <a
                    href={p.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={p.name}
                    className="group flex h-36 items-center justify-center rounded-[24px] bg-white/[0.04] px-5 ring-1 ring-white/8 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-blue/15 hover:ring-blue sm:h-40"
                  >
                    <PartnerLogo
                      src={p.logo}
                      alt={p.name}
                      area={8000}
                      maxWidth={210}
                      maxHeight={84}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
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
