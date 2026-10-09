# SINC website: to-do

Website work only. Going live (Vercel, DNS, back-up) is in `GO-LIVE.md`.

## Forms
- [ ] Newsletter: add `FLEXMAIL_ACCOUNT_ID`, `FLEXMAIL_TOKEN` and `FLEXMAIL_OPT_IN_FORM_ID` in Vercel
      (Production + Preview). Test: sign up with your own address → confirmation mail from Flexmail →
      confirm → contact shows up in Flexmail
- [ ] Contact form: create a Formspree form for info@sincantwerpen.be, add the address as
      `CONTACT_WEBHOOK_URL` in Vercel. Test: send a message, confirm the form in the first Formspree mail,
      check that "Reply" answers the sender
- [ ] Newsletter in English: sign-ups from the English site are sent to Flexmail with language "en".
      Check in Flexmail that this works and which language the confirmation mail is in (an English
      confirmation may need its own English opt-in form/template in Flexmail)
- [ ] Contact form: messages now include the visitor's language ("Nederlands"/"English"), so you know in
      which language to reply. Check it shows up in the Formspree mail

## Check by hand
- [ ] Facebook link in the footer (facebook.com/sincantwerpen): Facebook blocks automatic checks, so open it
      once yourself to make sure the page still exists

## Feedback to check
- [ ] Logo feedback ("sinc logo is clickable, maar er staat een lijn van tekst selecteren"): not 100% clear.
      Fixed what it most likely means (logo now shows a hand cursor, can't be selected or dragged, grows a
      little on hover). Ask your friend to check again; if he means something else, get a screenshot
- [ ] Ask your friend to re-test on his phone: "Join onze community" on the homepage should now open the
      Community page at the top, the menu shouldn't slide sideways, and the pillar photos should show faces
- [ ] Photo crops on phones: the pillar photos have focus points now (`focus` in `src/components/Pillars.tsx`).
      If other photos still cut off heads on a phone, note which page/photo and adjust the same way

## Content
- [ ] English version: have someone read through the English pages once (`/en`). All text lives in
      `src/content/en/` (same structure as `src/content/nl/`). New text always goes in both languages;
      TypeScript gives an error when the English version is missing something
- [ ] New events: add the English text in `src/content/en/events.ts` (by slug). Until then the English
      site shows the Dutch text for that event
- [ ] Het team: email + LinkedIn per person in `src/content/nl/team.ts` (`email`, `linkedin` fields, only needed there; the
      buttons are already there, dimmed until filled in)
- [ ] Het team: Tugce's photo (portrait, roughly 3:4, put it in `public/images/team-2026/`) and surname
- [ ] Privacy statement (`privacyPage` in `src/content/nl/pages.ts`, and the English
      version in `src/content/en/pages.ts`):
      - one address (now both Van Schoonbekestraat 55 and Ijzerenpoortkaai 3; the footer uses Ijzerenpoortkaai)
      - remove WordPress and Google Analytics (no longer used)
      - Belgian authority (Gegevensbeschermingsautoriteit, GBA) instead of the Dutch Autoriteit Persoonsgegevens
      - mention the processors: Vercel (hosting), Flexmail (newsletter), Formspree (contact form), Luma (tickets)
      - "profiel aanmaken op deze website" is no longer possible: remove that line
- [ ] "SINC in cijfers" on Over SINC (99+ alumni, 60+ events, 4000+ community members): check this year's numbers
- [ ] Community: two "Coming soon..." blocks ("Student ondernemers in de kijker" and "Wil jij ook vermeld
      worden?"). Fill them in or hide them until there is content. The "Student-ondernemers" cards on
      Community and Over SINC now point to the first block
- [ ] Contact: the two question cards still use older community photos (partners, ecosystem); swap for
      new photos if available
- [ ] Footer address and VAT number: check they're correct (Ijzerenpoortkaai 3, BE0563.354.818)
- [ ] Read through all text once more for typos and outdated info (2023–24 references, old names)

## Events
- [ ] After 20 October: set `upcoming: false` for the SINC Soirée in `src/content/nl/events.ts` (English follows automatically), add a short
      recap text and photos. Otherwise the event stays under "Aankomende events" and the round badge on the
      homepage keeps showing 20 OKT
- [ ] Add the next event as soon as it's on Luma (title, date, `startsAt`, time, location, price, `ticketUrl`,
      poster in `public/images/events/`). The homepage badge and event card update automatically
- [ ] Past events: check every event page has a picture and the dates are right

## Technical
- [ ] Old event URLs from WordPress: if they differ from the new `/events/<slug>` addresses, add redirects
      in `next.config.ts` (check a few old links from Instagram/LinkedIn after going live)
- [ ] Social share image per page (Open Graph): event pages use their poster; other pages use
      `/images/community.jpg`. Optional: a separate one for Events and Het team
- [ ] Optional: Vercel Web Analytics (privacy-friendly, no cookie banner needed) to see visitor numbers
- [ ] Check loading speed with PageSpeed Insights (mobile) on the Vercel URL and fix anything red

## Mobile
- [x] Mobile pass in the browser at 320 / 360 / 375 / 390 / 430 / 768 px: no sideways scrolling, no words too wide
      for the screen, tap targets ≥ 40px, 16px form inputs (no iOS zoom), menu scrolls on short screens,
      pillar cards fit on iPhone SE, event badge stays out of the hero and footer on phones
- [ ] Test on real phones via the Vercel URL: iPhone (Safari) and Android (Chrome), portrait and landscape.
      Check the SINC morph, 3D photo carousel on Events, stacking cards, team page fly-ins, menu, round event
      badge + popup, both forms

## Done
- [x] Smoother animations, no stray boxes while scrolling
- [x] Newsletter code connected to Flexmail (keys still needed, see Forms)
- [x] Het team page with the 2026–2027 team, departments and roles
- [x] Ecosysteem page removed (useful text moved to Community; `/ecosysteem` redirects there)
- [x] Partners page logo-only, partner footer hidden on /partners
- [x] Over SINC: 19 students, new photos and group photo
- [x] Contact: new team photos, dead "Word jij deel van het volgende SINC-team?" card removed
- [x] Round "next event" badge on the homepage
- [x] Favicon, app icon and iPhone home-screen icon (white "S" from the logo on a blue tile)
- [x] Navbar: "Home" link, current page highlighted (blue pill on desktop, blue + dot in the phone menu)
- [x] Footer partner logos: room above/below so the blue hover outline isn't cut off
- [x] New page always opens at the top (back button still returns to where you were)
- [x] No more words split with a hyphen ("hoog-te") anywhere; long words fit by scaling the heading on small screens
- [x] Footer on phones: no Menu column (the hamburger menu has the same links), tighter spacing
- [x] Phone menu can no longer be dragged sideways
- [x] Team cards, event countdown, stats and long headings fit on the smallest phones (320 px)
- [x] Whole site in English under /en (NL | EN switch in the navbar), Dutch stays on the normal addresses
- [x] Bold SVG arrows on all buttons and links, centred with the text
- [x] SINC-style 404 page in both languages
- [x] Bug scan: dead Student-ondernemers link fixed, sitemap.xml + robots.txt, redirects for old WordPress
      addresses (/sinc-hub, /student-ondernemers, /eco-systeem), meta descriptions shortened, homepage
      language links, event share previews, phone menu (Escape, no stuck page), newsletter/contact language,
      contact form error handling, "reduce motion" respected, images 28 MB → 8 MB, unused images removed
