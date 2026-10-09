// Contact form messages. Not connected yet: set CONTACT_WEBHOOK_URL (e.g. a Zapier/Make webhook that
// emails info@sincantwerpen.be, or a Formspree endpoint) to deliver messages.
// Without it the endpoint answers 503 and the form tells visitors to mail info@sincantwerpen.be instead.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  // Honeypot: real visitors never fill in the hidden "website" field.
  if (String(body.website ?? "")) return Response.json({ ok: true });
  if (!name || !EMAIL.test(email) || !message || name.length > 200 || message.length > 5000) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ error: "contact_not_configured" }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, message, _subject: `Contactformulier: ${name}`, source: "sincantwerpen.be/contact" }),
  });
  if (!res.ok) return Response.json({ error: "upstream_failed" }, { status: 502 });

  return Response.json({ ok: true });
}
