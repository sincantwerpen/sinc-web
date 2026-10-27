// Contact form messages go to the SINC dashboard (Contact page there), replacing Formspree.
// Without the dashboard (DASHBOARD_URL + DASHBOARD_API_KEY), CONTACT_WEBHOOK_URL is used if set
// (e.g. a Formspree endpoint). With neither, or when delivery fails, the endpoint answers an error
// and the form tells visitors to mail info@sincantwerpen.be instead.

import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";

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

  if (dashboardConfigured()) {
    try {
      const res = await dashboardFetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: crypto.randomUUID(), at: new Date().toISOString(), name, email, message, lang: body.language === "en" ? "EN" : "NL" }),
      });
      if (res.ok) return Response.json({ ok: true });
      console.error("Contact form: dashboard answered", res.status);
    } catch (err) {
      console.error("Contact form: dashboard not reachable", err);
    }
    if (!process.env.CONTACT_WEBHOOK_URL) return Response.json({ error: "upstream_failed" }, { status: 502 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ error: "contact_not_configured" }, { status: 503 });
  }

  // So SINC knows in which language to answer.
  const language = body.language === "en" ? "English" : "Nederlands";
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message, language, _subject: `Contactformulier: ${name}`, source: "sincantwerpen.be/contact" }),
    });
    if (!res.ok) {
      console.error("Contact form delivery failed", res.status, await res.text().catch(() => ""));
      return Response.json({ error: "upstream_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form delivery error", err);
    return Response.json({ error: "upstream_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
