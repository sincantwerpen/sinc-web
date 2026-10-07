# SINC website: to-do

## Now
- [x] Fix animations that stutter and stray boxes that show up while scrolling
- [x] Connect the newsletter form to Flexmail (code done; keys still to be set in Vercel)

## Mobile
- [ ] Test the whole site on real phones: iPhone (Safari) and Android (Chrome), portrait and landscape.
      Check animations (SINC morph, 3D carousel, stacking cards), menu, forms, text sizes and that nothing
      sticks out sideways or overlaps

## Content
- [ ] Het team page: new team photos + names, roles, departments, email, LinkedIn
- [ ] Replace the 2023–24 team photos on the Contact page
- [ ] Privacy statement: one address (Van Schoonbekestraat vs Ijzerenpoortkaai), remove
      WordPress / Google Analytics mentions, Belgian privacy authority (GBA) instead of the Dutch one
- [ ] Student-ondernemers: page doesn't exist (also not on the old site); remove the links or build it
- [ ] Check the "SINC in cijfers" numbers and the "18 studenten" text for this year

## Forms
- [ ] Contact form: choose where messages go (e.g. Formspree) and set `CONTACT_WEBHOOK_URL` in Vercel
- [ ] Newsletter: set `FLEXMAIL_ACCOUNT_ID`, `FLEXMAIL_TOKEN` and `FLEXMAIL_OPT_IN_FORM_ID` in Vercel
      (see README), then send one test sign-up

## Going live (Vercel)
- [ ] Import `sincantwerpen/sinc-web` in Vercel and check the test URL (`*.vercel.app`)
- [ ] Set environment variables in Vercel (forms)
- [ ] Redirects from old WordPress URLs (`/sinc-hub`, `/het-team/...`, old event URLs) so links on
      Google and social media keep working
- [ ] Back up the WordPress site, then point `sincantwerpen.be` to Vercel (Cloudflare DNS)
- [ ] After going live: test every page and both forms, submit the sitemap to Google
- [ ] Vercel plan: Hobby is for non-commercial use; check whether SINC needs Pro

## Nice to have
- [ ] sitemap.xml and robots.txt
- [ ] Favicon / app icon with the SINC logo (currently the Next.js default)
- [ ] Social share image per page
- [ ] Remove unused images from `public/images`
