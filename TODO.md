# SINC website: to-do

Website work only. Going live (Vercel, DNS, back-up) is in `GO-LIVE.md`.

## Forms
- [ ] Push the small contact-form fix that is ready locally (`src/app/api/contact/route.ts`: Formspree
      `Accept` header + subject "Contactformulier: [naam]"). Do this right after the keys below are in Vercel,
      so the same deployment activates them
- [ ] Newsletter: add `FLEXMAIL_ACCOUNT_ID`, `FLEXMAIL_TOKEN` and `FLEXMAIL_OPT_IN_FORM_ID` in Vercel
      (Production + Preview). Test: sign up with your own address → confirmation mail from Flexmail →
      confirm → contact shows up in Flexmail
- [ ] Contact form: create a Formspree form for info@sincantwerpen.be, add the address as
      `CONTACT_WEBHOOK_URL` in Vercel. Test: send a message, confirm the form in the first Formspree mail,
      check that "Reply" answers the sender
- [ ] Check the error messages of both forms once (e.g. with a wrong key): the visitor should see the
      info@ email address as a fallback

## Feedback to check
- [ ] Logo feedback ("sinc logo is clickable, maar er staat een lijn van tekst selecteren"): not 100% clear.
      Fixed what it most likely means (logo now shows a hand cursor, can't be selected or dragged, grows a
      little on hover). Ask your friend to check again; if he means something else, get a screenshot
- [ ] Ask your friend to re-test on his phone: "Join onze community" on the homepage should now open the
      Community page at the top, the menu shouldn't slide sideways, and the pillar photos should show faces
- [ ] Photo crops on phones: the pillar photos have focus points now (`focus` in `src/components/Pillars.tsx`).
      If other photos still cut off heads on a phone, note which page/photo and adjust the same way

## Content
- [ ] Het team: email + LinkedIn per person in `src/content/team.ts` (`email`, `linkedin` fields; the
      buttons are already there, dimmed until filled in)
- [ ] Het team: Tugce's photo (portrait, roughly 3:4, put it in `public/images/team-2026/`) and surname
- [ ] Privacy statement (`privacyPage` in `src/content/pages.ts`):
      - one address (now both Van Schoonbekestraat 55 and Ijzerenpoortkaai 3; the footer uses Ijzerenpoortkaai)
      - remove WordPress and Google Analytics (no longer used)
      - Belgian authority (Gegevensbeschermingsautoriteit, GBA) instead of the Dutch Autoriteit Persoonsgegevens
      - mention the processors: Vercel (hosting), Flexmail (newsletter), Formspree (contact form), Luma (tickets)
      - "profiel aanmaken op deze website" is no longer possible: remove that line
- [ ] "SINC in cijfers" on Over SINC (99+ alumni, 60+ events, 4000+ community members): check this year's numbers
- [ ] Student-ondernemers: the card on Community and Over SINC links to `/student-ondernemers`, which doesn't
      exist (404). Remove the card or change the link (e.g. to the "in de kijker" block or an external list)
- [ ] Community: two "Coming soon..." blocks ("Student ondernemers in de kijker" and "Wil jij ook vermeld
      worden?"). Fill them in or hide them until there is content
- [ ] Contact: the two question cards still use older community photos (partners, ecosystem); swap for
      new photos if available
- [ ] Footer address and VAT number: check they're correct (Ijzerenpoortkaai 3, BE0563.354.818)
- [ ] Read through all text once more for typos and outdated info (2023–24 references, old names)

## Events
- [ ] After 20 October: set `upcoming: false` for the SINC Soirée in `src/content/events.ts`, add a short
      recap text and photos. Otherwise the event stays under "Aankomende events" and the round badge on the
      homepage keeps showing 20 OKT
- [ ] Add the next event as soon as it's on Luma (title, date, `startsAt`, time, location, price, `ticketUrl`,
      poster in `public/images/events/`). The homepage badge and event card update automatically
- [ ] Past events: check every event page has a picture and the dates are right

## Technical
- [ ] `sitemap.xml` and `robots.txt` (Next.js `src/app/sitemap.ts` and `src/app/robots.ts`) so Google can
      find every page and event
- [ ] Redirects in `next.config.ts` from old WordPress addresses: `/sinc-hub` (+ everything under it),
      `/student-ondernemers`, `/eco-systeem`, and old event URLs if they differ from the new slugs
- [ ] Custom 404 page in SINC style (now the default Next.js "This page could not be found")
- [ ] Social share image per page (Open Graph): now every page uses `/images/community.jpg`. At least a
      separate one for Events, Het team and each event (its poster)
- [ ] Page descriptions (meta description) per page: check they're filled in and not too long
- [ ] Remove unused images from `public/images` (smaller repo):
      `community-group.jpg`, `community-group-large.jpg`, the folders `over/` and `team/` (old team),
      `.DS_Store` files
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
