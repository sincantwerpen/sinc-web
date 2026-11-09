"use client";

import { useState, useSyncExternalStore } from "react";
import type { Lang } from "@/i18n";
import type { FeedbackInfo, FeedbackQuestion } from "@/lib/dashboard/types";
import { dashLang } from "@/lib/dashboard/live";
import { Link } from "../Link";
import { ArrowIcon, Eyebrow } from "../ui";
import { useT } from "../LangProvider";
import { pillBlue, pillGhost } from "./TicketQr";

type Answer = number | string | string[];

const field =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[16px] text-cream outline-none transition-colors focus:border-blue";
const chip = (on: boolean) =>
  `inline-flex min-h-11 items-center rounded-full px-5 text-[15px] font-bold ring-1 transition-colors ${
    on ? "bg-blue text-white ring-blue" : "text-cream/80 ring-white/20 hover:ring-white/50"
  }`;

/** Remembers in this browser that the anonymous link was answered (the dashboard cannot tell people apart there). */
const doneKey = (token: string) => `sinc-feedback-${token}`;

/**
 * The feedback form from the mail after an event: the questions the team set in the dashboard
 * (rating 1-5, text, one choice, several choices), in the visitor's language with Dutch as the
 * fallback. One answer per personal link; the dashboard checks the answers again.
 */
export function FeedbackForm({ token, info, lang }: { token: string; info: FeedbackInfo; lang: Lang }) {
  const { registration: r } = useT();
  const L = dashLang(lang);
  const text = (t: { NL: string; EN: string }) => t[L] || t.NL;
  const event = info.titles[L] || info.titles.NL || "SINC";
  const fill = (s: string) => s.replace(/\{event\}/g, event).replace(/\{naam\}/g, "").replace(/\s+([,.!?])/g, "$1").trim();
  const f = info.form.form;
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [sent, setState] = useState<"form" | "sending" | "done" | "answered">(info.submitted ? "answered" : "form");
  const [error, setError] = useState<string | null>(null);
  // Read after hydration only (the server has no localStorage).
  const answeredHere = useSyncExternalStore(
    () => () => {},
    () => info.open && !!window.localStorage.getItem(doneKey(token)),
    () => false
  );
  const state = sent === "form" && answeredHere ? "answered" : sent;

  const set = (id: string, v: Answer) => setAnswers((a) => ({ ...a, [id]: v }));
  const empty = (q: FeedbackQuestion) => {
    const v = answers[q.id];
    return v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (info.form.questions.some((q) => q.required && empty(q))) return setError(r.feedback.missing);
    setError(null);
    setState("sending");
    try {
      const res = await fetch(`/api/feedback/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lang: L }),
      });
      if (res.status === 410) {
        setError(r.feedback.closed);
        return setState("form");
      }
      if (!res.ok) throw new Error();
      if (info.open) window.localStorage.setItem(doneKey(token), "1");
      setState("done");
    } catch {
      setError(r.feedback.error);
      setState("form");
    }
  }

  if (state === "done" || state === "answered") {
    return (
      <main className="container-x flex min-h-[70vh] flex-col items-start justify-center gap-6 pb-24 pt-36">
        <Eyebrow>{event}</Eyebrow>
        <h1 className="text-display text-[clamp(44px,7vw,88px)]">{state === "done" ? fill(text(f.thanksTitle)) || "Bedankt!" : r.feedback.title}</h1>
        <p className="max-w-[560px] whitespace-pre-line text-lg leading-[1.6] text-cream/70">{state === "done" ? fill(text(f.thanksBody)) : r.feedback.answered}</p>
        <Link href="/events" className={pillGhost}>
          {r.feedback.toEvents} <ArrowIcon />
        </Link>
      </main>
    );
  }

  return (
    <main className="container-x pb-24 pt-32 sm:pt-40">
      <form onSubmit={(e) => void submit(e)} className="mx-auto flex max-w-[720px] flex-col gap-8" noValidate>
        <div className="flex flex-col gap-4">
          <Eyebrow>{r.feedback.title}</Eyebrow>
          <h1 className="text-display text-[clamp(36px,6vw,72px)] [overflow-wrap:anywhere]">{fill(text(f.title)) || event}</h1>
          {text(f.intro) && <p className="max-w-[60ch] whitespace-pre-line text-lg leading-[1.6] text-cream/70">{fill(text(f.intro))}</p>}
        </div>

        {info.form.questions.map((q) => (
          <fieldset key={q.id} className="flex flex-col gap-3 rounded-[24px] bg-white/[0.03] p-5 ring-1 ring-white/8 sm:p-6">
            <legend className="sr-only">{text(q.label)}</legend>
            <p className="text-[18px] font-bold leading-snug" aria-hidden>
              {text(q.label)} <span className="text-[13px] font-semibold text-cream/45">({q.required ? r.feedback.required : r.feedback.optional})</span>
            </p>
            {q.type === "rating" && (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={text(q.label)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={answers[q.id] === n}
                    aria-label={r.feedback.rating(n)}
                    onClick={() => set(q.id, n)}
                    className={`${chip(answers[q.id] === n)} min-w-13 justify-center tabular-nums`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
            {q.type === "text" && (
              <textarea rows={4} value={(answers[q.id] as string) ?? ""} onChange={(e) => set(q.id, e.target.value)} className={field} aria-label={text(q.label)} maxLength={1500} />
            )}
            {q.type === "choice" && (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={text(q.label)}>
                {q.options.map((o) => (
                  <button key={o.id} type="button" role="radio" aria-checked={answers[q.id] === o.id} onClick={() => set(q.id, o.id)} className={chip(answers[q.id] === o.id)}>
                    {text(o.label)}
                  </button>
                ))}
              </div>
            )}
            {q.type === "multi" && (
              <div className="flex flex-wrap gap-2" role="group" aria-label={text(q.label)}>
                {q.options.map((o) => {
                  const list = (answers[q.id] as string[] | undefined) ?? [];
                  const on = list.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set(q.id, on ? list.filter((x) => x !== o.id) : [...list, o.id])}
                      className={chip(on)}
                    >
                      {text(o.label)}
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>
        ))}

        {error && (
          <p role="alert" className="rounded-2xl bg-yellow/10 px-5 py-4 font-bold text-yellow ring-1 ring-yellow/30">
            {error}
          </p>
        )}
        <div>
          <button type="submit" disabled={state === "sending"} className={`${pillBlue} disabled:opacity-60`}>
            {state === "sending" ? r.feedback.sending : text(f.submit) || "Versturen"} <ArrowIcon />
          </button>
        </div>
      </form>
    </main>
  );
}
