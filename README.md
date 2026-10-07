# SINC Antwerpen website

The new sincantwerpen.be, built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion and Lenis.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

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

Every event (title, poster, date, location, price, ticket link and the full "Over dit event" text) lives in
`src/content/events.ts`, newest first. Each event automatically gets its own page at `/events/<slug>`.

- **New event:** copy an existing entry to the top of the list, change the fields, put the poster in
  `public/images/events/past/` and set `upcoming: true`. It then appears under "Aankomende events" with a
  "Claim je ticket" button.
- **Event is over:** remove `upcoming: true`. It moves to "Afgelopen events" and the ticket button disappears.
- In the description, a paragraph starting with `## ` becomes a subheading, lines starting with `- ` become
  a list, and lines starting with a time (`18:30 | Welcome`) get a blue timestamp.

## Other pages

Text for Over SINC, Community, Ecosysteem, Partners, Contact and Privacy lives in `src/content/pages.ts`.
The pages themselves are in `src/app/<page>/page.tsx`.

## Contact form

The form posts to `/api/contact`. Set `CONTACT_WEBHOOK_URL` (for example a Zapier/Make webhook that
emails info@sincantwerpen.be, or a Formspree endpoint) to deliver messages. Until then the form tells
visitors to mail info@sincantwerpen.be directly.

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
