"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Eyebrow, Reveal, RevealText } from "./ui";
import { useT } from "./LangProvider";

export function Community() {
  const { community } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The photo opens up from a small window to full width as it scrolls into view: the frame grows while
  // the photo inside shrinks by the same factor, so it looks like a mask opening. Only transforms, so the
  // graphics card does the work (an animated clip-path is redrawn on every frame, which stutters on phones).
  const frame = useTransform(scrollYProgress, [0, 0.45], [0.72, 1]);
  const counter = useTransform(frame, (s) => 1 / s);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="community-title">
      <div className="container-x flex flex-col gap-14 sm:gap-20">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{community.eyebrow}</Eyebrow>
            <RevealText id="community-title" text={community.title} className="text-display text-[min(clamp(40px,5.8vw,88px),8.4vw)]" />
          </div>
          <Reveal className="flex flex-col items-start gap-7" delay={0.15}>
            <p className="text-lg leading-[1.6] text-cream/70">{community.lead}</p>
            <Button href={community.cta.href}>{community.cta.label}</Button>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="container-x mt-14 sm:mt-20">
        <motion.div
          style={{ scale: frame }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[40px] will-change-transform sm:aspect-[16/9]"
        >
          <motion.div style={{ y: imgY, scale: counter }} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
            <Image
              src={community.image}
              alt={community.imageAlt}
              fill
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
