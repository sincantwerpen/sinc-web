// Newsletter sign-ups → Flexmail (https://api.flexmail.eu/documentation/), shared by the newsletter
// form (/api/newsletter) and the "keep me posted" box of the event registration (/api/register).
// Settings: see app/api/newsletter/route.ts.

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FLEXMAIL = process.env.FLEXMAIL_API_URL ?? "https://api.flexmail.eu";

export type Signup = { email: string; firstName: string; lastName: string; language: "nl" | "en" };

export async function toFlexmail(s: Signup): Promise<Response | null> {
  const account = process.env.FLEXMAIL_ACCOUNT_ID;
  const token = process.env.FLEXMAIL_TOKEN;
  const optInForm = process.env.FLEXMAIL_OPT_IN_FORM_ID;
  const source = process.env.FLEXMAIL_SOURCE_ID;
  if (!account || !token || (!optInForm && !source)) return null;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${account}:${token}`).toString("base64")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const contact = { email: s.email, first_name: s.firstName, name: s.lastName, language: s.language };

  const res = optInForm
    ? await fetch(`${FLEXMAIL}/opt-ins`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ...contact, opt_in_form_id: Number(optInForm) }),
      })
    : await fetch(`${FLEXMAIL}/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ...contact, source: Number(source) }),
      });

  // 409 = this address is already subscribed or already has a pending confirmation: fine for the visitor.
  if (res.ok || res.status === 409) return Response.json({ ok: true });
  console.error("Flexmail sign-up failed", res.status, await res.text().catch(() => ""));
  return Response.json({ error: "upstream_failed" }, { status: 502 });
}

export async function toWebhook(s: Signup): Promise<Response | null> {
  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) return null;
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...s, source: "sincantwerpen.be" }),
  });
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "upstream_failed" }, { status: 502 });
}


/** Sign-up from anywhere on the site; true when it reached Flexmail (or the webhook). */
export async function subscribe(s: Signup): Promise<boolean> {
  try {
    const res = (await toFlexmail(s)) ?? (await toWebhook(s));
    return !!res && res.ok;
  } catch (err) {
    console.error("Newsletter sign-up error", err);
    return false;
  }
}
