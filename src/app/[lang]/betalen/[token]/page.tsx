import type { Metadata } from "next";
import { getT } from "@/content/server";
import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";
import type { PaymentInfo } from "@/lib/dashboard/types";
import { PaymentPage } from "@/components/events/PaymentPage";
import { NoticePage } from "@/components/events/NoticePage";

export async function generateMetadata(): Promise<Metadata> {
  const { registration } = await getT();
  return { title: `${registration.payment.metaTitle} | SINC Antwerpen`, robots: { index: false, follow: false } };
}

const TOKEN = /^[0-9a-f-]{36}\.[\w-]{16}$/;

/** The payment page from the payment mail: IBAN, amount, structured reference, optional proof. */
export default async function Payment({ params }: PageProps<"/[lang]/betalen/[token]">) {
  const { token } = await params;
  const { registration: r } = await getT();
  if (!dashboardConfigured() || !TOKEN.test(token)) return <NoticePage title={r.payment.title} text={r.payment.notFound} />;
  let info: PaymentInfo | null = null;
  let failed = false;
  try {
    const res = await dashboardFetch(`/api/public/payment/${token}`);
    if (res.ok) info = (await res.json()) as PaymentInfo;
    else failed = res.status !== 404;
  } catch {
    failed = true;
  }
  if (!info) return <NoticePage title={r.payment.title} text={failed ? r.payment.unavailable : r.payment.notFound} />;
  return <PaymentPage token={token} initial={info} />;
}
