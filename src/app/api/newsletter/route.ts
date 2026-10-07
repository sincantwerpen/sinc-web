// Newsletter sign-ups → Flexmail (https://api.flexmail.eu/documentation/).
//
// Set these environment variables (Vercel → Settings → Environment Variables):
//   FLEXMAIL_ACCOUNT_ID       Flexmail account id (Settings > API)
//   FLEXMAIL_TOKEN            personal access token (Settings > API > Personal access tokens)
//   FLEXMAIL_OPT_IN_FORM_ID   id of an active opt-in form → double opt-in: Flexmail emails a
//                             confirmation link and only adds the contact once it is clicked (recommended)
// or, instead of the opt-in form:
//   FLEXMAIL_SOURCE_ID        id of a contact source → the contact is added straight away
//
// Without Flexmail settings, NEWSLETTER_WEBHOOK_URL (Zapier/Make/...) is used if set.
// With nothing configured the endpoint answers 503 so visitors never get a false "thanks".

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FLEXMAIL = process.env.FLEXMAIL_API_URL ?? "https://api.flexmail.eu";

type Signup = { email: string; firstName: string; lastName: string };

async function toFlexmail(s: Signup): Promise<Response | null> {
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
  const contact = { email: s.email, first_name: s.firstName, name: s.lastName, language: "nl" };

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

async function toWebhook(s: Signup): Promise<Response | null> {
  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) return null;
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...s, source: "sincantwerpen.be" }),
  });
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "upstream_failed" }, { status: 502 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const signup: Signup = {
    email: String(body.email ?? "").trim().toLowerCase(),
    firstName: String(body.firstName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
  };
  // Honeypot: real visitors never fill in the hidden "website" field.
  if (String(body.website ?? "")) return Response.json({ ok: true });
  if (
    !EMAIL.test(signup.email) ||
    signup.email.length > 254 ||
    !signup.firstName ||
    !signup.lastName ||
    signup.firstName.length > 100 ||
    signup.lastName.length > 100
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  try {
    return (
      (await toFlexmail(signup)) ??
      (await toWebhook(signup)) ??
      Response.json({ error: "newsletter_not_configured" }, { status: 503 })
    );
  } catch (err) {
    console.error("Newsletter sign-up error", err);
    return Response.json({ error: "upstream_failed" }, { status: 502 });
  }
}
