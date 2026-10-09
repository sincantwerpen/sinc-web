import type { Metadata } from "next";
import { getT, pageMeta } from "@/content/server";
import { PageHero } from "@/components/page/PageHero";
import { PhotoColumns } from "@/components/page/PhotoColumns";
import { LinkedInBlock, NetworkCards } from "@/components/page/Sections";
import { Reveal, RevealText } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMeta("/community", "community", t.communityPage.lead);
}

function ComingSoon({ title, text, soon, big = false }: { title: string; text?: string; soon: string; big?: boolean }) {
  return (
    <Reveal className="h-full">
      <div
        className={`relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[32px] p-8 sm:p-12 ${
          big ? "bg-gradient-to-br from-ink-2 to-[#0d1a2e] ring-1 ring-white/10" : "bg-yellow text-ink"
        }`}
      >
        {big && <div aria-hidden className="absolute -right-24 -top-24 size-[400px] glow text-blue/25" />}
        <div className="relative flex flex-col gap-4">
          <h2 className={`text-display ${big ? "text-[clamp(36px,4.6vw,68px)]" : "text-[clamp(28px,3vw,44px)]"}`}>{title}</h2>
          {text && <p className="max-w-[520px] text-lg leading-[1.6] text-cream/70">{text}</p>}
        </div>
        <span
          className={`relative inline-flex w-fit items-center gap-3 rounded-full px-5 py-3 text-[15px] font-bold ${
            big ? "bg-white/8 text-cream ring-1 ring-white/15" : "bg-ink text-cream"
          }`}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-blue opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-blue" />
          </span>
          {soon}
        </span>
      </div>
    </Reveal>
  );
}

/** Studying and starting a business in Antwerp (kept from the former Ecosysteem page). */
async function Antwerp() {
  const { communityPage } = await getT();
  const { antwerp } = communityPage;
  return (
    <section className="py-24 sm:py-32" aria-labelledby="antwerp-title">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <RevealText id="antwerp-title" text={antwerp.title} className="text-display text-[clamp(36px,4.8vw,72px)]" />
        <Reveal delay={0.1}>
          <p className="text-lg leading-[1.7] text-cream/75">{antwerp.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default async function CommunityPage() {
  const { communityPage } = await getT();
  const { spotlight, featureMe } = communityPage;
  return (
    <main>
      <PageHero
        eyebrow={communityPage.eyebrow}
        title={communityPage.title}
        lead={communityPage.lead}
        ctas={[communityPage.cta]}
        visual={<PhotoColumns photos={communityPage.heroPhotos} />}
      />
      <NetworkCards />
      <Antwerp />
      <LinkedInBlock />
      {/* "Student-ondernemers" cards link here */}
      <section id="student-ondernemers" className="scroll-mt-28 py-24 sm:py-32">
        <div className="container-x grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <ComingSoon big title={spotlight.title} text={spotlight.text} soon={spotlight.soon} />
          <ComingSoon title={featureMe.title} soon={featureMe.soon} />
        </div>
      </section>
    </main>
  );
}
