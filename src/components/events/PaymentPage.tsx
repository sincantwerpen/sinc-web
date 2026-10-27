"use client";

import { useRef, useState } from "react";
import { intlLocale } from "@/i18n";
import type { PaymentInfo } from "@/lib/dashboard/types";
import { dashLang } from "@/lib/dashboard/live";
import { Eyebrow } from "../ui";
import { useLang, useT } from "../LangProvider";
import { pillBlue, pillGhost } from "./TicketQr";

const MAX_BYTES = 4 * 1024 * 1024;

function CopyRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  const { registration: r } = useT();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2 border-b border-white/8 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue">{label}</p>
        <p className={`mt-1 font-bold ${mono ? "whitespace-nowrap text-[15px] tabular-nums min-[400px]:text-[17px] sm:text-[18px] sm:tracking-[0.04em]" : "text-[18px] [overflow-wrap:anywhere]"}`}>{value}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard?.writeText(mono ? value.replace(/\s+/g, "") : value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="shrink-0 rounded-full px-3.5 py-2 text-[13px] font-bold text-cream ring-1 ring-white/20 hover:bg-white/5"
      >
        {copied ? r.payment.copied : r.payment.copy}
      </button>
    </div>
  );
}

/** The payment page (/betalen/<token>): beneficiary, IBAN, amount, structured reference and the optional proof. */
export function PaymentPage({ token, initial }: { token: string; initial: PaymentInfo }) {
  const { registration: r } = useT();
  const lang = useLang();
  const p = r.payment;
  const [info, setInfo] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const title = info.titles[dashLang(lang)] ?? info.titles.NL ?? "";
  const date = (iso: string) => new Date(iso).toLocaleDateString(intlLocale[lang], { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Brussels" });

  async function upload(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (file.size > MAX_BYTES) return setError(p.tooLarge);
    setBusy(true);
    const form = new FormData();
    form.set("file", file, file.name);
    try {
      const res = await fetch(`/api/payment/${token}`, { method: "POST", body: form });
      if (!res.ok) throw new Error(res.status === 413 ? p.tooLarge : p.uploadError);
      setInfo((await res.json()) as PaymentInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : p.uploadError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-x pb-24 pt-32 sm:pt-40">
      <div className="mx-auto flex max-w-[640px] flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Eyebrow>{p.title}</Eyebrow>
          <h1 className="text-display text-[clamp(40px,7vw,80px)] [overflow-wrap:anywhere]">{title}</h1>
          <p className="text-lg text-cream/70">{info.name}</p>
        </div>

        {info.state === "paid" && <p className="rounded-2xl bg-blue/10 px-5 py-4 text-[16px] font-bold ring-1 ring-blue/40">{p.paid}</p>}
        {info.state === "closed" && <p className="rounded-2xl bg-white/8 px-5 py-4 text-[16px] font-bold">{p.closed}</p>}

        {info.details && (
          <>
            <p className="text-[17px] leading-[1.6] text-cream/75">{p.intro}</p>
            <div className="rounded-[28px] bg-white/[0.04] px-6 ring-1 ring-white/10 sm:px-8">
              <CopyRow label={p.amount} value={info.details.amount} />
              <CopyRow label={p.reference} value={info.details.reference} mono />
              <CopyRow label={p.iban} value={info.details.iban} mono />
              <CopyRow label={p.beneficiary} value={`${info.details.firstName} ${info.details.lastName}`.trim()} />
            </div>

            <section className="flex flex-col gap-4 rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
              <h2 className="text-display text-[26px]">{p.proofTitle}</h2>
              {info.rejected && (
                <p className="rounded-2xl bg-yellow/10 px-4 py-3 text-[15px] font-bold text-yellow ring-1 ring-yellow/30">
                  {p.rejected}
                  {info.rejected.reason ? `: ${info.rejected.reason}` : "."}
                </p>
              )}
              <p className="text-[15px] text-cream/70">{info.proof ? p.proofReceived(date(info.proof.at)) : p.proofText}</p>
              <div>
                <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={info.proof ? pillGhost : pillBlue}>
                  {busy ? p.uploading : info.proof ? p.replace : p.upload}
                </button>
                <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} />
              </div>
              {error && <p className="text-[15px] font-bold text-yellow" role="alert">{error}</p>}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
