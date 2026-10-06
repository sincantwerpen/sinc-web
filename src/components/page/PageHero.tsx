import type { ReactNode } from "react";
import { Button, Eyebrow, Reveal, RevealText } from "../ui";

type Cta = { label: string; href: string };

/** Hero used on the inner pages: copy on the left, a photo visual on the right. */
export function PageHero({
  eyebrow,
  title,
  lead,
  ctas = [],
  visual,
}: {
  eyebrow: string;
  title: string | string[];
  lead: string;
  ctas?: Cta[];
  visual?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[20%] size-[60vw] max-w-[900px] rounded-full bg-blue/25 blur-[150px]" />
        <div className="absolute -left-[10%] top-[50%] size-[35vw] rounded-full bg-blue-deep/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="flex flex-col items-start gap-7">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-display text-[clamp(34px,5vw,80px)]" aria-label={lines.join(" ")}>
            {lines.map((l, i) => (
              <RevealText key={i} as="span" text={l} className={`block ${i > 0 && i === lines.length - 1 ? "text-blue" : ""}`} />
            ))}
          </h1>
          <Reveal delay={0.2}>
            <p className="max-w-[580px] text-[17px] leading-[1.6] text-cream/70 sm:text-lg">{lead}</p>
          </Reveal>
          {ctas.length > 0 && (
            <Reveal delay={0.3} className="flex flex-wrap gap-3">
              {ctas.map((c, i) => (
                <Button key={c.href} href={c.href} variant={i === 0 ? "primary" : "ghost"}>
                  {c.label}
                </Button>
              ))}
            </Reveal>
          )}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </div>
    </section>
  );
}
