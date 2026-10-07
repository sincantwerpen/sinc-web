"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/content/site";
import { Button } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Shrink once you leave the top; slide away while scrolling down, come back when scrolling up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 500 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <nav
          aria-label="Hoofdmenu"
          className={`flex w-full max-w-[1320px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-all duration-500 ease-out-expo ${
            scrolled
              ? "h-16 border-white/10 bg-ink/70 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "h-20 border-transparent bg-transparent"
          }`}
        >
          <Link href="/" aria-label="SINC home" className="shrink-0">
            <Image
              src="/images/brand/sinc-logo-blue.webp"
              alt="SINC"
              width={466}
              height={196}
              priority
              className={`w-auto transition-all duration-500 ease-out-expo ${scrolled ? "h-9" : "h-11"}`}
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative block rounded-full px-4 py-2 text-[15px] font-bold text-cream/80 transition-colors hover:text-white"
                >
                  <span className="absolute inset-0 scale-75 rounded-full bg-white/8 opacity-0 transition-all duration-300 ease-out-expo group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={nav.cta.href} className="h-12! px-6!">
                {nav.cta.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Sluit menu" : "Open menu"}
              className="relative flex size-12 items-center justify-center rounded-full bg-white/8 lg:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 rounded bg-cream transition-transform duration-500 ease-out-expo ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded bg-cream transition-transform duration-500 ease-out-expo ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end overflow-hidden bg-ink px-6 pb-10 pt-32 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div aria-hidden className="absolute -right-32 -top-32 size-[420px] glow text-blue/40" />
            <ul className="relative flex flex-col gap-1">
              {[...nav.links, nav.cta].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="text-display block py-1 text-[clamp(40px,11vw,72px)] text-cream transition-colors active:text-blue"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
