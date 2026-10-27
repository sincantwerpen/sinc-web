"use client";

import type { GuestTicket } from "@/lib/dashboard/types";
import { dashLang } from "@/lib/dashboard/live";
import { useLang, useT } from "../LangProvider";

/** The ticket itself: QR on white (scanned at the door), name, ticket type and number. */
export function TicketQr({ ticket }: { ticket: GuestTicket }) {
  const { registration: r } = useT();
  const lang = useLang();
  const title = ticket.event.titles[dashLang(lang)] ?? ticket.event.titles.NL ?? "";
  return (
    <div className="overflow-hidden rounded-[24px] bg-cream text-ink shadow-[0_30px_80px_-30px_rgba(0,150,255,0.5)]">
      <div className="flex items-center justify-between gap-3 bg-blue px-5 py-3 text-white">
        <span className="truncate text-[15px] font-bold">{title}</span>
        <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">SINC</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:items-center">
        {ticket.qrSvg && (
          // eslint-disable-next-line @next/next/no-img-element -- an inline SVG from the dashboard
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(ticket.qrSvg)}`}
            alt={r.ticket.showAtDoor}
            className="size-44 shrink-0 rounded-xl bg-white p-2 sm:size-40"
          />
        )}
        <dl className="grid w-full min-w-0 gap-3 text-[15px]">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">{r.ticket.name}</dt>
            <dd className="font-bold [overflow-wrap:anywhere]">
              {ticket.guest.firstName} {ticket.guest.lastName}
            </dd>
          </div>
          {ticket.ticketType && (
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">{r.ticket.type}</dt>
              <dd className="font-bold">{ticket.ticketType}</dd>
            </div>
          )}
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">{r.ticket.number}</dt>
            <dd className="font-bold tabular-nums tracking-[0.08em]">{ticket.number}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** Small pill link/button in the site's style. */
export const pill =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold transition-colors";
export const pillGhost = `${pill} text-cream ring-1 ring-white/20 hover:bg-white/5 hover:ring-white/40`;
export const pillBlue = `${pill} bg-blue text-white shadow-[0_10px_40px_-10px_rgba(0,150,255,0.8)] hover:bg-blue-deep`;
