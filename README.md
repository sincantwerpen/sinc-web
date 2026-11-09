# SINC Antwerpen website

The new sincantwerpen.be, built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion and Lenis.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Checks before every push: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Dashboard (events, registration, team, partners, photos, contact, feedback)

Since phase 3 of the SINC dashboard (dashboard.sincantwerpen.be, repo `sincantwerpen/sinc-dashboard`), the
dashboard is the single source for the events, the team page, the partners (since phase 5) and the site
photos; this site only shows them. The connection is server to server with a shared key:

| Variable | What |
|---|---|
| `DASHBOARD_URL` | The dashboard's address: `https://dashboard.sincantwerpen.be` (locally `http://localhost:3100`) |
| `DASHBOARD_API_KEY` | The same key as `DASHBOARD_API_KEY` in the dashboard |

How it works (code in `src/lib/dashboard/`):

- Every page asks the dashboard for its data once (`GET /api/public/site`), cached for at most a minute
  under the tag `dashboard`. After a change the dashboard calls `POST /api/revalidate` (with the key), so
  the site shows it within seconds.
- The dashboard's data is laid over `src/content` (`withLive` in `src/lib/dashboard/live.ts`): an event
  from the dashboard replaces the site's own event with the same address (slug), the rest of the archive
  stays; the homepage shows the events the team picks under Homepage-events; the team page comes from the
  dashboard; the partners page (three groups: main, featured, others) and the footer's partner logos come
  from the dashboard's Website > Partners, with each logo's width/height ratio for `PartnerLogo` (the page
  titles stay in `src/content`); a replaced photo replaces every use of that path (`/images/...`).
- **When the dashboard is not configured or not reachable, the site shows exactly its own content from
  `src/content`, as before.** Nothing else breaks; only registering on this site needs the dashboard.
- Events from the dashboard get a Luma-like page (`src/components/events/LumaEvent.tsx`): poster, date,
  location with a map link, and a registration card. "Inschrijven" opens the registration panel on the page
  (`RegisterPanel.tsx`); afterwards "Je bent erbij!" with the QR ticket and calendar links. Per event the
  team can keep a Luma link instead (test semester): the button then opens Luma.
- `/ticket/<token>` (the link in the ticket mail): the ticket with QR and PDF, change details, cancel.
  `/betalen/<token>` (the link in the payment mail): IBAN, amount, structured reference, optional proof of
  payment (max 4 MB, the Vercel limit). Both are passed on to the dashboard via `src/app/api/`.
- `/feedback/<token>` (the button in the feedback mail after an event, or an event's open link): the
  questions the team set in the dashboard, in NL or EN; the answers go to the dashboard via
  `src/app/api/feedback/`.
- Images from the dashboard (posters, portraits, photos, partner logos) are loaded through `/api/media/...`.
- The newsletter box when registering is separate and unticked; only when ticked does the address go
  to Flexmail.

Run both locally: in the dashboard folder `npm run dev` (port 3100) with `DASHBOARD_API_KEY=local-dev-key`
and `WEBSITE_URL=http://localhost:3000` in its `.env.local`; here `.env.local` with
`DASHBOARD_URL=http://localhost:3100` and the same key (see `.env.example`), then `npm run dev`.

## Where things live

| What | Where |
|---|---|
| All text, links and images on the homepage | `src/content/site.ts` |
| Brand colours, font (Helvetica) and shared styles | `src/app/globals.css` |
| Page sections (hero, pillars, events, community, footer…) | `src/components/` |
| Homepage layout | `src/app/page.tsx` |
| Images (logos, team, partners) | `public/images/` |
| Newsletter sign-up endpoint | `src/app/api/newsletter/route.ts` |

To change text, edit `src/content/site.ts`; you don't need to touch the components.

## Events

New events are made and published in the SINC dashboard (see above). The site's own list in
`src/content/nl/events.ts` (title, poster, date, location, price, ticket link and the full "Over dit event"
text, newest first) is the archive, and what the site shows when the dashboard is off. Each event
automatically gets its own page at `/events/<slug>`.

- **New event:** copy an existing entry to the top of the list, change the fields, put the poster in
  `public/images/events/past/` and set `upcoming: true`. It then appears under "Aankomende events" with a
  "Claim je ticket" button.
- **Event is over:** remove `upcoming: true`. It moves to "Afgelopen events" and the ticket button disappears.
- In the description, a paragraph starting with `## ` becomes a subheading, lines starting with `- ` become
  a list, and lines starting with a time (`18:30 | Welcome`) get a blue timestamp.

## Other pages

Text for Over SINC, Community, Ecosysteem, Partners, Contact and Privacy lives in `src/content/pages.ts`.
The partners themselves come from the dashboard when it is connected (see above); the list in
`src/content/*/pages.ts` is what the site shows without it.
The pages themselves are in `src/app/<page>/page.tsx`.

## Contact form

The form posts to `/api/contact`, which sends the message to the dashboard (page Contact there), with
the visitor's language. Without the dashboard, `CONTACT_WEBHOOK_URL` (e.g. a Formspree endpoint) is used if
set; with neither, the form tells visitors to mail info@sincantwerpen.be directly.

## Newsletter (Flexmail)

The sign-up form posts to `/api/newsletter`, which sends the sign-up to Flexmail. Set these
environment variables in Vercel (Settings → Environment Variables):

| Variable | Where to find it |
|---|---|
| `FLEXMAIL_ACCOUNT_ID` | Flexmail → Settings → API |
| `FLEXMAIL_TOKEN` | Flexmail → Settings → API → Personal access tokens |
| `FLEXMAIL_OPT_IN_FORM_ID` | id of an active opt-in form (Flexmail → opt-in forms) |

With an opt-in form, Flexmail emails a confirmation link and only adds the person after they click it
(double opt-in, recommended for GDPR). Alternatively set `FLEXMAIL_SOURCE_ID` instead of the opt-in form
to add people straight away. `NEWSLETTER_WEBHOOK_URL` still works as a fallback for other tools.
Until one of these is set, the form shows the error message instead of pretending the sign-up worked.
