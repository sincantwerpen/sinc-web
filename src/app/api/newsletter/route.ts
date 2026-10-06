// Newsletter sign-ups. Not connected to a mailing tool yet: set NEWSLETTER_WEBHOOK_URL
// (e.g. a Mailchimp/Brevo/Flexmail integration or a Zapier/Make webhook) to forward sign-ups.
// Without it the endpoint answers 503, so visitors see the error message instead of a false "thanks".

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  if (!EMAIL.test(email) || !firstName || !lastName || email.length > 254) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ error: "newsletter_not_configured" }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, firstName, lastName, source: "sincantwerpen.be" }),
  });
  if (!res.ok) return Response.json({ error: "upstream_failed" }, { status: 502 });

  return Response.json({ ok: true });
}
