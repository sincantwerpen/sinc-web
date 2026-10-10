# SINC website: to-do

**Progress: 26/44 done** (59%)

Website work only. Going live (Vercel, DNS, back-up) is in `GO-LIVE.md`.

## Forms
- [ ] Contact form: create a Formspree form for info@sincantwerpen.be and add its address as
      `CONTACT_WEBHOOK_URL` in Vercel (step-by-step in the chat). Test: send a message, confirm the form
      in the first Formspree mail, check that "Reply" answers the sender and that the language
      ("Nederlands"/"English") shows in the mail
- [ ] Flexmail: set the opt-in form's page after confirmation to
      `https://website26-27.vercel.app/nieuwsbrief/bevestigd` (after going live:
      `https://sincantwerpen.be/nieuwsbrief/bevestigd`)
- [ ] Newsletter in English: sign up once on `/en` and check which language Flexmail's confirmation mail
      is in (an English confirmation may need its own English opt-in form in Flexmail)

## Content
- [ ] Privacy statement (`privacyPage` in `src/content/nl/pages.ts` and `src/content/en/pages.ts`):
      - one address (now both Van Schoonbekestraat 55 and Ijzerenpoortkaai 3; the footer uses Ijzerenpoortkaai)
      - remove WordPress and Google Analytics (no longer used)
      - Belgian authority (Gegevensbeschermingsautoriteit, GBA) instead of the Dutch Autoriteit Persoonsgegevens
      - mention the processors: Vercel (hosting), Flexmail (newsletter), Formspree (contact form), Luma (tickets)
      - "profiel aanmaken op deze website" is no longer possible: remove that line
- [ ] "SINC in cijfers" on Over SINC (99+ alumni, 60+ events, 4000+ community members): check this year's numbers
- [ ] Community: two "Coming soon..." blocks ("Student ondernemers in de kijker" and "Wil jij ook vermeld
      worden?"). Fill them in or hide them until there is content
- [ ] Contact: the two question cards still use older community photos (partners, ecosystem); swap for
      new photos if available
- [ ] Footer address and VAT number: check they're correct (Ijzerenpoortkaai 3, BE0563.354.818)
- [ ] English version: have someone read through the English pages once (`/en`)
- [ ] Read through all text once more for typos and outdated info (2023–24 references, old names)

## Events
- [ ] After 20 October: set `upcoming: false` for the SINC Soirée in `src/content/nl/events.ts` (English
      follows automatically), add a short recap text and photos. Otherwise it stays under "Aankomende events"
- [ ] Past events: check every event page has a picture and the dates are right

## Testing
- [ ] Test on real phones via the Vercel URL: iPhone (Safari) and Android (Chrome), portrait and landscape.
      Check the SINC morph, 3D photo carousel on Events, stacking cards, team page fly-ins, menu, round event
      badge + popup, NL/EN switch, both forms
- [ ] Friend's feedback: ask him to re-test (logo click, "Join onze community" opening at the top, menu not
      sliding sideways, pillar photos showing faces). If photos elsewhere still cut off heads on a phone,
      note which ones (focus points are set in `src/components/Pillars.tsx`)

## Technical
- [ ] Old event URLs from WordPress: if they differ from the new `/events/<slug>` addresses, add redirects
      in `next.config.ts` (check a few old links from Instagram/LinkedIn after going live)
- [ ] Check loading speed with PageSpeed Insights (mobile) on the Vercel URL and fix anything red
- [ ] Optional: Vercel Web Analytics (privacy-friendly, no cookie banner needed) to see visitor numbers
- [ ] Optional: separate social share image for Events and Het team (event pages already use their poster)

## How to keep it up to date (no to-do)
- New event: add it at the top of `src/content/nl/events.ts` (title, date, `startsAt`, time, location,
  price, `ticketUrl`, poster in `public/images/events/`) and its English text in `src/content/en/events.ts`.
  The homepage badge and event cards update automatically
- New text always goes in both `src/content/nl/` and `src/content/en/`; TypeScript gives an error when the
  English version is missing something

## Done
- [x] Newsletter connected to Flexmail and tested (sign-up → confirmation mail → contact in Flexmail)
- [x] Newsletter thank-you page: `/nieuwsbrief/bevestigd` (EN: `/en/nieuwsbrief/bevestigd`)
- [x] Facebook link in the footer checked
- [x] Het team page with the 2026–2027 team, departments and roles
- [x] Team: photo, email (checked against the SINC mailing list) and LinkedIn for all 19 members
- [x] Whole site in English under /en (NL | EN switch in the navbar), Dutch stays on the normal addresses
- [x] Next event Go With The Coach (12 November) added; the round badge switches to the next event by itself
- [x] Homepage: new first sentence "Bij SINC willen we studenten ondernemender door het leven laten gaan."
- [x] Smoother animations on phones: work per frame while scrolling down 40–65% on every page
- [x] Mobile pass at 320–768 px: no sideways scrolling, no words too wide, tap targets ≥ 40px, 16px inputs,
      menu scrolls on short screens, pillar cards fit on iPhone SE, event badge out of the hero and footer
- [x] Smoother animations, no stray boxes while scrolling
- [x] Ecosysteem page removed (useful text moved to Community; `/ecosysteem` redirects there)
- [x] Partners page logo-only, partner footer hidden on /partners
- [x] Over SINC: 19 students, new photos and group photo
- [x] Contact: new team photos, dead "Word jij deel van het volgende SINC-team?" card removed
- [x] Round "next event" badge on the homepage
- [x] Favicon, app icon and iPhone home-screen icon (white "S" from the logo on a blue tile)
- [x] Navbar: "Home" link, current page highlighted, NL/EN switch
- [x] Footer partner logos: room above/below so the blue hover outline isn't cut off
- [x] New page always opens at the top (back button still returns to where you were)
- [x] No more words split with a hyphen ("hoog-te") anywhere; long words fit by scaling the heading
- [x] Footer on phones: no Menu column, tighter spacing; phone menu can't be dragged sideways
- [x] Team cards, event countdown, stats and long headings fit on the smallest phones (320 px)
- [x] Bold SVG arrows on all buttons and links, centred with the text
- [x] SINC-style 404 page in both languages
- [x] Bug scan: dead Student-ondernemers link fixed, sitemap.xml + robots.txt, redirects for old WordPress
      addresses (/sinc-hub, /student-ondernemers, /eco-systeem), meta descriptions, language links, event
      share previews, phone menu (Escape, no stuck page), form languages, contact form error handling,
      "reduce motion" respected, images 28 MB → 8 MB, unused images removed
