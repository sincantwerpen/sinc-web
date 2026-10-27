"use client";

import { useEffect, useState } from "react";
import type { DashEvent, DashTicketType, GuestTicket } from "@/lib/dashboard/types";
import { formatEuro, opensHere } from "@/lib/dashboard/live";
import { Link } from "../Link";
import { ArrowIcon } from "../ui";
import { useT } from "../LangProvider";
import { RegisterPanel } from "./RegisterPanel";
import { pillGhost } from "./TicketQr";

export type Calendar = { google: string; ics: string } | null;

/** Where this browser keeps the ticket link of an event it registered for, to show "Je bent erbij". */
export const ticketKey = (eventId: string) => `sinc-ticket:${eventId}`;

export function readStoredToken(eventId: string): string | null {
  try {
    return localStorage.getItem(ticketKey(eventId));
  } catch {
    return null;
  }
}

export function storeToken(eventId: string, token: string | null) {
  try {
    if (token) localStorage.setItem(ticketKey(eventId), token);
    else localStorage.removeItem(ticketKey(eventId));
  } catch {
    // Private mode: the mail still has the link.
  }
}

type Live = Pick<DashEvent, "placesLeft" | "waitlist" | "ticketTypes"> & { open: boolean };

const isFull = (placesLeft: number | null, types: DashTicketType[]) =>
  placesLeft === 0 || (types.length > 0 && types.every((t) => t.placesLeft === 0));

/**
 * The Registration card of the event page, like Luma's: the ticket types with their price, places
 * left or the waiting list, and one big button. "Inschrijven" opens the panel on this page; for an
 * event that still uses Luma (test semester) the button goes to Luma.
 */
export function RegistrationCard({ event, title, calendar }: { event: DashEvent; title: string; calendar: Calendar }) {
  const { registration: r } = useT();
  const [live, setLive] = useState<Live>({ placesLeft: event.placesLeft, waitlist: event.waitlist, ticketTypes: event.ticketTypes, open: opensHere(event) });
  const [panel, setPanel] = useState(false);
  const [mine, setMine] = useState<GuestTicket | null>(null);

  useEffect(() => {
    if (event.registrationMode !== "sinc" || event.ended) return;
    // The page can be a minute old: ask for the places left now.
    fetch(`/api/events/${event.id}/status`)
      .then((res) => (res.ok ? res.json() : null))
      .then((s) => s && setLive({ placesLeft: s.placesLeft, waitlist: s.waitlist, ticketTypes: s.ticketTypes, open: s.open && event.registrationMode === "sinc" }))
      .catch(() => {});
    const token = readStoredToken(event.id);
    if (token)
      fetch(`/api/ticket/${token}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((t: GuestTicket | null) => {
          if (t && t.state !== "cancelled") setMine(t);
          else storeToken(event.id, null);
        })
        .catch(() => {});
  }, [event.id, event.registrationMode, event.ended]);

  // "Registreer" on an event card links to /events/<slug>#inschrijven: open the panel straight away.
  useEffect(() => {
    const open = () => window.location.hash === "#inschrijven" && setPanel(true);
    const frame = requestAnimationFrame(open);
    window.addEventListener("hashchange", open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", open);
    };
  }, []);

  const full = isFull(live.placesLeft, live.ticketTypes);
  const prices = live.ticketTypes.length ? live.ticketTypes : [];
  const single = prices.length <= 1;
  const price = (cents: number) => (cents ? formatEuro(cents) : r.free);
  const myToken = mine ? readStoredToken(event.id) : null;

  let action: React.ReactNode;
  if (event.cancelled) action = <p className="font-bold text-cream/70">{r.cancelled}</p>;
  else if (event.ended) action = <p className="font-bold text-cream/70">{r.ended}</p>;
  else if (event.registrationMode === "luma" && event.lumaUrl)
    action = (
      <a href={event.lumaUrl} target="_blank" rel="noreferrer" className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue text-[16px] font-bold text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] hover:bg-blue-deep">
        {r.viaLuma} <ArrowIcon dir="up-right" />
      </a>
    );
  else if (mine && myToken)
    action = (
      <div className="flex flex-col gap-3">
        <p className="text-[18px] font-bold text-cream">
          {mine.state === "waitlist" ? r.onWaitlist : mine.state === "pay" || mine.state === "review" ? r.toPay : r.youreIn}
        </p>
        <Link href={`/ticket/${myToken}`} className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-cream text-[16px] font-bold text-ink hover:bg-white">
          {r.viewTicket} <ArrowIcon />
        </Link>
      </div>
    );
  else if (!live.open) action = <p className="font-bold text-cream/70">{r.closed}</p>;
  else if (full && !live.waitlist) action = <p className="font-bold text-cream/70">{r.fullNoWaitlist}</p>;
  else
    action = (
      <button
        type="button"
        onClick={() => setPanel(true)}
        className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue text-[16px] font-bold text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] transition-colors hover:bg-blue-deep"
      >
        {full ? r.joinWaitlist : r.register}
        <span className="flex transition-transform duration-500 ease-out-expo group-hover:translate-x-1"><ArrowIcon /></span>
      </button>
    );

  return (
    <div id="inschrijven" className="scroll-mt-28 overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10 lg:backdrop-blur-xl">
      <p className="border-b border-white/10 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-cream/60">{r.card}</p>
      <div className="flex flex-col gap-4 p-6">
        {!single && event.registrationMode === "sinc" && (
          <ul className="flex flex-col gap-2">
            {prices.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 ring-white/10">
                <span className="min-w-0">
                  <span className="block font-bold">{t.name}</span>
                  {t.description && <span className="block text-[14px] text-cream/55">{t.description}</span>}
                </span>
                <span className="shrink-0 text-right text-[15px] font-bold text-cream/80">
                  {price(t.priceCents)}
                  {t.placesLeft === 0 && <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-yellow">{r.soldOut}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
        {single && event.registrationMode === "sinc" && <p className="text-[18px] font-bold">{price(prices[0]?.priceCents ?? 0)}</p>}
        {event.registrationMode === "luma" && <p className="text-[15px] text-cream/60">{r.lumaNote}</p>}
        {event.registrationMode === "sinc" && !event.ended && !event.cancelled && live.placesLeft != null && !mine && (
          <p className={`text-[15px] font-bold ${full ? "text-yellow" : "text-cream/70"}`}>
            {full ? (live.waitlist ? r.fullWaitlist : r.full) : r.placesLeft(live.placesLeft)}
          </p>
        )}
        {action}
        {calendar && !event.ended && !event.cancelled && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[14px]">
            <span className="mr-1 font-bold text-cream/50">{r.addToCalendar}</span>
            <a href={calendar.google} target="_blank" rel="noreferrer" className={`${pillGhost} min-h-9 px-4 text-[14px]`}>
              {r.google}
            </a>
            <a href={calendar.ics} className={`${pillGhost} min-h-9 px-4 text-[14px]`}>
              {r.apple}
            </a>
          </div>
        )}
      </div>
      {panel && (
        <RegisterPanel
          event={{ ...event, ...live }}
          title={title}
          calendar={calendar}
          full={full}
          onClose={() => setPanel(false)}
          onDone={(t) => setMine(t)}
        />
      )}
    </div>
  );
}
