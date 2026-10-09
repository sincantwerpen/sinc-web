"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Button, Eyebrow, Reveal, RevealText, ArrowIcon } from "./ui";
import { useLang, useT } from "./LangProvider";
import { localize } from "@/i18n";

const themes = [
  { card: "bg-blue text-white", num: "text-white/25", body: "text-white/85", tag: "bg-white/15 text-white" },
  { card: "bg-cream text-ink", num: "text-ink/12", body: "text-ink/70", tag: "bg-ink/8 text-ink" },
  { card: "bg-ink-2 text-cream ring-1 ring-white/10", num: "text-blue/40", body: "text-cream/70", tag: "bg-blue/15 text-blue" },
  { card: "bg-yellow text-ink", num: "text-ink/15", body: "text-ink/75", tag: "bg-ink/10 text-ink" },
];

// Where the faces are in each photo, so the wide crop on phones doesn't cut off heads.
const focus: Record<string, string> = {
  "/images/pillars/inspireren.webp": "45% 22%",
  "/images/pillars/informeren.webp": "50% 18%",
  "/images/pillars/connecteren.webp": "55% 15%",
  "/images/pillars/activeren.webp": "50% 40%",
};

type Pillar = {
  n: string;
  title: string;
  text: string;
  image: string;
  cta?: { label: string; href: string };
};

function PillarCard({
  p,
  i,
  total,
  progress,
}: {
  p: Pillar;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { about } = useT();
  const lang = useLang();
  const t = themes[i];
  // Each card shrinks a little as the next one slides over it.
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.045]);
  const imgScale = useTransform(progress, [i / total, (i + 1) / total], [1.15, 1]);

  return (
    <div
      className="sticky top-[calc(84px+var(--i)*14px)] h-[78svh] min-h-[520px] md:top-[calc(96px+var(--i)*26px)]"
      style={{ "--i": i } as React.CSSProperties}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className={`grid grid-rows-[auto_auto] overflow-hidden rounded-[28px] sm:rounded-[32px] md:h-[min(66svh,600px)] md:min-h-[480px] md:grid-cols-[1.1fr_1fr] md:grid-rows-1 ${t.card}`}
      >
        <div className="relative flex min-h-[300px] flex-col justify-between gap-5 p-6 sm:gap-6 sm:p-10 md:min-h-0 lg:p-14">
          <div className="relative flex flex-col gap-3 sm:gap-4">
            <h3 className="text-display text-[clamp(40px,6vw,88px)]">{p.title}</h3>
            <p className={`max-w-[440px] text-[16px] leading-[1.55] sm:text-lg sm:leading-[1.6] ${t.body}`}>{p.text}</p>
            {p.cta && (
              <a
                href={localize(p.cta.href, lang)}
                target={p.cta.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group mt-1 inline-flex w-fit items-center gap-2 py-2 font-bold underline decoration-2 underline-offset-[6px] transition-[text-underline-offset] hover:underline-offset-[9px]"
              >
                {p.cta.label}
                <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-1"><ArrowIcon /></span>
              </a>
            )}
          </div>
          <span
            aria-hidden
            className={`text-display pointer-events-none absolute -bottom-6 right-4 text-[clamp(140px,22vw,300px)] ${t.num}`}
          >
            {p.n}
          </span>
          <span className={`relative w-fit rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] ${t.tag}`}>
            {about.pillarLabel} {p.n}
          </span>
        </div>
        <div className="relative h-[clamp(170px,26svh,240px)] overflow-hidden md:m-3 md:h-auto md:rounded-[24px]">
          <motion.div style={{ scale: imgScale, transformOrigin: "50% 20%" }} className="absolute inset-0">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: focus[p.image] ?? "50% 30%" }}
            />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

/** The four pillar cards that stack on top of each other while you scroll. */
export function PillarStack({ pillars }: { pillars: Pillar[] }) {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });
  return (
    <div ref={stack} className="relative">
      {pillars.map((p, i) => (
        <PillarCard key={p.n} p={p} i={i} total={pillars.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

export function Pillars() {
  const { about } = useT();
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <div className="mb-16 grid gap-10 sm:mb-24 lg:grid-cols-[1.7fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <RevealText
              id="about-title"
              text={about.title}
              className="text-display max-w-[900px] text-[clamp(40px,5.8vw,88px)]"
            />
          </div>
          <Reveal className="flex flex-col items-start gap-7" delay={0.15}>
            <p className="text-lg leading-[1.6] text-cream/70">{about.lead}</p>
            <Button href={about.cta.href} variant="light">
              {about.cta.label}
            </Button>
          </Reveal>
        </div>

        <PillarStack pillars={about.pillars} />
      </div>
    </section>
  );
}
