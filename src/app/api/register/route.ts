import { dashboardConfigured, dashboardFetch } from "@/lib/dashboard/client";
import { EMAIL, subscribe } from "@/lib/newsletter";

// A registration from the event page (the "Inschrijven" panel), passed on to the SINC dashboard,
// which decides: in right away, or on the waiting list when full (no approval step). The answer
// carries the ticket page token, so the panel shows "Je bent erbij!" with the ticket at once.
// The newsletter box is separate and unticked: only when ticked does the address go to Flexmail.

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  if (!dashboardConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  // Honeypot: real visitors never fill in the hidden "website" field.
  if (str(body.website)) return Response.json({ ok: true, status: "bevestigd" });

  const lang = body.lang === "en" ? "en" : "nl";
  const firstName = str(body.firstName, 100);
  const lastName = str(body.lastName, 100);
  const email = str(body.email, 254).toLowerCase();
  if (!firstName || !lastName || !EMAIL.test(email)) return Response.json({ error: "invalid_fields" }, { status: 400 });

  const answers: Record<string, string> = {};
  if (body.customAnswers && typeof body.customAnswers === "object") {
    for (const [k, v] of Object.entries(body.customAnswers as Record<string, unknown>)) {
      if (/^[\w-]{1,60}$/.test(k)) answers[k] = str(v, 1000);
    }
  }

  let res: Response;
  try {
    res = await dashboardFetch("/api/public/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        eventId: str(body.eventId, 120),
        firstName,
        lastName,
        email,
        phone: str(body.phone, 60),
        school: str(body.school),
        fieldOfStudy: str(body.fieldOfStudy),
        studyYear: str(body.studyYear, 40),
        entrepreneurStage: str(body.entrepreneurStage, 40),
        ticketTypeId: str(body.ticketTypeId, 60),
        dietary: str(body.dietary),
        comment: str(body.comment, 1000),
        confirmed: body.confirmed === true,
        customAnswers: answers,
        lang: lang.toUpperCase(),
      }),
    });
  } catch (err) {
    console.error("Registration: dashboard not reachable", err);
    return Response.json({ error: "unreachable" }, { status: 502 });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // 409: already registered with this address, or full without a waiting list.
    return Response.json({ error: res.status === 409 ? "conflict" : "refused", message: data.error ?? null }, { status: res.status === 409 ? 409 : 400 });
  }
  if (body.newsletter === true) await subscribe({ email, firstName, lastName, language: lang });
  return Response.json({ ok: true, status: data.status, ticketToken: data.ticketToken, paymentToken: data.paymentToken ?? null });
}
