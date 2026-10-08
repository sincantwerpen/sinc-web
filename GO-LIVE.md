# sincantwerpen.be live zetten: stappenplan

Doel: de nieuwe site (Next.js, GitHub `sincantwerpen/sinc-web`, gehost op Vercel) vervangt de WordPress-site
op `sincantwerpen.be`. Gepland in 2 dagen.

Wie: **Can** (met Claude), **SINC-beheer** (wie toegang heeft tot het SINC GitHub/Vercel-account, Cloudflare,
de hosting/cPanel en Flexmail).

---

## Dag 1: alles klaarzetten (de oude site blijft gewoon online)

### Stap 1: laatste code-aanpassingen en pushen (Can + Claude)
- [ ] Alle lokale wijzigingen committen en pushen naar `sincantwerpen/sinc-web` (main).
- [ ] Favicon / app-icoon met het SINC-logo (nu staat er nog het Next.js-icoon).
- [ ] `sitemap.xml` en `robots.txt` toevoegen (voor Google).
- [ ] Doorverwijzingen van oude WordPress-adressen: `/sinc-hub` (+ alles eronder), `/student-ondernemers`,
      `/eco-systeem` → juiste nieuwe pagina. (`/ecosysteem` is al gedaan. Event-, team-, partner-, contact-,
      community-, over-sinc- en privacy-adressen blijven hetzelfde.)
- [ ] Links naar "Student-ondernemers" weghalen of laten doorverwijzen (die pagina bestaat niet).

### Stap 2: project in Vercel (SINC-beheer)
1. Log in op **vercel.com** met het SINC-account.
2. **Add New… → Project → Import Git Repository**. Geef Vercel toegang tot het GitHub-account `sincantwerpen`
   als daarom gevraagd wordt (alleen de repository `sinc-web` is genoeg).
3. Kies `sinc-web`. Framework wordt automatisch herkend als **Next.js**. Niets aanpassen.
4. Klik **Deploy**. Na 1–2 minuten krijg je een test-adres, bv. `sinc-web.vercel.app`.
5. Vanaf nu zet elke push naar `main` de site automatisch opnieuw online.

### Stap 3: formulieren aansluiten (SINC-beheer)
In Vercel: **Project → Settings → Environment Variables** (kies "Production" én "Preview").

**Nieuwsbrief (Flexmail)**: in Flexmail onder *Settings → API*:
| Naam | Waarde |
|---|---|
| `FLEXMAIL_ACCOUNT_ID` | het account-ID |
| `FLEXMAIL_TOKEN` | een nieuw *personal access token* (maak er één aan voor de website) |
| `FLEXMAIL_OPT_IN_FORM_ID` | het ID van een actief opt-in formulier (bevestigingsmail = dubbele opt-in, AVG-proof) |

**Contactformulier**: maak een gratis formulier op **formspree.io** met als ontvanger info@sincantwerpen.be
(gratis plan: 50 berichten/maand). Formspree geeft een adres zoals `https://formspree.io/f/abcd1234`.
| Naam | Waarde |
|---|---|
| `CONTACT_WEBHOOK_URL` | het Formspree-adres |

Daarna: **Deployments → … → Redeploy** zodat de nieuwe instellingen actief worden.

### Stap 4: alles nakijken op het test-adres (iedereen)
Op `sinc-web.vercel.app`, op een laptop **én** op een iPhone (Safari) en Android (Chrome):
- [ ] Elke pagina in het menu + footer-links + 2–3 eventpagina's openen.
- [ ] Startpagina: SINC-animatie, ronde event-knop (openen, event aanklikken).
- [ ] Nieuwsbrief: inschrijven met je eigen adres → bevestigingsmail van Flexmail komt aan → bevestigen →
      contact staat in Flexmail.
- [ ] Contactformulier: testbericht → komt aan op info@sincantwerpen.be.
- [ ] Teksten nalezen door het bestuur (zie "inhoud" hieronder).

### Stap 5: inhoud die vóór livegang klaar moet zijn (bestuur)
- [ ] **Privacyverklaring**: één adres (nu staan Van Schoonbekestraat én Ijzerenpoortkaai erin), WordPress en
      Google Analytics schrappen (worden niet meer gebruikt), Belgische Gegevensbeschermingsautoriteit (GBA)
      i.p.v. de Nederlandse, Formspree en Vercel vermelden als verwerkers.
- [ ] Team: LinkedIn + e-mail per persoon, foto + achternaam van Tugce (mag ook na livegang).
- [ ] Contactpagina: nieuwe foto's i.p.v. het team van 2023–24 (mag ook na livegang).
- [ ] Vercel-plan kiezen: *Hobby* (gratis) is voor niet-commercieel gebruik; als SINC twijfelt → *Pro*.

---

## Dag 2: overschakelen

### Stap 6: back-up van de oude site (SINC-beheer, ±15 min)
1. Log in op **cPanel** van de huidige hosting.
2. **Backup / JetBackup → Full backup** maken en downloaden (bestanden + database).
3. Laat de hosting nog minstens een maand actief: zo kan je altijd terug.

### Stap 7: noteer de huidige DNS-instellingen (SINC-beheer, 5 min)
1. Log in op **Cloudflare** → domein `sincantwerpen.be` → **DNS → Records**.
2. Maak een screenshot van alle records. Belangrijk: de **A**-record van `sincantwerpen.be` (`@`) en de
   record van `www`. Dit is je terugweg als er iets misgaat.
3. **Raak de MX-records (Google-mail) en TXT-records niet aan**, anders werkt de e-mail niet meer.

### Stap 8: domein koppelen aan Vercel (SINC-beheer, ±20 min)
1. Vercel → Project → **Settings → Domains → Add** → `sincantwerpen.be`. Kies om `www.sincantwerpen.be`
   door te sturen naar `sincantwerpen.be` (of omgekeerd, zolang het consequent is).
2. Vercel toont welke DNS-records nodig zijn. Meestal:
   - `@` → **A**-record → `76.76.21.21`
   - `www` → **CNAME** → `cname.vercel-dns.com`
   Gebruik altijd exact wat Vercel op dat scherm toont.
3. In Cloudflare: pas de bestaande `@` A-record en `www`-record aan naar die waarden (oude waarden
   vervangen, niet erbij zetten). Zet **Proxy status op "DNS only"** (grijs wolkje), zoals Vercel aanraadt.
4. Terug in Vercel: binnen enkele minuten staan beide domeinen op **Valid Configuration** en maakt Vercel
   zelf het SSL-certificaat (https) aan.

### Stap 9: testen op het echte adres (iedereen, ±30 min)
- [ ] `https://sincantwerpen.be` en `https://www.sincantwerpen.be` openen (ook op 4G, niet enkel wifi).
- [ ] Hangslotje (https) aanwezig.
- [ ] Oude links testen: `/sinc-hub`, `/ecosysteem`, een oude eventlink → komen op de juiste pagina.
- [ ] Nieuwsbrief en contactformulier nog één keer testen.
- [ ] E-mail naar/van info@sincantwerpen.be werkt nog.

### Als er iets misgaat
Zet in Cloudflare de A-record en `www`-record terug naar de waarden van de screenshot (stap 7).
Binnen enkele minuten is de oude WordPress-site terug.

---

## Na livegang (eerste week)
- [ ] **Google Search Console**: eigendom van `sincantwerpen.be` bevestigen (via Cloudflare DNS) en
      `https://sincantwerpen.be/sitemap.xml` indienen.
- [ ] Links op Instagram, LinkedIn, Linktree, Luma nakijken.
- [ ] Na ±1 maand zonder problemen: WordPress-hosting opzeggen (back-up bewaren!).
- [ ] Nieuwe events toevoegen: zie README → "Events".
