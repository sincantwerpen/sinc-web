// Copy for the inner pages, taken word for word from the current sincantwerpen.be.
// Change text here, not in the components.

export type LinkItem = { label: string; href: string };

const pillarImg = (n: string) => `/images/pillars/${n}.webp`;

/** Shared blocks used on both "Over SINC" and "Community". */
export const network = {
  title: "Een hecht netwerk van ondernemingsgezinden",
  lead: "Haal je kracht uit je netwerk!",
  cards: [
    {
      title: "Student-ondernemers",
      text: "Ben jij benieuwd wie jou voorging? Antwerpen bevat al meer dan 1.000 student-ondernemers die we hier in de kijker zetten.",
      image: "/images/community/student-ondernemers.webp",
      cta: { label: "Ontdek", href: "/student-ondernemers" },
    },
    {
      title: "Onze partners",
      text: "Onze partners bieden verschillende diensten aan om jou verder te helpen. Leer ze hier kennen!",
      image: "/images/community/partners.webp",
      cta: { label: "Ontdek", href: "/partners" },
    },
  ],
};

export const linkedinCommunity = {
  title: "Deel je inzichten, stel vragen, ontdek mogelijke samenwerking...",
  text: "Onze community is actief op LinkedIn waar op een interactieve manier inzichten worden gedeeld, vragen worden beantwoord en leuke connecties worden gemaakt.",
  cta: { label: "Join onze LinkedIn community", href: "https://www.linkedin.com/groups/12727546/" },
  gallery: [1, 2, 3, 4].map((n) => `/images/community/gallery-${n}.webp`),
};

export const overSinc = {
  eyebrow: "Over SINC",
  title: "De studenten-organisatie voor entrepreneurial minded studenten",
  lead: "Ons team van 19 gemotiveerde studenten werken het hele jaar samen om jullie te inspireren, informeren, connecteren en activeren rond ondernemerschap.",
  cta: { label: "Word jij deel van ons team?", href: "/contact" },
  heroPhotos: ["julie-vandenryt", "ilian-costa", "safia-el-mamoun", "babatunde-agunloye", "frie-vermeersch"].map(
    (n) => `/images/team-2026/${n}.jpg`,
  ),
  team: {
    title: "19 studenten ondernemen, voor meer ondernemer-schap in Antwerpen.",
    text: "Ons team bestaat uit een diverse groep studenten die zich een jaar lang inzetten voor ondernemerschap in Antwerpen en daarbuiten.",
    cta: { label: "Ontmoet het team", href: "/het-team" },
    image: "/images/team-2026/groepsfoto.jpg",
  },
  statsTitle: "SINC in cijfers",
  stats: [
    { value: 99, suffix: "+", label: "Alumni" },
    { value: 60, suffix: "+", label: "Events georganiseerd" },
    { value: 4000, suffix: "+", label: "Community leden" },
    { value: 100, suffix: "%", label: "Voor en door studenten" },
  ],
  pillars: [
    {
      n: "01",
      title: "Inspireren",
      text: "We inspireren studenten door events te organiseren, inspirerende content te delen en student-ondernemers in de kijker te zetten.",
      image: pillarImg("inspireren"),
      cta: { label: "Volg onze socials", href: "https://linktr.ee/sincantwerpen" },
    },
    {
      n: "02",
      title: "Informeren",
      text: "We informeren studenten over ondernemerschap met interessante talks op events en antwoorden op al hun vragen.",
      image: pillarImg("informeren"),
    },
    {
      n: "03",
      title: "Connecteren",
      text: "We connecteren studenten met andere studenten, ondernemers, onze partners, het ecosysteem in Antwerpen en veel andere inspirerende personen.",
      image: pillarImg("connecteren"),
      cta: { label: "Join onze community", href: "/community" },
    },
    {
      n: "04",
      title: "Activeren",
      text: "We activeren studenten om ondernemender aan te slag te gaan in hun dagelijkse leven en professionele carrière.",
      image: pillarImg("activeren"),
      cta: { label: "Bezoek onze events", href: "/events" },
    },
  ],
};

export const communityPage = {
  eyebrow: "Community",
  title: "De community voor entrepreneurial-minded studenten",
  lead: "Een netwerk is één van de belangrijkste krachten van een ondernemer. Daarom bouwen wij aan een community voor studenten met ondernemingszin, met andere studenten, onze partners en het ecosysteem van Antwerpen.",
  cta: { label: "Join onze community", href: "https://chat.whatsapp.com/LQOWOd6Px2RClnDNv9tEPF?mode=ems_share_c" },
  heroPhotos: [6, 5, 4, 3, 2, 1].map((n) => `/images/community/hero-0${n}.webp`),
  spotlight: {
    title: "Student ondernemers in de kijker",
    text: "Antwerpen bevat al meer dan 1.000 student-ondernemers. Benieuwd wie jou voorging?",
    soon: "Coming soon...",
  },
  // Kept from the former Ecosysteem page.
  antwerp: {
    title: "Studeren & ondernemen? In Antwerpen kan dat zeker en vast.",
    text: "Antwerpen heeft heel wat te bieden aan ondernemende studenten. Als student kan je uiteraard bij je eigen onderwijsinstelling terecht. Maar ook de stad en alle relevante organisaties werken nauw samen om jou en je project te ondersteunen. Je kan ook officieel als student-zelfstandige aan de slag gaan. Op die manier krijg je meer ruimte om ondernemersactiviteiten uit te bouwen, maar kan je toch ten laste van je ouders blijven.",
  },
  featureMe: {
    title: "Wil jij ook als student ondernemer vermeld worden op onze website?",
    soon: "Coming soon...",
  },
};


const MOORE =
  "Bij Moore zijn we er voor ondernemers. Voor elke kmo, voor elk familiebedrijf, groot of klein, en voor de ambitieuze managementteams met een passie voor ondernemerschap. Zij hebben een onstopbare drive om te groeien. En daar houden wij van. Want ondernemers zijn de motor van onze economie. Ondernemerschap zit in ons DNA. We weten hoe ondernemers denken en handelen omdat we zelf ondernemers zijn. We hebben onmisbare expertise opgebouwd, en die willen we delen. We helpen ondernemers in hun dagelijkse bedrijfsvoering. We adviseren en begeleiden hen op sleutelmomenten. Proactief en op maat. Van fiscaal en juridisch advies tot corporate finance, business consulting, innovatie en digitale transformatie. Meedenken, meewerken en meegroeien. Wij zijn ondernemers, net als u.";

export type Partner = {
  name: string;
  logo: string;
  /** true when the logo is dark and needs a light tile */
  lightTile?: boolean;
  text?: string;
  links: LinkItem[];
};

export const partnersPage = {
  eyebrow: "Partners",
  title: "Powered by onze ondernemings-gezinde partners",
  lead: "Een uitgebreid netwerk van partners zorgt ervoor dat wij kunnen doen wat we doen. Ze hebben veel te bieden voor jullie als student-ondernemers of studenten met ondernemingszin. Leer ze hier kennen.",
  cta: { label: "Zelf partner worden?", href: "/contact" },
  heroPhotos: [1, 6, 5, 2, 3, 4].map((n) => `/images/partners/cards/hero-0${n}.webp`),
  main: [
    {
      name: "Moore",
      logo: "/images/partners/cards/moore.png",
      lightTile: true,
      text: MOORE,
      links: [
        { label: "Website", href: "http://www.moore.be" },
        { label: "Social media", href: "https://www.linkedin.com/company/moorebelgium/" },
      ],
    },
    {
      name: "De Cronos Groep",
      logo: "/images/partners/de-cronos-groep.webp",
      links: [
        { label: "Website", href: "https://cronos-groep.be/" },
        { label: "Social media", href: "https://www.linkedin.com/company/cronos/" },
      ],
    },
    {
      name: "Stad Antwerpen",
      logo: "/images/partners/stad-antwerpen.webp",
      links: [
        { label: "Website", href: "https://www.antwerpen.be/ondernemers-en-bedrijven" },
        { label: "Social media", href: "https://www.linkedin.com/showcase/business-in-antwerp/" },
      ],
    },
  ] satisfies Partner[],
  featured: [
    {
      name: "Pitchdrive",
      logo: "/images/partners/cards/pitchdrive.png",
      text: "Pitchdrive is een Belgische VC die ambitieuze tech-startups in Europa en Amerika ondersteunt. We bieden niet alleen kapitaal, maar ook strategisch advies en toegang tot een waardevol netwerk. Met een focus op innovatieve technologieën en een datagedreven aanpak, investeren we in bedrijven die klaar zijn voor impact. We werken als partners samen met ondernemers, bieden mentoring, marktexpertise en de tools die nodig zijn voor duurzame groei en succes.",
      links: [
        {
          label: "Ontdek meer",
          href: "https://pitchdrive.notion.site/Pitchdrive-Startup-Job-Board-9e7c662d71f94423b3b9b2db210bad02?pvs=4",
        },
      ],
    },
    {
      name: "Xerius",
      logo: "/images/partners/xerius.webp",
      text: "Xerius ondersteunt bij de opstart, wijziging en stopzetting van ondernemingen. We regelen de administratie voor startende zelfstandigen en controleren elk document zorgvuldig. Daarnaast berekenen we sociale bijdragen en informeren we proactief over rechten en plichten. Vanuit 12 kantoren helpen we meer dan 240.000 zelfstandigen en 146.000 vennootschappen. Bij elke stap staat Xerius achter jou.",
      links: [{ label: "Ontdek meer", href: "https://www.xerius.be/nl-be" }],
    },
  ] satisfies Partner[],
  others: [
    { name: "The Beacon", logo: "/images/partners/the-beacon.webp", links: [{ label: "Ontdek meer", href: "https://www.thebeacon.eu/" }] },
    { name: "Humgy Cowork", logo: "/images/partners/humgy.webp", links: [{ label: "Ontdek meer", href: "https://www.humgy.com/" }] },
    { name: "Vlajo", logo: "/images/partners/vlajo.webp", links: [{ label: "Ontdek meer", href: "https://www.vlajo.org/" }] },
    { name: "the launch.", logo: "/images/partners/cards/the-launch.png", links: [{ label: "Ontdek meer", href: "https://www.launchcrew.be/" }] },
    { name: "Flexmail", logo: "/images/partners/flexmail.webp", links: [{ label: "Ontdek meer", href: "https://flexmail.be/nl/" }] },
    { name: "StoryChief", logo: "/images/partners/storychief.webp", links: [{ label: "Ontdek meer", href: "https://www.storychief.io/" }] },
    { name: "TakeOffAntwerp_", logo: "/images/partners/takoffantwerp.webp", links: [{ label: "Ontdek meer", href: "https://www.takeoffantwerp.be/" }] },
  ] satisfies Partner[],
  band: {
    title: "Ben jij geïnteresseerd in een samenwerking met SINC?",
    cta: { label: "Neem contact met ons op", href: "/contact" },
  },
};

export const contactPage = {
  eyebrow: "Contact",
  titleLines: ["Heb je vragen?", "Nood aan advies?", "Get in touch!"],
  lead: "Heb jij vragen rond ondernemerschap? Wil je graag zelf deel uitmaken van SINC? Aarzel niet en neem contact op! We beantwoorden zo snel mogelijk al jouw vragen.",
  heroPhotos: [
    "arbina-recica",
    "thibeau-smets",
    "helena-herrera-freire",
    "can-demet",
    "julie-geeraerts",
    "sander-roedig",
    "ben-alp-celik",
  ].map((n) => `/images/team-2026/${n}.jpg`),
  form: {
    name: "Naam",
    email: "Email",
    message: "Message",
    submit: "Verzenden",
    success: "Bedankt! We beantwoorden je vraag zo snel mogelijk.",
    error: "Er ging iets mis. Probeer het opnieuw of mail naar",
  },
  email: "info@sincantwerpen.be",
  questionsTitle: "Heb je een specifieke vraag?",
  questions: [
    {
      title: "Interesse om SINC Partner te worden?",
      image: "/images/community/partners.webp",
      cta: { label: "Contacteer ons", href: "mailto:info@sincantwerpen.be" },
    },
    {
      title: "Heb jij pers-gerelateerde of andere vragen?",
      image: "/images/community/eco-systeem.webp",
      cta: { label: "Contacteer ons", href: "mailto:info@sincantwerpen.be" },
    },
  ],
};

export type PrivacyBlock = {
  type: "h2" | "h3" | "p";
  text?: string;
  href?: string;
  parts?: { text: string; href?: string }[];
};

export const privacyPage = {
  title: "Privacyverklaring",
  blocks: [
  {
    type: "p",
    text: "SINC, Students for Innovation and Co-operation, gevestigd aan Van Schoonbekestraat 55, 2018 Antwerpen, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring."
  },
  {
    type: "p",
    text: "Contactgegevens:"
  },
  {
    type: "p",
    text: "https://sincantwerpen.be",
    href: "https://sincantwerpen.be"
  },
  {
    type: "p",
    text: "Ijzerenpoortkaai 3, 2000 Antwerpen"
  },
  {
    type: "p",
    text: "+32495898715"
  },
  {
    type: "h2",
    text: "Informatie over diensten van SINC"
  },
  {
    type: "p",
    text: "SINC is een Antwerpse studentenvereniging en vzw die zich inzet om ondernemerschap bij studenten te stimuleren. Dit doet SINC door evenementen te organiseren voor studenten. Daarbij wordt er op de website van SINC nuttige informatie verschaft die studenten kan helpen bij het opstarten van een eigen onderneming. Al de gegevens die SINC verzamelt, zijn bestemd voor het verbeteren van de ervaringen van de studenten."
  },
  {
    type: "p",
    text: "De dienstverlening van SINC omvat het organiseren van evenementen en verschaffen van informatie omtrent ondernemen."
  },
  {
    type: "h2",
    text: "Persoonsgegevens die wij verwerken"
  },
  {
    type: "p",
    text: "SINC verwerkt je persoonsgegevens doordat je gebruik maakt van onze website en/of deelneemt aan onze evenementen en/of omdat je deze gegevens zelf aan ons verstrekt."
  },
  {
    type: "p",
    text: "Hieronder vind je een overzicht van de persoonsgegevens die wij verwerken:"
  },
  {
    type: "p",
    text: "– Voor- en achternaam"
  },
  {
    type: "p",
    text: "– E-mailadres"
  },
  {
    type: "p",
    text: "– Studierichting"
  },
  {
    type: "p",
    text: "– Hogeschool of Universiteit waar je studeert"
  },
  {
    type: "p",
    text: "– Huidige ondernemersfase"
  },
  {
    type: "p",
    text: "– Gegevens over jouw activiteiten op onze website"
  },
  {
    type: "p",
    text: "– Internetbrowser en apparaat type"
  },
  {
    type: "p",
    text: "– Overige persoonsgegevens die je actief verstrekt bijvoorbeeld door een profiel op deze website aan te maken, je te registreren voor een evenement van SINC, in correspondentie en tijdens telefonisch contact met een bestuurslid van SINC."
  },
  {
    type: "h3",
    text: "Bijzondere en/of gevoelige persoonsgegevens die wij verwerken"
  },
  {
    type: "p",
    parts: [
      {
        text: "Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als je er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via"
      },
      {
        text: " info@sincantwerpen.be",
        href: "mailto:info@sincantwerpen.be"
      },
      {
        text: ", dan verwijderen wij deze informatie."
      }
    ]
  },
  {
    type: "h3",
    text: "Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken"
  },
  {
    type: "p",
    text: "SINC verwerkt jouw persoonsgegevens voor de volgende doelen:"
  },
  {
    type: "p",
    text: "– Verzenden van onze nieuwsbrief om jou op de hoogte te houden van nieuws en nuttige informatie voor studenten en (student-)ondernemers."
  },
  {
    type: "p",
    text: "– Je te kunnen e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren. Bijvoorbeeld om verdere informatie over een evenement te verschaffen."
  },
  {
    type: "p",
    text: "– Je te informeren over wijzigingen van onze diensten en producten"
  },
  {
    type: "p",
    text: "– Je de mogelijkheid te bieden een account aan te maken"
  },
  {
    type: "p",
    text: "– Om goederen en diensten bij je af te leveren en te verschaffen."
  },
  {
    type: "p",
    text: "– SINC analyseert jouw gedrag op de website om daarmee de website te verbeteren en het aanbod van producten en diensten af te stemmen op jouw voorkeuren."
  },
  {
    type: "h3",
    text: "Geautomatiseerde besluitvorming"
  },
  {
    type: "p",
    text: "SINC neemt niet op basis van geautomatiseerde verwerkingen besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die worden genomen door computerprogramma’s of -systemen, zonder dat daar een mens (bijvoorbeeld een medewerker van SINC) tussen zit. SINC gebruikt de volgende computerprogramma’s of -systemen:"
  },
  {
    type: "p",
    text: "• WordPress en Flexmail:"
  },
  {
    type: "p",
    text: "De website van SINC (www.sincantwerpen.be) is gebouwd met behulp van WordPress. Op basis van jouw activiteit op de website van SINC, kan WordPress, in samenwerking met Flexmail, automatisch e-mails versturen naar jouw e-mailadres. Zo krijgen studenten met een pril ondernemingsidee, andere en meer gerichte e-mails toegestuurd."
  },
  {
    type: "h3",
    text: "Hoe lang we persoonsgegevens bewaren"
  },
  {
    type: "p",
    text: "SINC bewaart je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor je gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen voor de volgende (categorieën) van persoonsgegevens:"
  },
  {
    type: "p",
    text: "Persoonsgegevens > 5 jaar"
  },
  {
    type: "p",
    text: "Personalia > 5 jaar"
  },
  {
    type: "p",
    text: "Adres > 5 jaar"
  },
  {
    type: "p",
    text: "Enzovoort > 5 jaar"
  },
  {
    type: "p",
    text: "De gegevens die SINC verzameld worden bijgehouden gedurende 5 jaar. Deze periode werd gekozen omdat het grootste deel van de studenten na gemiddeld 5 jaar studeren afstuderen of afgestudeerd zijn. SINC wil studenten namelijk zoveel mogelijk stimuleren doorheen hun volledige studieperiode."
  },
  {
    type: "h2",
    text: "Delen van persoonsgegevens met derden"
  },
  {
    type: "p",
    text: "SINC deelt jouw persoonsgegevens met verschillende derden als dit noodzakelijk is voor het uitvoeren van de overeenkomst en om te voldoen aan een eventuele wettelijke verplichting. Met bedrijven die je gegevens verwerken in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van jouw gegevens. SINC blijft verantwoordelijk voor deze verwerkingen. Daarnaast verstrekt SINC jouw persoonsgegevens aan andere derden. Dit doen wij alleen met jouw nadrukkelijke toestemming."
  },
  {
    type: "p",
    text: "SINC werkt samen met enkele structurele partners. Om de dienstverlening en informatieverschaffing naar de gebruikers (studenten) te optimaliseren, kunnen gegevens worden doorgegeven aan de structurele partners van SINC. Een volledige lijst van de structurele partners vind je op https://sincantwerpen.be/partners"
  },
  {
    type: "h2",
    text: "Cookies, of vergelijkbare technieken, die wij gebruiken"
  },
  {
    type: "p",
    text: "SINC gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van je computer, tablet of smartphone. SINC gebruikt cookies met een puur technische functionaliteit. Deze zorgen ervoor dat de website naar behoren werkt en dat bijvoorbeeld jouw voorkeursinstellingen onthouden worden. Deze cookies worden ook gebruikt om de website goed te laten werken en deze te kunnen optimaliseren. Daarnaast plaatsen we cookies die jouw surfgedrag bijhouden zodat we op maat gemaakte content kunnen aanbieden."
  },
  {
    type: "p",
    text: "Bij jouw eerste bezoek aan onze website hebben wij je al geïnformeerd over deze cookies en hebben we je toestemming gevraagd voor het plaatsen ervan."
  },
  {
    type: "p",
    text: "Je kunt je afmelden voor cookies door je internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kun je ook alle informatie die eerder is opgeslagen via de instellingen van je browser verwijderen."
  },
  {
    type: "p",
    text: "Zie voor een toelichting:"
  },
  {
    type: "p",
    text: "https://veiliginternetten.nl/themes/situatie/cookies-wat-zijn-het-en-wat-doe-ik-ermee/",
    href: "https://veiliginternetten.nl/themes/situatie/cookies-wat-zijn-het-en-wat-doe-ik-ermee/"
  },
  {
    type: "p",
    text: "Op deze website worden ook cookies geplaatst door derden. Dit zijn bijvoorbeeld adverteerders en/of de sociale media-bedrijven. Hieronder een overzicht:"
  },
  {
    type: "p",
    text: "Cookie: Google Analytics"
  },
  {
    type: "p",
    text: "Naam: __ga"
  },
  {
    type: "p",
    text: "Functie: Analytische cookie die websitebezoek meet"
  },
  {
    type: "p",
    text: "Bewaartermijn: 2 jaar"
  },
  {
    type: "h3",
    text: "Gegevens inzien, aanpassen of verwijderen"
  },
  {
    type: "p",
    text: "Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door SINC en heb je het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek kan indienen om de persoonsgegevens die wij van jou beschikken in een computerbestand naar jou of een ander, door jou genoemde organisatie, te sturen."
  },
  {
    type: "p",
    parts: [
      {
        text: "Je kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van je persoonsgegevens of verzoek tot intrekking van je toestemming of bezwaar op de verwerking van jouw persoonsgegevens sturen naar"
      },
      {
        text: " info@sincantwerpen.be",
        href: "mailto:info@sincantwerpen.be"
      },
      {
        text: "."
      }
    ]
  },
  {
    type: "p",
    text: "Om er zeker van te zijn dat het verzoek tot inzage door jou is gedaan, vragen wij jou een kopie van je identiteitsbewijs met het verzoek mee te sturen. Dit ter bescherming van je privacy. We reageren zo snel mogelijk, maar binnen vier weken, op jouw verzoek."
  },
  {
    type: "p",
    text: "SINC wil je er tevens op wijzen dat je de mogelijkheid hebt om een klacht in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via de volgende link:"
  },
  {
    type: "p",
    text: "https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons",
    href: "https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons"
  },
  {
    type: "h2",
    text: "Hoe wij persoonsgegevens beveiligen"
  },
  {
    type: "p",
    parts: [
      {
        text: "SINC neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als jij het idee hebt dat jouw gegevens toch niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via"
      },
      {
        text: " info@sincantwerpen.be",
        href: "mailto:info@sincantwerpen.be"
      }
    ]
  }
] satisfies PrivacyBlock[],
};
