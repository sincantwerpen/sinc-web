import Image from "next/image";
import Link from "next/link";
import { footer, partners } from "@/content/site";
import { Newsletter } from "./Newsletter";
import { Button, Reveal } from "./ui";
import { HideOn } from "./HideOn";

function PartnerRow({ reverse = false }: { reverse?: boolean }) {
  const logos = reverse ? [...partners.logos].reverse() : partners.logos;
  return (
    <div className="group relative flex overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-ink to-transparent" />
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 gap-3 pr-3 [--marquee-duration:45s] group-hover:[animation-play-state:paused] ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {logos.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={copy === 1 ? -1 : undefined}
                className="flex h-28 w-52 items-center justify-center rounded-3xl bg-white/[0.04] px-8 ring-1 ring-white/8 transition-all duration-300 hover:-translate-y-1 hover:bg-blue/15 hover:ring-blue sm:w-60"
              >
                <Image src={l.src} alt={l.name} width={200} height={80} loading="eager" className="max-h-12 w-auto object-contain" />
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative pb-10 pt-10">
      <div className="container-x flex flex-col gap-24 sm:gap-32">
        <Reveal>
          <Newsletter />
        </Reveal>

        {/* the partners teaser is pointless on the partners page itself */}
        <HideOn path="/partners">
        <section className="flex flex-col gap-12" aria-labelledby="partners-title">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="flex max-w-[620px] flex-col gap-4">
              <h2 id="partners-title" className="text-display text-[clamp(40px,5.4vw,80px)]">
                {partners.title}
              </h2>
              <p className="text-lg leading-[1.6] text-cream/70">{partners.text}</p>
            </div>
            <Button href={partners.cta.href} variant="ghost">
              {partners.cta.label}
            </Button>
          </div>
        </section>
        </HideOn>
      </div>

      <HideOn path="/partners">
        <div className="mt-12 flex flex-col gap-3">
          <PartnerRow />
          <PartnerRow reverse />
        </div>
      </HideOn>

      <div className="container-x mt-24 sm:mt-32">
        <div className="grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="SINC home">
              <Image src="/images/brand/sinc-logo-header.webp" alt="SINC Logo" width={556} height={237} className="h-12 w-auto" />
            </Link>
            <p className="max-w-[320px] leading-[1.6] text-cream/60">{footer.about}</p>
          </div>

          <nav aria-label="Footer menu" className="flex flex-col gap-1 lg:gap-3">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{footer.menuTitle}</p>
            {footer.menu.map((m) => (
              <Link key={m.href} href={m.href} className="w-fit py-2 text-cream/80 transition-colors hover:text-blue lg:py-0">
                {m.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1 text-cream/80 lg:gap-3">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{footer.orgTitle}</p>
            <Link href={footer.privacy.href} className="w-fit py-2 transition-colors hover:text-blue lg:py-0">
              {footer.privacy.label}
            </Link>
            <p>{footer.address}</p>
            <p>{footer.vat}</p>
            <a href={`mailto:${footer.email}`} className="w-fit py-2 transition-colors hover:text-blue lg:py-0">
              {footer.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{footer.socialsTitle}</p>
            <div className="flex flex-wrap gap-2">
              {footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 px-4 py-2.5 text-[14px] lg:py-2 font-bold text-cream/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:bg-blue hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 text-[13px] text-cream/40">
          Copyright © {year} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
