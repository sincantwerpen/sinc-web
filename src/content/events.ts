// Past events, copied from the old sincantwerpen.be event pages (listing + detail pages).
// Newest first. Add new events at the top; set `upcoming: true` to show one under "Aankomende events"
// (with a "Registreer" button that opens `ticketUrl`).

export type Pillar = "Inspireren" | "Informeren" | "Connecteren" | "Activeren";

export type SincEvent = {
  slug: string;
  title: string;
  subtitle: string;
  topics: string;
  pillar: Pillar;
  image: string;
  excerpt: string;
  date?: string;
  /** Start and end time, e.g. "19:00 – 22:30". */
  time?: string;
  /** Exact start (ISO, with timezone) for the countdown. */
  startsAt?: string;
  doors?: string;
  location?: string;
  price?: string;
  ticketUrl?: string;
  /**
   * Paragraphs of the "Over dit event" text. Line breaks inside a paragraph are kept.
   * A paragraph starting with "## " is a subheading; lines starting with "- " become a list.
   */
  body: string[];
  upcoming?: boolean;
};

export const sincEvents: SincEvent[] = [
  {
    slug: "sinc-soiree-the-art-of-failing",
    title: "SINC Soirée",
    subtitle: "The Art of Failing",
    topics: "Keynotes, Netwerken",
    pillar: "Inspireren",
    image: "/images/events/soiree-art-of-failing.png",
    excerpt: "Ontdek waarom de grootste blunders vaak de beste springplanken zijn, en hoe je een epische fail omzet in je grootste win.",
    date: "20 oktober",
    time: "19:00 – 22:30",
    startsAt: "2026-10-20T19:00:00+02:00",
    location: "The Beacon",
    price: "GRATIS",
    ticketUrl: "https://luma.com/tlfx5h4j",
    upcoming: true,
    body: [
      "Je doet je boekhouding zelf en voelt je een echte ondernemer, tot je een boete krijgt die hoger is dan je volledige omzet. Of je steekt je hele budget in een campagne die niets oplevert. Iedereen ‘up-fuckt’ het wel eens, en dat is net het deel van ondernemen dat je zelden te horen krijgt.",
      "Op 20 oktober ontdek je waarom de grootste blunders vaak de beste springplanken zijn. Want slagen doe je niet zonder falen.",
      "## De sprekers",
      "Daria Kenis – PlotTwist\nAvontuurlijke groepsreizen voor jongeren. Daria vertelt hoe fouten en onverwachte bochten haar brachten tot waar ze nu staat.",
      "Laurens Van den Bleeken & Simon Verhoeven – Yuno\nDe all-in-one app om op Erasmus te connecteren, plannen en je nieuwe stad te ontdekken. Zij vertellen hoe je omgaat met keuzes die achteraf totaal verkeerd bleken.",
      "## 🤝 Netwerken maar!",
      "Na de keynotes: open bar en echte gesprekken, zonder stijve smalltalk. Misschien ga je wel naar huis met net dat inzicht om je eigen fail om te zetten in een win.",
      "Iedereen faalt. Alleen de besten leren eruit.",
    ],
  },
  {
    slug: "seef-the-best-for-last",
    title: "SEEF the best for last",
    subtitle: "Sinc BBQ",
    topics: "BBQ",
    pillar: "Connecteren",
    image: "/images/events/past/seef.png",
    excerpt: "We sluiten het jaar af met een gezellige BBQ bij Antwerpse Brouw Compagnie: SEEF",
    date: "13 mei",
    doors: "18:00",
    location: "Antwerpse Brouw Compagnie",
    price: "€32",
    ticketUrl: "https://luma.com/i2bjyrr2",
    body: [
      "We sluiten het jaar af met een gezellige BBQ bij Antwerpse Brouw Compagnie: SEEF🍻",
      "Op 13 mei nodigen we je uit voor een ontspannen avond met goed eten, fijne vibes en natuurlijk de bekende SEEF-biertjes. De setting? Een sfeervolle brouwerij waar we zelf aan de slag gaan met de Ofyr, aangevuld met een buffet.",
      "Vergeet niet om je in te schrijven via de link!",
      "Geen SINC bestuur? Dan kan je aansluiten via een BBQ-ticket (€32). Je kiest tussen twee pakketten:",
      "## BBQ Classic\n- Saté\n- BBQ worst\n- Kippenboutjes\n- Spare ribs\n- Assortiment verse groenten\n- Aardappelsla & pastasalade\n- Broodjes & boter\n- Diverse verse sauzen",
      "## BBQ Veggie\n- Groentenpapillot\n- Berloumi kaas\n- Veggie burger\n- Assortiment verse groenten\n- Aardappelsla & pastasalade\n- Broodjes & boter\n- Diverse verse sauzen",
      "🕕 Start: 18u — 23u",
      "De perfecte afsluiter van het jaar: lekker eten, mensen leren kennen en gewoon genieten van de avond.",
      "PS: schrijf je op tijd in, plaatsen zijn beperkt 😉"
    ]
  },
  {
    slug: "sinc-101-career-edition",
    title: "Sinc 101: Career Edition",
    subtitle: "Learn practical skills in three workshops with real scenarios.",
    topics: "Career Edition",
    pillar: "Activeren",
    image: "/images/events/past/sinc-101.png",
    excerpt: "Launching SINC 101: a hands-on evening of workshops.",
    date: "29 april",
    doors: "18:30",
    location: "Humgy Central",
    price: "GRATIS",
    ticketUrl: "https://luma.com/cd1eb6le",
    body: [
      "This is where it starts.",
      "Launching SINC 101: a hands-on evening of workshops where you walk in and actually do things.\nEvery edition, a different topic.",
      "This year: Career Edition. 👔",
      "One evening.",
      "Three workshops.",
      "Skills that usually live in different courses, different years, different places, bundled into one night.\nThere’s a whole layer of stuff nobody really prepares you for. And most people figure it out the hard way.",
      "But you don’t have to.\nLearn these practical skills in three workshops with real scenarios.\nSo when the real world hits, you’re already ready.",
      "## 🗓️ The Game Plan",
      "18:30 | Welcome\nDrop in & meet the partners at their stands.",
      "19:00 | Keynote\nAn opening keynote on pushing yourself further than your diploma takes you.",
      "19:30 | Break\nShort breather before moving to the workshops.",
      "19:40 | Toastmasters\nMasterclass on public speaking and presenting yourself with confidence.",
      "20:10 | Interview Survival\nThe top 5 most common mistakes, body language and what to actually wear. (with HAYS).",
      "20:40 | Starting a business\nComplete the business model and solve the scenario.",
      "21:10 | Interactive Networking\nGet your certificate by completing challenges at the partner stands & connect.",
      "## Oh, and another thing:",
      "CV & Career Check:\nGet your CV reviewed by pros from Moore, Xerius or the City of Antwerp. Walk out knowing exactly what to fix.",
      "Certificate:\nComplete challenges at each partner stand during networking. Collect every stamp, earn your certificate.",
      "Ask it till you learn it:\nNo “Fake it till you make it” here. Everyone who has it figured out now was once exactly where you are.",
      "First edition. Make sure you’re part of it.\nSpots are limited. Grab yours now."
    ]
  },
  {
    slug: "sinc-soiree-2",
    title: "SINC soiree",
    subtitle: "Twee topsprekers",
    topics: "Marketing, Networking",
    pillar: "Inspireren",
    image: "/images/events/past/sinc-soiree.png",
    excerpt: "We hebben iets gepland dat je niet wilt missen: een avond in The Beacon Antwerp.",
    date: "11 maart",
    doors: "18:30",
    location: "The Beacon",
    price: "GRATIS",
    ticketUrl: "https://luma.com/vperav1h",
    body: [
      "𝐒𝐈𝐍𝐂 𝐒𝐨𝐢𝐫é𝐞 𝐨𝐩 11 𝐦𝐚𝐚𝐫𝐭\nWe hebben iets gepland dat je niet wilt missen: een avond in The Beacon Antwerp met 𝐭𝐰𝐞𝐞 𝐭𝐨𝐩𝐬𝐩𝐫𝐞𝐤𝐞𝐫𝐬, 𝐤𝐨𝐫𝐭𝐞 𝐤𝐞𝐲𝐧𝐨𝐭𝐞𝐬 𝐞𝐧 𝐞𝐞𝐧 𝐧𝐞𝐭𝐰𝐞𝐫𝐤𝐦𝐨𝐦𝐞𝐧𝐭 met mede-studenten en ondernemers.",
      "Jasper Dockx\n➡️Ondernemer en docent.",
      "● oprichter Twaalfde Man\n● co-founder van NUBI\n● start Students @ The Office.",
      "Iemand die niet wacht op kansen, maar ze zelf bouwt",
      "Philip De Cleen\n➡️ Chief Marketing Evangelist en marketingdocent.",
      "● 30+ jaar ervaring in marketing & communicatie van o.a. Lay’s, Dixan, Neckermann…\n● auteur ‘Marketing. Wake up and go with the flow’\n● deelnemer van De Mol.",
      "Je blijft aan zijn lippen hangen terwijl hij spreekt.",
      "🕒 18:30 – ±22:00\n📍 The Beacon",
      "En ja, er zijn falafel wraps voor wie vast. 😉 (en voor de rest ook natuurlijk)",
      "Zet het alvast in je agenda. Dit wordt een echte SINC Soirée"
    ]
  },
  {
    slug: "kerst-soiree",
    title: "Kerst soirée",
    subtitle: "Leer spreken met impact en netwerken zonder cringe",
    topics: "Pitch, Network",
    pillar: "Connecteren",
    image: "/images/events/past/kerst-soiree.png",
    excerpt: "Tijdens deze wintereditie van de SINC soirée dompelen we je onder in een leerrijke avond",
    date: "17 December",
    doors: "18:30",
    location: "The Beacon",
    price: "GRATIS",
    ticketUrl: "https://luma.com/pumq2wyz",
    body: [
      "Leer spreken met impact en netwerken zonder cringe small talk op de kerst soirée!",
      "Tijdens deze wintereditie van de SINC soirée dompelen we je onder in een leerrijke én gezellige avond. Verwacht geen formeel event, maar een warme sfeer waarin je bijleert, connecteert en vooral een fijne tijd hebt.",
      "We starten met How to Pitch, waar je ontdekt hoe je jouw idee of onderneming helder en overtuigend kan overbrengen. Daarna volgt How to Network, zodat je alle cringe small talk kan skippen en meteen echte, waardevolle gesprekken kan voeren.",
      "Na de theorie is het tijd om alles in de praktijk te brengen. Tijdens het netwerkmoment kan je meteen oefenen in een ontspannen setting, met warme hapjes en heerlijke drankjes die de cozy sfeer compleet maken.",
      "## Programma",
      "18u30 – 19u00 | Deuren open\n19u00 – 19u30 | How to pitch\n19u30 – 19u40 | Pauze\n19u40 – 19u55 | How to network\n19u55 – 22u30 | Netwerken",
      "Opgelet: het programma is onder voorbehoud en kan nog wijzigen."
    ]
  },
  {
    slug: "arts-inc",
    title: "ARTS.inc",
    subtitle: "Where creativity meets entertainment & AI",
    topics: "Creativity, design, AI",
    pillar: "Inspireren",
    image: "/images/events/past/arts-inc-2025.png",
    excerpt: "Creativity is for everyone. This year, we’re diving into the world of entertainment and AI",
    date: "2 december",
    doors: "18:30",
    location: "Zuiderpershuis",
    price: "GRATIS",
    ticketUrl: "https://luma.com/mzbswxur",
    body: [
      "Creativity is for everyone.\nThis year, we’re diving into the world of entertainment and AI; where tech meets imagination.",
      "Expect mind-blowing talks from Loop Earplugs, Sabam, Pitch Law, and Creative Director @ Tomorrowland.",
      "Belgium = pure music energy.",
      "That’s why we’re bringing you closer to the people behind the beats, visuals, and stories that shape our creative scene.",
      "Meet pros, gain fresh insights, and get inspired to start creating yourself.",
      "Wanna share your creativity with the world but not sure where to begin?",
      "At ARTS.inc, you’ll vibe with other creators, dreamers, and entrepreneurs.",
      "Be there. Feel the energy. Get inspired.\n🎟️ Grab your ticket, meet tomorrow’s creative minds & let the ideas flow.",
      "Because one thing’s for sure : the future of creativity starts right here.",
      "## Program",
      "Option 1 – Main Stage\n18:30 – 19:00 Doors open\n19:10 – 19:35 Keynote 1\n19:40 – 19:50 Break\n19:50 – 20:15 Keynote 2\n20:15 – 20:40 Keynote by Pitch Law\n20:40 – 21:05 Closing Keynote by Tomorrowland\nNETWORKING TIME",
      "Option 2 – Workshop Stage\n18:30 – 19:00 Doors open\n19:10 – 19:35 Keynote 1\n19:40 – 19:50 Break\n19:50 – 20:15 Sabam Workshop\n20:15 – 20:40 Workshop 2\n20:40 – 21:05 Joint closing keynote by Tomorrowland\nNETWORKING TIME"
    ]
  },
  {
    slug: "go-with-the-coach-jouw-kans-om-alles-te-vragen",
    title: "Go With The Coach",
    subtitle: "Jouw kans om alles te vragen",
    topics: "Finance, Sales, Marketing, Beginner essentials, Legal lift, Founder stories",
    pillar: "Informeren",
    image: "/images/events/past/gwtc-2025.png",
    excerpt: "Student met een plan, een bedrijf of gewoon goesting om te starten? Dan is dit event voor jou.",
    date: "22 Oktober",
    doors: "18:00",
    location: "Humgy",
    price: "GRATIS",
    ticketUrl: "https://luma.com/8demzcgv",
    body: [
      "Student met een plan, een eigen idee of gewoon goesting om te starten?\nOp Go With The Coach krijg je de unieke kans om al je vragen te stellen aan echte experten.",
      "## 🗣️ There’s no Planet B",
      "Beide tracks starten met een knallende keynote van Tibbe Verschaffel (Planet B) over duurzaam ondernemen. Tibbe geeft je een WONDRlijke dosis inspiratie in minder dan een uur.",
      "## 👩‍💻 Coaching Track",
      "Heb je al concrete vragen of een eigen onderneming? Dan is dit jouw plek!",
      "✔ 3 interactieve coachingrondes waarin jij je eigen topics kiest (Finance, Sales, Marketing, Beginner Essentials of Legal Lift)",
      "✔ Mogelijkheid tot persoonlijke 1-op-1 gesprekken met coaches",
      "✔ Netwerken met andere ambitieuze studenten",
      "➡️ Kies dit ticket als je concrete antwoorden wil en echt stappen wil zetten.",
      "⏳ Schrijf je nu in. Plaatsen zijn beperkt!",
      "## 💡Inspire Track",
      "Nog geen concrete vragen, maar wel nieuwsgierig naar ondernemen?\nGeen probleem! Dit programma laat je proeven van de ondernemerswereld en geeft je een flinke dosis inspiratie.",
      "✔ Founders stories van Sondra Voorbraak (ARBOR Antwerpen)",
      "✔ Founders stories van Yindra Cox (Oaas)",
      "✔ Inspirerende verhalen, concrete tips en inzichten om je eigen pad te ontdekken",
      "➡️ Kies dit ticket als je wil leren, ontdekken en je eerste stappen wil zetten in ondernemen.",
      "⏳ Schrijf je nu in. Plaatsen zijn beperkt!"
    ]
  },
  {
    slug: "go-with-the-coach-2-2",
    title: "Go With The Coach 2",
    subtitle: "Coaching naar succes!",
    topics: "Sales, Financiën, Diensten voor starters, Marketing, Tools voor starters",
    pillar: "Connecteren",
    image: "/images/events/past/gwtc-2.png",
    excerpt: "Op maandag 28 april organiseren we een gloednieuwe Go With The Coach!",
    date: "28 april",
    doors: "18u",
    location: "Humgy Central",
    price: "GRATIS",
    ticketUrl: "https://app.ordolio.com/events/go-with-the-coach-2-609366/",
    body: [
      "🚀 Go With The Coach is terug met een tweede editie dit academiejaar! 🚀",
      "Op maandag 28 april organiseren we een gloednieuwe Go With The Coach! Dit keer pakken we het net iets anders aan. 💥",
      "In plaats van 1-op-1 sessies word je in kleine groepen ingedeeld, waarin je kunt leren van twee ervaren coaches per thema. Je kiest vooraf drie thema’s die jou het meest interesseren en volgt drie interactieve coachingsessies van 30 minuten. 🤩",
      "Topics zijn:\n💼 Sales\n💰 Financiën\n📑 Diensten voor starters\n📊 Marketing\n🌱 Tools voor starters"
    ]
  },
  {
    slug: "galabal",
    title: "Galabal - SINC 10 jaar",
    subtitle: "Dit jaar vieren we een bijzondere mijlpaal!",
    topics: "Galabal 🪩",
    pillar: "Activeren",
    image: "/images/events/past/galabal.png",
    excerpt: "SINC bestaat 10 jaar! Dat gaan we natuurlijk niet ongemerkt voorbij laten gaan! 🎉",
    date: "9 mei",
    doors: "20u",
    location: "Dunden - De Serre",
    price: "€ 8,00",
    ticketUrl: "https://app.ordolio.com/events/galabal-sinc-10-jaar-912474/",
    body: [
      "Dit jaar vieren we een bijzondere mijlpaal: SINC bestaat 10 jaar! 🎉 Dat gaan we natuurlijk niet ongemerkt voorbij laten gaan! We vieren dit jubileum met een groot feest en iedereen is welkom om samen met ons te feesten!",
      "Bereid je voor op een avond vol verrassingen, gezelligheid en een tikkeltje magie. Samen maken we er een moment van om nooit te vergeten!",
      "## LINE-UP\n🪩 00h15 – 03h00 DJ NITSUJ | Verwacht geen standaard set, maar een avond vol herkenbare tunes in een creatief jasje.",
      "Trek je mooiste outfit aan en kom met ons proosten op 10 fantastische jaren! Tot dan!🥂",
      "📅 9 mei 2025\n📍 Dunden, Lange Gasthuisstraat 29-31, 2000 Antwerpen"
    ]
  },
  {
    slug: "arts-inc-create-new-dimensions",
    title: "ARTS.inc",
    subtitle: "Create New Dimensions",
    topics: "Content Creation and AI",
    pillar: "Inspireren",
    image: "/images/events/past/arts-inc-2024.png",
    excerpt: "This year, ARTS.inc will focus on the dimensions of Content Creation and AI.",
    date: "19 november",
    doors: "18u30",
    location: "Ampere Antwerp",
    price: "GRATIS",
    ticketUrl: "https://app.ordolio.com/events/artsinc-24-create-new-dimensions-814007/",
    body: [
      "This year, ARTS.inc will expand its journey and create new dimensions. We will discover the dimension of Content Creation and AI on the 19th of November at Ampere Antwerp.⚡",
      "Together with like-minded students we will create new portals and learn more about Content Creation and AI! 💥",
      "## ⏰ TIMETABLE ⏰",
      "18:30 – open doors",
      "19:00 – introduction",
      "19:10 – keynote Club Gewoon- Aster Breekweg",
      "19:35 – keynote Pitch Law – Matthieu Mortelé",
      "20:00 – PAUZE",
      "20:15 – keynote Lean Mean Learning Machine – Dries De Geyter",
      "20:40 – King of Hearts – Matthieu De Winter",
      "21:10 – closing words",
      "21:15 – networking",
      "📅 Date: November 19",
      "📍 Location: Ampere, Antwerp",
      "Get ready for an evening full of inspiration and new insights. Connect with fellow students as we expand our horizons. 🚀",
      "Together, we Create New Dimensions! Are you ready?"
    ]
  },
  {
    slug: "go-with-the-coach-2024",
    title: "Go With The Coach",
    subtitle: "Speeddate met jouw toekomst! 🚀",
    topics: "📱 Tools voor starters 🧑🏻‍💻 Services voor starters 📊 Finance 🖼️ Marketing 💻 Tools 📈 Sales 🤖 AI",
    pillar: "Informeren",
    image: "/images/events/past/gwtc-2024.png",
    excerpt: "Go With The Coach oftewel “GWTC” is een evenement waar jij als student op “speeddate” gaat.",
    date: "22 oktober",
    doors: "18u",
    location: "Cresco",
    price: "GRATIS",
    ticketUrl: "https://app.ordolio.com/events/go-with-the-coach-speeddate-met-jouw-toekomst-396831/",
    body: [
      "Ben jij een student met een ondernemersidee of al gestart met je eigen bedrijf? Of droom je ervan om ooit te ondernemen, maar weet je niet waar te beginnen? Op 22 oktober 2024 organiseert SINC opnieuw Go With The Coach waar jij de kans krijgt om tijdens meerdere 1-op-1 coaching sessies waardevol advies te ontvangen van ervaren professionals!",
      "Wat kun je verwachten\n🕕 18u00 – Deuren open\n🕕 18u30 – Start event met een inspirerende keynote spreker\n💡 Coaching sessies: Ga in gesprek met meerdere experts uit verschillende vakgebieden tijdens 1-op-1 sessies van 15 minuten. Stel al je vragen en ontvang praktische tips en inzichten.\n⚡ Netwerkmoment: Na de coaching sessies kun je jouw netwerk uitbreiden tijdens het afsluitende netwerkmoment.",
      "De coaching sessies zijn ingedeeld volgens de volgende thema’s:\n📱 Tools voor starters\n🧑🏻‍💻 Services voor starters\n📊 Finance\n🖼️ Marketing\n💻 Tools\n📈 Sales\n🤖 AI",
      "Bij je inschrijving geef je aan rond welke thema’s jij graag advies wilt ontvangen, en wij zorgen ervoor dat je wordt gekoppeld aan de juiste coaches.",
      "Dit is dé avond om jouw ondernemersskills te laten groeien! Zet de datum alvast in je agenda en bereid je voor om jouw ondernemersdromen waar te maken!💡"
    ]
  }
];

export const pillars: Pillar[] = ["Inspireren", "Informeren", "Connecteren", "Activeren"];

export const upcomingEvents = sincEvents.filter((e) => e.upcoming);
export const pastEvents = sincEvents.filter((e) => !e.upcoming);
export const getEvent = (slug: string) => sincEvents.find((e) => e.slug === slug);
