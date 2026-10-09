"use client";

import Image from "next/image";
import { Link } from "./Link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "./ui";
import { useLang, useT } from "./LangProvider";
import { LangSwitch } from "./LangSwitch";
import { localize, visiblePath } from "@/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Current page check; event detail pages count as "Events". */
const isActive = (path: string, href: string) =>
  href === "/" || href === "/en" ? path === href : path === href || path.startsWith(`${href}/`);

export function Nav() {
  const { nav } = useT();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const path = visiblePath(usePathname());
  // Compare against the links as they appear in this language ("/en/events" in English).
  const here = (href: string) => isActive(path, localize(href, lang));

  // Shrink once you leave the top; slide away while scrolling down, come back when scrolling up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 500 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    // Close with Escape, and when the screen becomes wide enough for the normal menu (e.g. a tablet
    // turned sideways): otherwise the page would stay locked behind a menu that is no longer shown.
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
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
          aria-label={nav.menuLabel}
          className={`flex w-full max-w-[1320px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-all duration-500 ease-out-expo ${
            scrolled
              ? "h-16 border-white/10 bg-ink/70 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "h-20 border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            aria-label={nav.homeLabel}
            draggable={false}
            className="shrink-0 cursor-pointer select-none transition-transform duration-300 ease-out-expo hover:scale-105 active:scale-95"
          >
            <Image
              draggable={false}
              src="/images/brand/sinc-logo-blue.webp"
              alt="SINC"
              width={466}
              height={196}
              priority
              className={`w-auto transition-all duration-500 ease-out-expo ${scrolled ? "h-9" : "h-11"}`}
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.links.map((l) => {
              const active = here(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block rounded-full px-4 py-2 text-[15px] font-bold transition-colors hover:text-white ${
                      active ? "text-white" : "text-cream/80"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 ease-out-expo ${
                        active
                          ? "scale-100 bg-blue/20 opacity-100 ring-1 ring-blue/60"
                          : "scale-75 bg-white/8 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LangSwitch />
            <div className="hidden sm:block">
              <Button href={nav.cta.href} className="h-12! px-6!">
                {nav.cta.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={open ? "mobile-menu" : undefined}
              aria-label={open ? nav.closeMenu : nav.openMenu}
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
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y bg-ink px-6 pb-10 pt-32 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div aria-hidden className="absolute -right-32 -top-32 size-[420px] glow text-blue/40" />
            <ul className="relative mt-auto flex flex-col gap-1">
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
                      aria-current={here(l.href) ? "page" : undefined}
                      className={`text-display flex items-center gap-4 py-1 text-[clamp(40px,11vw,72px)] transition-colors active:text-blue ${
                        here(l.href) ? "text-blue" : "text-cream"
                      }`}
                    >
                      {l.label}
                      {here(l.href) && <span aria-hidden className="size-3 rounded-full bg-blue" />}
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
