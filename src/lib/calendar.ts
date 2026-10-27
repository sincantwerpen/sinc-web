// "Zet in je agenda": a Google Calendar link and an .ics file (Apple Calendar, Outlook) for an event.

export type CalendarEvent = { id: string; title: string; startsAt: string; endsAt: string | null; location: string; url: string; details?: string };

/** 2026-11-12T17:30:00.000Z -> 20261112T173000Z */
const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Without an end time: two hours. */
const endOf = (e: CalendarEvent) => e.endsAt ?? new Date(Date.parse(e.startsAt) + 2 * 3600_000).toISOString();

export function googleCalendarUrl(e: CalendarEvent): string {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(e.startsAt)}/${stamp(endOf(e))}`,
    location: e.location,
    details: [e.details, e.url].filter(Boolean).join("\n\n"),
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** RFC 5545 lines are folded at 75 octets. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest) > 75) {
    let n = 75;
    while (Buffer.byteLength(rest.slice(0, n)) > 75) n--;
    out.push(rest.slice(0, n));
    rest = ` ${rest.slice(n)}`;
  }
  out.push(rest);
  return out.join("\r\n");
}

export function icsFile(e: CalendarEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SINC Antwerpen//sincantwerpen.be//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}@sincantwerpen.be`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.startsAt)}`,
    `DTEND:${stamp(endOf(e))}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.location)}`,
    `URL:${e.url}`,
    `DESCRIPTION:${esc([e.details, e.url].filter(Boolean).join("\n\n"))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(fold).join("\r\n")}\r\n`;
}
