// English version of ../nl/site.ts (same structure). Internal links stay as in Dutch ("/events"):
// the site adds /en automatically.

export const siteMeta = {
  title: "SINC | By and for students with an entrepreneurial mindset",
  description:
    "SINC wants to show students that entrepreneurship doesn't have to feel like a far-off world. Inspiration, tools and a network for entrepreneurial students in Antwerp.",
  ogLocale: "en_GB",
  /** Shown on the language switch for screen readers. */
  switchLabel: "Choose your language",
  /** Page names in the browser tab: "<name> | SINC Antwerpen". */
  pages: {
    events: "Events",
    partners: "Partners",
    community: "Community",
    overSinc: "About SINC",
    team: "The team",
    contact: "Contact",
    privacy: "Privacy statement",
    notFound: "Page not found",
  },
};

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Partners", href: "/partners" },
    { label: "Community", href: "/community" },
    { label: "About SINC", href: "/over-sinc" },
    { label: "The Team", href: "/het-team" },
  ],
  cta: { label: "Contact", href: "/contact" },
  /** For screen readers. */
  menuLabel: "Main menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  homeLabel: "SINC home",
};

export const hero = {
  eyebrow: "By and for students with an entrepreneurial mindset",
  title: "Students for Innovation & Cooperation",
  lead: "At SINC, we want to help students go through life more entrepreneurially. We give students the right dose of inspiration, the right tools to get started, and the network they need to help them along the way.",
  primary: { label: "Upcoming events", href: "/events" },
  secondary: { label: "Join our community", href: "/community" },
  photos: [
    { src: "/images/hero/erika.jpg", alt: "Erika, SINC team" },
    { src: "/images/hero/mathis.jpg", alt: "Mathis, SINC team" },
    { src: "/images/hero/hayi.jpg", alt: "Hayi, SINC team" },
    { src: "/images/hero/naoufal.jpg", alt: "Naoufal, SINC team" },
    { src: "/images/hero/lara.jpg", alt: "Lara, SINC team" },
    { src: "/images/hero/michelle.jpg", alt: "Michelle, SINC team" },
  ],
};

export const about = {
  eyebrow: "About SINC",
  /** Tag on each pillar card: "Pillar 01". */
  pillarLabel: "Pillar",
  title: "A student organisation with one clear mission",
  lead: "SINC inspires, informs, connects and activates students to be more entrepreneurial and to go through life as go-getters.",
  cta: { label: "More about SINC", href: "/over-sinc" },
  pillars: [
    {
      n: "01",
      title: "Inspire",
      text: "We inspire students by organising events, sharing inspiring content and putting student entrepreneurs in the spotlight.",
      image: "/images/pillars/inspireren.webp",
    },
    {
      n: "02",
      title: "Inform",
      text: "We inform students about entrepreneurship with interesting talks at our events and answers to all their questions.",
      image: "/images/pillars/informeren.webp",
    },
    {
      n: "03",
      title: "Connect",
      text: "We connect students with other students, entrepreneurs, our partners, the Antwerp ecosystem and many other inspiring people.",
      image: "/images/pillars/connecteren.webp",
    },
    {
      n: "04",
      title: "Activate",
      text: "We activate students to take a more entrepreneurial approach in their daily lives and professional careers.",
      image: "/images/pillars/activeren.webp",
    },
  ],
};

export const events = {
  eyebrow: "Events",
  title: "Upcoming events",
  lead: "We organise a variety of events built around our four pillars (inspire, inform, connect and activate). Discover the interesting events we have planned.",
  cta: { label: "Discover all our events", href: "/events" },
  empty: "We don't have any events planned at the moment. Be sure to check back later!",
};

export const community = {
  eyebrow: "Community",
  title: "The community for entrepreneurial minds",
  lead: "A network is one of an entrepreneur's greatest strengths. That's why we're building a community of students with an entrepreneurial mindset.",
  cta: { label: "Join our community", href: "/community" },
  image: "/images/community.jpg",
  imageAlt: "The SINC community in a group photo",
};

export const newsletter = {
  title: "Stay in the loop!",
  text: "Subscribe to our newsletter and never miss our events or the latest news on student entrepreneurship.",
  fields: { email: "Email", firstName: "First name", lastName: "Last name" },
  submit: "Subscribe",
  success: "Thank you! You're subscribed.",
  error: "Something went wrong. Please try again.",
};

export const partners = {
  title: "SINC Partners",
  text: "Thanks to our partners, we can offer an accessible platform for students with an entrepreneurial mindset. Discover our partners here.",
  cta: { label: "More about our partners", href: "/partners" },
  logos: [
    { name: "De Cronos Groep", src: "/images/partners/de-cronos-groep.webp", href: "https://cronos-groep.be/" },
    { name: "Stad Antwerpen", src: "/images/partners/stad-antwerpen.webp", href: "https://www.antwerpen.be/ondernemers-en-bedrijven" },
    { name: "Moore", src: "/images/partners/moore-wit-1.png", href: "https://www.moore.be" },
    { name: "The Beacon", src: "/images/partners/the-beacon.webp", href: "https://www.thebeacon.eu/" },
    { name: "Xerius", src: "/images/partners/xerius.webp", href: "https://www.xerius.be/en-be" },
    { name: "Humgy", src: "/images/partners/humgy.webp", href: "https://www.humgy.com/" },
    { name: "Vlajo", src: "/images/partners/vlajo.webp", href: "https://www.vlajo.org/" },
    { name: "Flexmail", src: "/images/partners/flexmail.webp", href: "https://flexmail.be/nl/" },
    { name: "StoryChief", src: "/images/partners/storychief.webp", href: "https://www.storychief.io/" },
    { name: "TakeOffAntwerp", src: "/images/partners/takoffantwerp.webp", href: "https://www.takeoffantwerp.be/" },
  ],
};

export const footer = {
  about: "SINC was founded in 2014 to inform, inspire, connect and activate students to go through life more entrepreneurially.",
  menuTitle: "Menu",
  menu: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Partners", href: "/partners" },
    { label: "Community", href: "/community" },
    { label: "About SINC", href: "/over-sinc" },
    { label: "The Team", href: "/het-team" },
    { label: "Contact", href: "/contact" },
  ],
  orgTitle: "SINC VZW",
  privacy: { label: "Privacy & cookies", href: "/privacy" },
  address: "Ijzerenpoortkaai 3, 2000 Antwerp",
  vat: "BE0563.354.818",
  email: "info@sincantwerpen.be",
  socialsTitle: "Follow our socials",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sincantwerpen" },
    { label: "Instagram", href: "https://www.instagram.com/sincantwerpen/" },
    { label: "TikTok", href: "https://www.tiktok.com/@sinc_antwerpen" },
    { label: "Facebook", href: "https://www.facebook.com/sincantwerpen/" },
    { label: "YouTube", href: "https://www.youtube.com/@sincantwerpen7381" },
  ],
  copyright: "SINC Antwerpen VZW | All rights reserved.",
};

export const eventsPage = {
  eyebrow: "Events",
  title: "Upcoming events",
  lead: "We organise a variety of events built around our four pillars (inspire, inform, connect and activate). Discover the interesting events we have planned.",
  heroPhotos: [1, 2, 6, 5, 4, 3].map((n) => `/images/events/hero/0${n}.webp`),
  pastTitle: "Past events",
  pastLabel: "Past",
  allLabel: "All",
  /** Names of the four pillars on tags and filters. */
  pillarLabels: { Inspireren: "Inspire", Informeren: "Inform", Connecteren: "Connect", Activeren: "Activate" },
  moreInfo: "More info",
  register: "Register",
  countdown: { days: "days", hours: "hrs", minutes: "min", seconds: "sec" },
  detail: {
    back: "Back",
    about: "About this event",
    labels: { date: "Date", time: "Time", doors: "Doors", location: "Location", price: "Price" },
    ticket: "Register",
    relatedTitle: "You might also like these events",
    relatedEmpty: "We don't have any other events planned at the moment. Be sure to check back later!",
  },
};

/** Round "next event" button in the bottom-right corner of the homepage. */
export const nextEventBadge = {
  ring: "Next event • Sign up now • ",
  open: "Show the next event",
  close: "Close",
  eyebrow: "Coming up at SINC",
  title: "The next event",
  subtitle: "are you coming?",
  moreInfo: "More info",
  allEvents: "All events",
  today: "today",
  tomorrow: "tomorrow",
  inDays: (n: number) => `in ${n} days`,
};

/** Page shown for an address that doesn't exist. */
export const notFound = {
  eyebrow: "Oops!",
  title: "This page doesn't exist (anymore)",
  text: "Maybe the link is out of date or there's a typo in it. No worries: you'll easily find your way back from here.",
  home: { label: "Go to the homepage", href: "/" },
  events: { label: "See our events", href: "/events" },
};
