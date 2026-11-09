import type { Metadata } from "next";
import { getLang, getT } from "@/content/server";
import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";
import type { FeedbackInfo } from "@/lib/dashboard/types";
import { FeedbackForm } from "@/components/events/FeedbackForm";
import { NoticePage } from "@/components/events/NoticePage";

export async function generateMetadata(): Promise<Metadata> {
  const { registration } = await getT();
  return { title: `${registration.feedback.metaTitle} | SINC Antwerpen`, robots: { index: false, follow: false } };
}

const TOKEN = /^[\w-]{1,80}(\.[\w-]{16})?$/;

/** The feedback form after an event, from the button in the feedback mail (or the event's open link). */
export default async function Feedback({ params }: PageProps<"/[lang]/feedback/[token]">) {
  const { token } = await params;
  const { registration: r } = await getT();
  const lang = await getLang();
  if (!dashboardConfigured() || !TOKEN.test(token)) return <NoticePage title={r.feedback.title} text={r.feedback.notFound} />;
  let info: FeedbackInfo | null = null;
  let state: "notFound" | "closed" | "unavailable" = "notFound";
  try {
    const res = await dashboardFetch(`/api/public/feedback/${token}`);
    if (res.ok) info = (await res.json()) as FeedbackInfo;
    else state = res.status === 410 ? "closed" : res.status === 404 ? "notFound" : "unavailable";
  } catch {
    state = "unavailable";
  }
  if (!info) return <NoticePage title={r.feedback.title} text={r.feedback[state]} />;
  return <FeedbackForm token={token} info={info} lang={lang} />;
}
