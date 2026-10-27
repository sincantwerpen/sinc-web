import type { Metadata } from "next";
import { getLang, getT } from "@/content/server";
import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";
import type { GuestTicket } from "@/lib/dashboard/types";
import { TicketPage } from "@/components/events/TicketPage";
import { NoticePage } from "@/components/events/NoticePage";

export async function generateMetadata(): Promise<Metadata> {
  const { registration } = await getT();
  return { title: `${registration.ticket.metaTitle} | SINC Antwerpen`, robots: { index: false, follow: false } };
}

const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;

/** The guest's own ticket, from the link in the ticket mail: QR, details, change or cancel. */
export default async function Ticket({ params }: PageProps<"/[lang]/ticket/[token]">) {
  const { token } = await params;
  const { registration: r } = await getT();
  const lang = await getLang();
  if (!dashboardConfigured() || !TOKEN.test(token)) return <NoticePage title={r.ticket.title} text={r.ticket.notFound} />;
  let ticket: GuestTicket | null = null;
  let failed = false;
  try {
    const res = await dashboardFetch(`/api/public/tickets/${token}`);
    if (res.ok) ticket = (await res.json()) as GuestTicket;
    else failed = res.status !== 404;
  } catch {
    failed = true;
  }
  if (!ticket) return <NoticePage title={r.ticket.title} text={failed ? r.ticket.unavailable : r.ticket.notFound} />;
  return <TicketPage token={token} initial={ticket} lang={lang} />;
}
