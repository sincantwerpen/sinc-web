"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIcon } from "@/components/ui";
import { useLang, useT } from "./LangProvider";

type Status = "idle" | "loading" | "ok" | "error";

const field =
  "h-14 w-full rounded-full border border-white/15 bg-white/[0.06] px-6 text-[16px] text-cream placeholder:text-cream/45 outline-none transition-colors focus:border-blue focus:bg-white/[0.09]";

export function Newsletter() {
  const { newsletter } = useT();
  const lang = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    const data = { ...Object.fromEntries(new FormData(form)), language: lang };
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-blue p-8 text-white sm:p-12 lg:p-16">
      <div aria-hidden className="absolute -right-24 -top-24 size-[420px] glow text-white/15" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 size-[360px] glow text-blue-deep" />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-display text-[clamp(40px,5.4vw,80px)]">{newsletter.title}</h2>
          <p className="max-w-[460px] text-lg leading-[1.55] text-white/85">{newsletter.text}</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate={false}>
          <label className="sr-only" htmlFor="nl-email">{newsletter.fields.email}</label>
          <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder={newsletter.fields.email} className={`${field} border-white/30 bg-white/10 placeholder:text-white/70`} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sr-only" htmlFor="nl-first">{newsletter.fields.firstName}</label>
            <input id="nl-first" name="firstName" required autoComplete="given-name" placeholder={newsletter.fields.firstName} className={`${field} border-white/30 bg-white/10 placeholder:text-white/70`} />
            <label className="sr-only" htmlFor="nl-last">{newsletter.fields.lastName}</label>
            <input id="nl-last" name="lastName" required autoComplete="family-name" placeholder={newsletter.fields.lastName} className={`${field} border-white/30 bg-white/10 placeholder:text-white/70`} />
          </div>
          {/* honeypot against spam bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group mt-1 flex h-14 items-center justify-center gap-3 rounded-full bg-ink text-[15px] font-bold text-white transition-colors hover:bg-yellow hover:text-ink disabled:opacity-60"
          >
            {status === "loading" ? "…" : newsletter.submit}
            <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-1"><ArrowIcon /></span>
          </button>
          <div aria-live="polite" className="min-h-6">
            <AnimatePresence mode="wait">
              {(status === "ok" || status === "error") && (
                <motion.p
                  key={status}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-2xl px-5 py-3 text-[15px] font-bold ${status === "ok" ? "bg-white text-ink" : "bg-ink/40 text-white"}`}
                >
                  {status === "ok" ? newsletter.success : newsletter.error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}
