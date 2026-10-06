import type { Metadata } from "next";
import { communityPage } from "@/content/pages";
import { PageHero } from "@/components/page/PageHero";
import { PhotoColumns } from "@/components/page/PhotoColumns";
import { LinkedInBlock, NetworkCards } from "@/components/page/Sections";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community | SINC Antwerpen",
  description: communityPage.lead,
};

function ComingSoon({ title, text, soon, big = false }: { title: string; text?: string; soon: string; big?: boolean }) {
  return (
    <Reveal className="h-full">
      <div
        className={`relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[32px] p-8 sm:p-12 ${
          big ? "bg-gradient-to-br from-ink-2 to-[#0d1a2e] ring-1 ring-white/10" : "bg-yellow text-ink"
        }`}
      >
        {big && <div aria-hidden className="absolute -right-24 -top-24 size-[400px] rounded-full bg-blue/25 blur-[110px]" />}
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

export default function CommunityPage() {
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
      <LinkedInBlock />
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <ComingSoon big title={spotlight.title} text={spotlight.text} soon={spotlight.soon} />
          <ComingSoon title={featureMe.title} soon={featureMe.soon} />
        </div>
      </section>
    </main>
  );
}
