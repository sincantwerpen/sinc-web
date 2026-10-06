"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contactPage } from "@/content/pages";

type Status = "idle" | "loading" | "ok" | "error";

const field =
  "w-full rounded-[22px] border border-white/12 bg-white/[0.04] px-6 text-[16px] text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-blue focus:bg-white/[0.07]";

export function ContactForm() {
  const { form, email } = contactPage;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(el))),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) el.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="c-name" className="sr-only">{form.name}</label>
      <input id="c-name" name="name" required autoComplete="name" placeholder={form.name} className={`${field} h-15`} />
      <label htmlFor="c-email" className="sr-only">{form.email}</label>
      <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={form.email} className={`${field} h-15`} />
      <label htmlFor="c-message" className="sr-only">{form.message}</label>
      <textarea id="c-message" name="message" required rows={5} placeholder={form.message} className={`${field} resize-y py-5`} />
      {/* honeypot against spam bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-1 flex h-15 items-center justify-center gap-3 rounded-full bg-blue text-[16px] font-bold text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] transition-all hover:shadow-[0_16px_50px_-8px_rgba(0,150,255,0.95)] disabled:opacity-60"
      >
        {status === "loading" ? "…" : form.submit}
        <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
      </button>
      <div aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {(status === "ok" || status === "error") && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-2xl px-5 py-4 text-[15px] font-bold ${status === "ok" ? "bg-cream text-ink" : "bg-white/8 text-cream"}`}
            >
              {status === "ok" ? (
                form.success
              ) : (
                <>
                  {form.error}{" "}
                  <a href={`mailto:${email}`} className="text-blue underline underline-offset-4">
                    {email}
                  </a>
                  .
                </>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
