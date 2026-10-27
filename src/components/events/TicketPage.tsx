"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/i18n";
import { intlLocale, localize } from "@/i18n";
import type { GuestTicket } from "@/lib/dashboard/types";
import { dashLang, formatEuro } from "@/lib/dashboard/live";
import { googleCalendarUrl } from "@/lib/calendar";
import { Link } from "../Link";
import { ArrowIcon, Eyebrow } from "../ui";
import { useLive, useT } from "../LangProvider";
import { TicketQr, pillBlue, pillGhost } from "./TicketQr";
import { storeToken } from "./RegistrationCard";

const field =
  "h-13 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-[16px] text-cream outline-none transition-colors focus:border-blue disabled:opacity-60";
const label = "flex flex-col gap-1.5 text-[14px] font-bold text-cream/75";

/**
 * The guest's ticket page (/ticket/<token>, the button in the ticket mail): the QR for the door,
 * the PDF, the calendar, and changing the details or cancelling. Everything goes to the dashboard.
 */
export function TicketPage({ token, initial, lang }: { token: string; initial: GuestTicket; lang: Lang }) {
  const { registration: r } = useT();
  const choices = useLive()?.choices;
  const [t, setT] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const L = dashLang(lang);
  const title = t.event.titles[L] ?? t.event.titles.NL ?? "";

  useEffect(() => {
    // Remember it in this browser, so the event page shows "Je bent erbij" too.
    storeToken(t.event.id, t.state === "cancelled" ? null : token);
    if (window.location.hash === "#annuleren") document.getElementById("annuleren")?.scrollIntoView({ block: "center" });
  }, [t.event.id, t.state, token]);

  const day = new Date(`${t.event.date}T12:00:00Z`).toLocaleDateString(intlLocale[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Brussels" });
  const when = `${day} · ${t.event.startTime}${t.event.endTime ? ` – ${t.event.endTime}` : ""}`;
  const eventUrl = `https://www.sincantwerpen.be${localize(`/events/${t.event.id}`, lang)}`;

  const status =
    t.event.cancelled ? r.ticket.eventCancelled
    : t.state === "cancelled" ? r.ticket.cancelled
    : t.state === "waitlist" ? r.ticket.waitlist
    : t.state === "pay" ? r.ticket.pay
    : t.state === "review" ? r.ticket.review
    : t.state === "checked_in" ? r.ticket.checkedIn
    : r.ticket.showAtDoor;

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    for (const k of ["firstName", "lastName", "phone", "school", "fieldOfStudy", "studyYear", "entrepreneurStage", "ticketTypeId"]) {
      const v = form.get(k);
      if (typeof v === "string" && (k !== "ticketTypeId" || v)) body[k] = v.trim();
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/ticket/${token}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || r.errors.generic);
      setT(data as GuestTicket);
      setEditing(false);
      setMsg(r.ticket.saved);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : r.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  async function cancel() {
    if (!confirm(r.ticket.cancelConfirm)) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/ticket/${token}/cancel`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || r.errors.generic);
      setT(data as GuestTicket);
      setMsg(r.ticket.cancelDone);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : r.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  const calendar =
    t.event.startsAt && t.state !== "cancelled" && !t.event.cancelled
      ? { google: googleCalendarUrl({ id: t.event.id, title: `${title} · SINC Antwerpen`, startsAt: t.event.startsAt, endsAt: t.event.endsAt, location: t.event.location, url: eventUrl }), ics: `/api/events/${t.event.id}/ics?lang=${lang}` }
      : null;

  return (
    <main className="container-x pb-24 pt-32 sm:pt-40">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Eyebrow>{t.state === "cancelled" ? r.ticket.cancelledTitle : r.ticket.title}</Eyebrow>
          <h1 className="text-display text-[clamp(40px,7vw,80px)] [overflow-wrap:anywhere]">{title}</h1>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{r.ticket.when}</dt>
              <dd className="font-bold first-letter:uppercase">{when}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{r.ticket.where}</dt>
              <dd className="font-bold">{t.event.location}</dd>
            </div>
          </dl>
        </div>

        <p className={`rounded-2xl px-5 py-4 text-[16px] font-bold ${t.state === "cancelled" || t.event.cancelled ? "bg-white/8 text-cream/80" : t.state === "pay" || t.state === "review" || t.state === "waitlist" ? "bg-yellow/10 text-yellow ring-1 ring-yellow/30" : "bg-blue/10 text-cream ring-1 ring-blue/40"}`}>
          {status}
        </p>

        {t.qrSvg && t.state !== "cancelled" && <TicketQr ticket={t} />}

        <div className="flex flex-wrap gap-2">
          {t.payToken && (
            <Link href={`/betalen/${t.payToken}`} className={pillBlue}>
              {r.pay} {t.priceCents ? formatEuro(t.priceCents) : ""} <ArrowIcon />
            </Link>
          )}
          {t.qrSvg && (
            <a href={`/api/ticket/${token}/pdf?lang=${L}`} className={pillGhost}>
              {r.ticket.pdf}
            </a>
          )}
          {calendar && (
            <>
              <a href={calendar.google} target="_blank" rel="noreferrer" className={pillGhost}>
                {r.google}
              </a>
              <a href={calendar.ics} className={pillGhost}>
                {r.apple}
              </a>
            </>
          )}
          <Link href={`/events/${t.event.id}`} className={pillGhost}>
            {r.ticket.toEvent} <ArrowIcon />
          </Link>
        </div>

        {msg && <p className="rounded-2xl bg-white/8 px-5 py-4 text-[15px] font-bold" role="status">{msg}</p>}

        {t.canChange && (
          <section className="rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-display text-[28px]">{r.ticket.change}</h2>
              {!editing && (
                <button type="button" onClick={() => setEditing(true)} className={pillGhost}>
                  {r.ticket.change}
                </button>
              )}
            </div>
            {editing && (
              <form onSubmit={(e) => void save(e)} className="mt-6 grid gap-3 sm:grid-cols-2">
                <label className={label}>
                  {r.fields.firstName}
                  <input name="firstName" required defaultValue={t.guest.firstName} className={field} />
                </label>
                <label className={label}>
                  {r.fields.lastName}
                  <input name="lastName" required defaultValue={t.guest.lastName} className={field} />
                </label>
                <label className={`${label} sm:col-span-2`}>
                  {r.fields.email}
                  <input value={t.guest.email} disabled className={field} readOnly />
                  <span className="text-[13px] font-normal text-cream/45">{r.ticket.emailFixed}</span>
                </label>
                <label className={label}>
                  {r.fields.phone}
                  <input name="phone" type="tel" defaultValue={t.guest.phone} className={field} />
                </label>
                <label className={label}>
                  {r.fields.fieldOfStudy}
                  <input name="fieldOfStudy" defaultValue={t.guest.fieldOfStudy} className={field} />
                </label>
                {choices && (
                  <>
                    <label className={label}>
                      {r.fields.school}
                      <select name="school" defaultValue={t.guest.school} className={field}>
                        {!choices.schools.some((c) => c.id === t.guest.school) && t.guest.school && <option value={t.guest.school}>{t.guest.school}</option>}
                        {choices.schools.map((c) => (
                          <option key={c.id} value={c.id} className="bg-ink">
                            {c.labels[L]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={label}>
                      {r.fields.studyYear}
                      <select name="studyYear" defaultValue={t.guest.studyYear} className={field}>
                        {choices.studyYears.map((c) => (
                          <option key={c.id} value={c.id} className="bg-ink">
                            {c.labels[L]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={`${label} sm:col-span-2`}>
                      {r.fields.entrepreneurStage}
                      <select name="entrepreneurStage" defaultValue={t.guest.entrepreneurStage} className={field}>
                        {choices.entrepreneurStages.map((c) => (
                          <option key={c.id} value={c.id} className="bg-ink">
                            {c.labels[L]}
                          </option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                {t.otherTypes.length > 0 && (
                  <label className={`${label} sm:col-span-2`}>
                    {r.ticket.otherType}
                    <select name="ticketTypeId" defaultValue="" className={field}>
                      <option value="">
                        {r.ticket.keepType}
                        {t.ticketType ? ` (${t.ticketType})` : ""}
                      </option>
                      {t.otherTypes.map((o) => (
                        <option key={o.id} value={o.id} disabled={!o.available} className="bg-ink">
                          {o.name}
                          {o.available ? "" : ` (${r.soldOut})`}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="flex flex-wrap gap-2 pt-2 sm:col-span-2">
                  <button type="submit" disabled={busy} className={pillBlue}>
                    {busy ? r.sending : r.ticket.save}
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className={pillGhost}>
                    {r.close}
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {t.canCancel && (
          <section id="annuleren" className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="max-w-[440px] text-[15px] text-cream/60">{r.ticket.cancelConfirm}</p>
            <button type="button" onClick={() => void cancel()} disabled={busy} className={`${pillGhost} hover:ring-yellow`}>
              {r.cancel}
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
