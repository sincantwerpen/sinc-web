"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useT } from "../LangProvider";
import { DESKTOP, useMedia } from "../useMedia";
import { Eyebrow } from "../ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One tilted row of faces sliding endlessly (pure CSS). */
function FaceRow({ reverse = false, offset = 0 }: { reverse?: boolean; offset?: number }) {
  const { allMembers } = useT();
  const people = allMembers.filter((m) => m.photo);
  const row = [...people.slice(offset), ...people.slice(0, offset)];
  return (
    <div className="flex">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 gap-4 pr-4 [--marquee-duration:70s] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        >
          {row.map((m) => (
            <div key={m.name} className="relative aspect-[3/4] w-36 overflow-hidden rounded-[20px] bg-ink-2 sm:w-48">
              <Image src={m.photo!} alt="" fill sizes="192px" loading="eager" className="object-cover object-[50%_25%]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TeamHero() {
  const { allMembers, departments, teamPage } = useT();
  const { scrollY } = useScroll();
  const wallY = useTransform(scrollY, [0, 700], [0, 160]);
  const titleScale = useTransform(scrollY, [0, 600], [1, 0.9]);
  // On phones the wall and title stay still: moving them with the scroll costs too much there.
  const desktop = useMedia(DESKTOP);
  const total = allMembers.length;

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* wall of faces behind the title */}
      <motion.div
        aria-hidden
        style={desktop ? { y: wallY } : undefined}
        className="absolute inset-x-0 top-24 -z-20 flex -rotate-6 flex-col gap-4 opacity-45 sm:top-16 lg:will-change-transform"
      >
        <FaceRow />
        <FaceRow reverse offset={7} />
        <div className="max-sm:hidden">
          <FaceRow offset={13} />
        </div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(11,14,20,0.92),rgba(11,14,20,0.55)_60%,rgba(11,14,20,0.2))]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent via-ink/80 to-ink" />
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 size-[70vw] max-w-[900px] -translate-x-1/2 glow text-blue/30" />

      <div className="container-x flex flex-col items-center gap-8 text-center">
        <Eyebrow>{teamPage.eyebrow}</Eyebrow>
        <motion.h1
          style={desktop ? { scale: titleScale } : undefined}
          className="text-display text-[clamp(84px,17vw,260px)] leading-[0.85]"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        >
          {teamPage.title}
        </motion.h1>
        <motion.p
          className="max-w-[560px] text-lg leading-[1.6] text-cream/75"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        >
          {teamPage.lead}
        </motion.p>

        <motion.nav
          aria-label={teamPage.departmentsLabel}
          className="mt-2 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          {departments.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink-2/80 py-2 pl-5 pr-2 text-[15px] font-bold text-cream ring-1 ring-white/15 transition-all duration-300 hover:bg-blue hover:ring-blue"
            >
              {d.name}
              <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[13px] tabular-nums transition-colors group-hover:bg-white group-hover:text-blue">
                {d.members.length}
              </span>
            </a>
          ))}
          <span className="inline-flex items-center rounded-full bg-yellow px-5 py-2 text-[15px] font-bold text-ink">
            {total} {teamPage.students}
          </span>
        </motion.nav>
      </div>
    </section>
  );
}
