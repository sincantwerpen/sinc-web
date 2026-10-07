import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { linkedinCommunity, network } from "@/content/pages";
import { Button, Eyebrow, Reveal, RevealText } from "../ui";

/** Section title row: eyebrow + big title on the left, optional text/button on the right. */
export function SectionHead({
  eyebrow,
  title,
  id,
  aside,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-end">
      <div className="flex flex-col gap-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <RevealText id={id} text={title} className="text-display max-w-[980px] text-[clamp(32px,5.4vw,84px)]" />
      </div>
      {aside && (
        <Reveal className="flex flex-col items-start gap-7" delay={0.15}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/** Three image cards: student-ondernemers, ecosysteem, partners. */
export function NetworkCards() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="network-title">
      <div className="container-x flex flex-col gap-12 sm:gap-16">
        <SectionHead
          id="network-title"
          title={network.title}
          aside={<p className="text-display text-[clamp(24px,2.4vw,34px)] text-blue">{network.lead}</p>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {network.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link
                href={c.cta.href}
                className="group relative flex h-[460px] flex-col justify-end overflow-hidden rounded-[28px] ring-1 ring-white/10 sm:h-[520px]"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-blue/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-3 p-7">
                  <h3 className="text-display text-[34px]">{c.title}</h3>
                  <p className="max-h-0 overflow-hidden leading-[1.55] text-cream/80 opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-40 group-hover:opacity-100 max-md:max-h-40 max-md:opacity-100">
                    {c.text}
                  </p>
                  <span className="mt-1 flex items-center gap-3 font-bold">
                    <span className="flex size-11 items-center justify-center rounded-full bg-white text-ink transition-all duration-500 ease-out-expo group-hover:-rotate-45 group-hover:bg-blue group-hover:text-white">
                      →
                    </span>
                    {c.cta.label}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** LinkedIn community call-out with a bento of community photos. */
export function LinkedInBlock() {
  const g = linkedinCommunity.gallery;
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-[13px] font-bold text-white">
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </span>
          <RevealText text={linkedinCommunity.title} className="text-display text-[clamp(34px,4.4vw,64px)]" />
          <Reveal delay={0.1} className="flex flex-col items-start gap-7">
            <p className="max-w-[520px] text-lg leading-[1.6] text-cream/70">{linkedinCommunity.text}</p>
            <Button href={linkedinCommunity.cta.href}>{linkedinCommunity.cta.label}</Button>
          </Reveal>
        </div>
        <div className="grid h-[520px] grid-cols-2 grid-rows-2 gap-3 sm:h-[600px] sm:gap-4">
          {g.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 0.08}
              className="relative overflow-hidden rounded-[24px] ring-1 ring-white/10"
            >
              <Image
                src={src}
                alt="SINC community"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full-width blue call-to-action band. */
export function CtaBand({ title, cta }: { title: string; cta: { label: string; href: string } }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-blue p-8 text-white sm:p-14 md:flex-row md:items-end">
            <div aria-hidden className="absolute -right-20 -top-24 size-[380px] glow text-white/15" />
            <h2 className="text-display relative max-w-[760px] text-[clamp(34px,4.6vw,68px)]">{title}</h2>
            <Button href={cta.href} variant="dark" className="relative shrink-0">
              {cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
