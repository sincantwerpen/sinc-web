"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Choice, DashEvent, GuestTicket } from "@/lib/dashboard/types";
import { dashLang, formatEuro } from "@/lib/dashboard/live";
import { Link } from "../Link";
import { ArrowIcon } from "../ui";
import { useLang, useLive, useT } from "../LangProvider";
import { TicketQr, pillBlue, pillGhost } from "./TicketQr";
import { storeToken, type Calendar } from "./RegistrationCard";

const EASE = [0.16, 1, 0.3, 1] as const;
const field =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-[16px] text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-blue focus:bg-white/[0.07]";
const input = `${field} h-13`;
const label = "flex flex-col gap-1.5 text-[14px] font-bold text-cream/75";
const select = `${input} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23f4f3eb%22 stroke-width=%222.4%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_16px_center] bg-no-repeat pr-11`;

type Done = { status: "in" | "pay" | "waitlist"; token: string; payToken: string | null; ticket: GuestTicket | null };

function Select({ name, choices, placeholder, required, lang, hide = [] }: { name: string; choices: Choice[]; placeholder: string; required?: boolean; lang: "NL" | "EN"; hide?: string[] }) {
  return (
    <select name={name} required={required} defaultValue="" className={select}>
      <option value="" disabled>
        {placeholder}
      </option>
      {choices
        .filter((c) => !hide.includes(c.id))
        .map((c) => (
          <option key={c.id} value={c.id} className="bg-ink">
            {c.labels[lang]}
          </option>
        ))}
    </select>
  );
}

/**
 * The short registration in a panel on the event page (plan section 5): name and email first, then
 * the SINC fields and the event's own questions, a separate unticked newsletter box, and then
 * "Je bent erbij!" with the ticket, the calendar buttons and a way to cancel.
 */
export function RegisterPanel({
  event,
  title,
  calendar,
  full,
  onClose,
  onDone,
}: {
  event: DashEvent;
  title: string;
  calendar: Calendar;
  full: boolean;
  onClose: () => void;
  onDone: (t: GuestTicket | null) => void;
}) {
  const { registration: r } = useT();
  const live = useLive();
  const lang = useLang();
  const L = dashLang(lang);
  const types = event.ticketTypes;
  const [typeId, setTypeId] = useState(types.length === 1 ? types[0].id : (types.find((t) => t.placesLeft !== 0)?.id ?? types[0]?.id ?? ""));
  const [school, setSchool] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = before;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const settings = event.registration.fieldSettings ?? {};
  const own = (key: string, fallback: string) => settings[key]?.labels?.[L] || settings[key]?.labels?.NL || fallback;
  const phoneRequired = settings.phone?.required === true;
  const chosen = types.find((t) => t.id === typeId);
  const waitlist = full || chosen?.placesLeft === 0;
  const choices = live?.choices;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const customAnswers: Record<string, string> = {};
    for (const f of event.registration.customFields) customAnswers[f.id] = get(`q-${f.id}`);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          ticketTypeId: typeId,
          firstName: get("firstName"),
          lastName: get("lastName"),
          email: get("email"),
          phone: get("phone"),
          school: school === "andere" && get("schoolOther") ? get("schoolOther") : school,
          fieldOfStudy: get("fieldOfStudy"),
          studyYear: get("studyYear"),
          entrepreneurStage: get("entrepreneurStage"),
          dietary: get("dietary"),
          comment: get("comment"),
          confirmed: form.get("confirm") === "on",
          customAnswers,
          newsletter: form.get("newsletter") === "on",
          website: get("website"),
          lang,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error === "conflict" ? (/volzet/i.test(data.message ?? "") ? r.errors.full : r.errors.conflict) : data.message && res.status === 400 ? data.message : r.errors.generic);
        return;
      }
      const token: string = data.ticketToken;
      storeToken(event.id, token);
      const ticket: GuestTicket | null = await fetch(`/api/ticket/${token}`)
        .then((x) => (x.ok ? x.json() : null))
        .catch(() => null);
      setDone({ status: data.status === "wachtlijst" ? "waitlist" : data.paymentToken ? "pay" : "in", token, payToken: data.paymentToken, ticket });
      onDone(ticket);
      scroller.current?.scrollTo({ top: 0 });
    } catch {
      setError(r.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  // On <body>: the card around it has a blur and a transform, which would trap a fixed panel.
  return createPortal(
    <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-label={r.panelTitle}>
      <motion.button
        type="button"
        aria-label={r.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        ref={scroller}
        data-lenis-prevent
        className="relative flex h-full w-full max-w-[560px] flex-col overflow-y-auto overscroll-contain bg-ink ring-1 ring-white/10 sm:rounded-l-[32px]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-ink/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="min-w-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{done ? r.card : r.panelTitle}</p>
            <p className="truncate font-bold">{title}</p>
          </div>
          <button type="button" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 hover:bg-white/15" aria-label={r.close}>
            <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[2.4]" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" className="flex flex-col gap-6 px-5 py-8 sm:px-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col gap-3">
                <span className="flex size-14 items-center justify-center rounded-full bg-blue text-white shadow-[0_0_60px_rgba(0,150,255,0.6)]">
                  <svg viewBox="0 0 24 24" className="size-7 fill-none stroke-current stroke-[2.6]" aria-hidden>
                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="text-display text-[clamp(40px,8vw,56px)]">{done.status === "waitlist" ? r.onWaitlist : done.status === "pay" ? r.toPay : r.youreIn}</h2>
                <p className="text-[17px] leading-[1.6] text-cream/75">{done.status === "waitlist" ? r.doneWaitlist : done.status === "pay" ? r.donePay : r.doneIn}</p>
              </div>
              {done.ticket?.qrSvg && <TicketQr ticket={done.ticket} />}
              <div className="flex flex-wrap gap-2">
                {done.payToken && (
                  <Link href={`/betalen/${done.payToken}`} className={pillBlue}>
                    {r.pay} <ArrowIcon />
                  </Link>
                )}
                <Link href={`/ticket/${done.token}`} className={done.payToken ? pillGhost : pillBlue}>
                  {r.viewTicket} <ArrowIcon />
                </Link>
              </div>
              {calendar && done.status !== "waitlist" && (
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-bold text-cream/60">{r.addToCalendar}</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={calendar.google} target="_blank" rel="noreferrer" className={pillGhost}>
                      {r.google}
                    </a>
                    <a href={calendar.ics} className={pillGhost}>
                      {r.apple}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-[15px] font-bold">
                <button type="button" onClick={onClose} className="text-blue hover:underline">
                  {r.moreInfo}
                </button>
                <Link href={`/ticket/${done.token}#annuleren`} className="text-cream/60 hover:text-cream">
                  {r.cancel}
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={(e) => void submit(e)} className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {types.length > 1 && (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-[14px] font-bold text-cream/75">{r.chooseTicket}</legend>
                  {types.map((t) => {
                    const soldOut = t.placesLeft === 0;
                    const disabled = soldOut && !event.waitlist;
                    return (
                      <label
                        key={t.id}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 ring-1 transition-colors ${typeId === t.id ? "bg-blue/10 ring-blue" : "ring-white/12 hover:ring-white/30"} ${disabled ? "opacity-40" : "cursor-pointer"}`}
                      >
                        <input type="radio" name="ticketType" value={t.id} checked={typeId === t.id} disabled={disabled} onChange={() => setTypeId(t.id)} className="size-4 accent-[#0096ff]" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold">{t.name}</span>
                          {t.description && <span className="block text-[14px] text-cream/55">{t.description}</span>}
                        </span>
                        <span className="shrink-0 text-right text-[15px] font-bold">
                          {t.priceCents ? formatEuro(t.priceCents) : r.free}
                          {soldOut && <span className="block text-[11px] uppercase tracking-[0.1em] text-yellow">{event.waitlist ? r.waitlist : r.soldOut}</span>}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <label className={label}>
                  {r.fields.firstName}
                  <input name="firstName" required autoComplete="given-name" className={input} />
                </label>
                <label className={label}>
                  {r.fields.lastName}
                  <input name="lastName" required autoComplete="family-name" className={input} />
                </label>
                <label className={`${label} sm:col-span-2`}>
                  {r.fields.email}
                  <input name="email" type="email" required autoComplete="email" className={input} />
                </label>
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{r.aboutYou}</legend>
                <label className={label}>
                  <span>
                    {own("phone", r.fields.phone)} {!phoneRequired && <span className="font-normal text-cream/40">({r.fields.optional})</span>}
                  </span>
                  <input name="phone" type="tel" required={phoneRequired} autoComplete="tel" className={input} />
                </label>
                {choices && (
                  <>
                    <label className={label}>
                      {own("school", r.fields.school)}
                      <select
                        name="school"
                        required={settings.school?.required !== false}
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className={select}
                      >
                        <option value="" disabled>
                          {r.fields.chooseSchool}
                        </option>
                        {choices.schools
                          .filter((c) => !(settings.school?.hide ?? []).includes(c.id) && !(settings.school?.noOther && c.id === "andere"))
                          .map((c) => (
                            <option key={c.id} value={c.id} className="bg-ink">
                              {c.labels[L]}
                            </option>
                          ))}
                      </select>
                    </label>
                    {school === "andere" && (
                      <label className={label}>
                        {r.fields.otherSchool}
                        <input name="schoolOther" required className={input} />
                      </label>
                    )}
                    <label className={label}>
                      {r.fields.fieldOfStudy}
                      <input name="fieldOfStudy" required placeholder={r.fields.fieldOfStudyHint} className={input} />
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className={label}>
                        {r.fields.studyYear}
                        <Select name="studyYear" choices={choices.studyYears} placeholder={r.fields.chooseYear} required lang={L} />
                      </label>
                      <label className={label}>
                        {r.fields.entrepreneurStage}
                        <Select name="entrepreneurStage" choices={choices.entrepreneurStages} placeholder={r.fields.chooseStage} required lang={L} />
                      </label>
                    </div>
                  </>
                )}
              </fieldset>

              {(event.registration.customFields.length > 0 || event.registration.fields.dietary || event.registration.fields.comment) && (
                <fieldset className="flex flex-col gap-3">
                  <legend className="mb-1 text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{r.questions}</legend>
                  {event.registration.customFields.map((f) => {
                    const text = f.labels[L] || f.labels.NL;
                    const name = `q-${f.id}`;
                    return (
                      <label key={f.id} className={label}>
                        <span>
                          {text} {!f.required && <span className="font-normal text-cream/40">({r.fields.optional})</span>}
                        </span>
                        {f.type === "select" ? (
                          <Select name={name} choices={(f.options ?? []).map((o) => ({ id: o.id, labels: o.labels }))} placeholder={r.fields.choose} required={f.required} lang={L} />
                        ) : f.type === "textarea" ? (
                          <textarea name={name} required={f.required} rows={3} className={`${field} py-3`} />
                        ) : (
                          <input name={name} type={f.type === "number" ? "number" : "text"} required={f.required} className={input} />
                        )}
                      </label>
                    );
                  })}
                  {event.registration.fields.dietary && (
                    <label className={label}>
                      <span>
                        {own("dietary", r.fields.dietary)} {settings.dietary?.required !== true && <span className="font-normal text-cream/40">({r.fields.optional})</span>}
                      </span>
                      <input name="dietary" required={settings.dietary?.required === true} className={input} />
                    </label>
                  )}
                  {event.registration.fields.comment && (
                    <label className={label}>
                      <span>
                        {own("comment", r.fields.comment)} {settings.comment?.required !== true && <span className="font-normal text-cream/40">({r.fields.optional})</span>}
                      </span>
                      <textarea name="comment" required={settings.comment?.required === true} rows={3} className={`${field} py-3`} />
                    </label>
                  )}
                </fieldset>
              )}

              <div className="flex flex-col gap-3">
                {event.registration.extraConfirm && (
                  <label className="flex items-start gap-3 text-[15px] font-bold text-red-300">
                    <input type="checkbox" name="confirm" required className="mt-1 size-4 shrink-0 accent-[#0096ff]" />
                    {event.registration.extraConfirm.labels[L] || event.registration.extraConfirm.labels.NL}
                  </label>
                )}
                <label className="flex items-start gap-3 text-[15px] text-cream/75">
                  <input type="checkbox" name="newsletter" className="mt-1 size-4 shrink-0 accent-[#0096ff]" />
                  {r.newsletter}
                </label>
              </div>

              {/* honeypot against spam bots */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              {error && <p className="rounded-2xl bg-white/8 px-5 py-4 text-[15px] font-bold text-cream" role="alert">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="group flex h-14 items-center justify-center gap-3 rounded-full bg-blue text-[16px] font-bold text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] transition-colors hover:bg-blue-deep disabled:opacity-60"
              >
                {busy ? r.sending : waitlist ? r.submitWaitlist : r.submit}
                {!busy && <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-1"><ArrowIcon /></span>}
              </button>
              <p className="text-[13px] leading-[1.5] text-cream/45">
                {r.privacy}{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-cream">
                  {r.privacyLink}
                </Link>
                .
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>,
    document.body,
  );
}
