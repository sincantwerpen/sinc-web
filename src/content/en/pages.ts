// English version of ../nl/pages.ts (same structure). Internal links stay as in Dutch ("/partners"):
// the site adds /en automatically.

import type { Partner, PrivacyBlock } from "../nl/pages";

const pillarImg = (n: string) => `/images/pillars/${n}.webp`;

/** Shared blocks used on both "About SINC" and "Community". */
export const network = {
  title: "A close-knit network of entrepreneurial minds",
  lead: "Draw strength from your network!",
  cards: [
    {
      title: "Student entrepreneurs",
      text: "Curious who went before you? Antwerp already counts more than 1,000 student entrepreneurs, and we put them in the spotlight here.",
      image: "/images/community/student-ondernemers.webp",
      cta: { label: "Discover", href: "/community#student-ondernemers" },
    },
    {
      title: "Our partners",
      text: "Our partners offer a range of services to help you move forward. Get to know them here!",
      image: "/images/community/partners.webp",
      cta: { label: "Discover", href: "/partners" },
    },
  ],
};

export const linkedinCommunity = {
  title: "Share your insights, ask questions, discover possible collaborations...",
  text: "Our community is active on LinkedIn, where insights are shared, questions are answered and great connections are made in an interactive way.",
  cta: { label: "Join our LinkedIn community", href: "https://www.linkedin.com/groups/12727546/" },
  gallery: [1, 2, 3, 4].map((n) => `/images/community/gallery-${n}.webp`),
};

export const overSinc = {
  eyebrow: "About SINC",
  title: "The student organisation for entrepreneurial-minded students",
  lead: "Our team of 19 motivated students works together all year long to inspire, inform, connect and activate you around entrepreneurship.",
  cta: { label: "Want to join our team?", href: "/contact" },
  heroPhotos: ["julie-vandenryt", "ilian-costa", "safia-el-mamoun", "babatunde-agunloye", "frie-vermeersch"].map(
    (n) => `/images/team-2026/${n}.jpg`,
  ),
  team: {
    title: "19 students taking action, for more entrepreneurship in Antwerp.",
    text: "Our team is made up of a diverse group of students who dedicate a whole year to entrepreneurship in Antwerp and beyond.",
    cta: { label: "Meet the team", href: "/het-team" },
    image: "/images/team-2026/groepsfoto.jpg",
  },
  statsTitle: "SINC in numbers",
  stats: [
    { value: 99, suffix: "+", label: "Alumni" },
    { value: 60, suffix: "+", label: "Events organised" },
    { value: 4000, suffix: "+", label: "Community members" },
    { value: 100, suffix: "%", label: "By and for students" },
  ],
  pillars: [
    {
      n: "01",
      title: "Inspire",
      text: "We inspire students by organising events, sharing inspiring content and putting student entrepreneurs in the spotlight.",
      image: pillarImg("inspireren"),
      cta: { label: "Follow our socials", href: "https://linktr.ee/sincantwerpen" },
    },
    {
      n: "02",
      title: "Inform",
      text: "We inform students about entrepreneurship with interesting talks at our events and answers to all their questions.",
      image: pillarImg("informeren"),
    },
    {
      n: "03",
      title: "Connect",
      text: "We connect students with other students, entrepreneurs, our partners, the Antwerp ecosystem and many other inspiring people.",
      image: pillarImg("connecteren"),
      cta: { label: "Join our community", href: "/community" },
    },
    {
      n: "04",
      title: "Activate",
      text: "We activate students to take a more entrepreneurial approach in their daily lives and professional careers.",
      image: pillarImg("activeren"),
      cta: { label: "Visit our events", href: "/events" },
    },
  ],
};

export const communityPage = {
  eyebrow: "Community",
  title: "The community for entrepreneurial-minded students",
  lead: "A network is one of an entrepreneur's greatest strengths. That's why we're building a community for students with an entrepreneurial mindset, together with other students, our partners and the Antwerp ecosystem.",
  cta: { label: "Join our community", href: "https://chat.whatsapp.com/LQOWOd6Px2RClnDNv9tEPF?mode=ems_share_c" },
  heroPhotos: [6, 5, 4, 3, 2, 1].map((n) => `/images/community/hero-0${n}.webp`),
  spotlight: {
    title: "Student entrepreneurs in the spotlight",
    text: "Antwerp already counts more than 1,000 student entrepreneurs. Curious who went before you?",
    soon: "Coming soon...",
  },
  // Kept from the former Ecosysteem page.
  antwerp: {
    title: "Studying & starting a business? In Antwerp, you absolutely can.",
    text: "Antwerp has a lot to offer entrepreneurial students. As a student, you can of course turn to your own school or university. But the city and all the relevant organisations also work closely together to support you and your project. You can also officially get started as a self-employed student. That way, you get more room to build up your business activities while still remaining a dependant of your parents.",
  },
  featureMe: {
    title: "Would you like to be featured on our website as a student entrepreneur too?",
    soon: "Coming soon...",
  },
};

const MOORE =
  "At Moore, we're there for entrepreneurs. For every SME, for every family business, large or small, and for ambitious management teams with a passion for entrepreneurship. They have an unstoppable drive to grow. And we love that. Because entrepreneurs are the engine of our economy. Entrepreneurship is in our DNA. We know how entrepreneurs think and act because we are entrepreneurs ourselves. We've built up indispensable expertise, and we want to share it. We help entrepreneurs in their day-to-day business operations. We advise and guide them at key moments. Proactively and tailored to their needs. From tax and legal advice to corporate finance, business consulting, innovation and digital transformation. Thinking along, working along and growing along. We are entrepreneurs, just like you.";

export const partnersPage = {
  eyebrow: "Partners",
  title: "Powered by our entrepreneurial-minded partners",
  lead: "An extensive network of partners makes it possible for us to do what we do. They have a lot to offer you as student entrepreneurs or students with an entrepreneurial mindset. Get to know them here.",
  cta: { label: "Become a partner yourself?", href: "/contact" },
  heroPhotos: [1, 6, 5, 2, 3, 4].map((n) => `/images/partners/cards/hero-0${n}.webp`),
  main: [
    {
      name: "Moore",
      logo: "/images/partners/cards/moore.png",
      lightTile: true,
      text: MOORE,
      links: [
        { label: "Website", href: "https://www.moore.be" },
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
      text: "Pitchdrive is a Belgian VC that supports ambitious tech start-ups in Europe and the United States. We offer not only capital, but also strategic advice and access to a valuable network. With a focus on innovative technologies and a data-driven approach, we invest in companies that are ready for impact. We work as partners alongside entrepreneurs, offering mentoring, market expertise and the tools needed for sustainable growth and success.",
      links: [
        {
          label: "Discover more",
          href: "https://pitchdrive.notion.site/Pitchdrive-Startup-Job-Board-9e7c662d71f94423b3b9b2db210bad02?pvs=4",
        },
      ],
    },
    {
      name: "Xerius",
      logo: "/images/partners/xerius.webp",
      text: "Xerius provides support when starting, changing or closing a business. We take care of the paperwork for new self-employed professionals and carefully check every document. We also calculate social security contributions and proactively inform you about your rights and obligations. From 12 offices, we help more than 240,000 self-employed professionals and 146,000 companies. At every step, Xerius has your back.",
      links: [{ label: "Discover more", href: "https://www.xerius.be/en-be" }],
    },
  ] satisfies Partner[],
  others: [
    { name: "The Beacon", logo: "/images/partners/the-beacon.webp", links: [{ label: "Discover more", href: "https://www.thebeacon.eu/" }] },
    { name: "Humgy Cowork", logo: "/images/partners/humgy.webp", links: [{ label: "Discover more", href: "https://www.humgy.com/" }] },
    { name: "Vlajo", logo: "/images/partners/vlajo.webp", links: [{ label: "Discover more", href: "https://www.vlajo.org/" }] },
    { name: "the launch.", logo: "/images/partners/cards/the-launch.png", links: [{ label: "Discover more", href: "https://www.launchcrew.be/" }] },
    { name: "Flexmail", logo: "/images/partners/flexmail.webp", links: [{ label: "Discover more", href: "https://flexmail.be/nl/" }] },
    { name: "StoryChief", logo: "/images/partners/storychief.webp", links: [{ label: "Discover more", href: "https://www.storychief.io/" }] },
    { name: "TakeOffAntwerp_", logo: "/images/partners/takoffantwerp.webp", links: [{ label: "Discover more", href: "https://www.takeoffantwerp.be/" }] },
  ] satisfies Partner[],
  band: {
    title: "Interested in working together with SINC?",
    cta: { label: "Get in touch with us", href: "/contact" },
  },
};

export const contactPage = {
  eyebrow: "Contact",
  titleLines: ["Got questions?", "Need advice?", "Get in touch!"],
  lead: "Do you have questions about entrepreneurship? Would you like to become part of SINC yourself? Don't hesitate to get in touch! We'll answer all your questions as quickly as possible.",
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
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send",
    success: "Thank you! We'll answer your question as quickly as possible.",
    error: "Something went wrong. Please try again or email",
  },
  email: "info@sincantwerpen.be",
  questionsTitle: "Do you have a specific question?",
  questions: [
    {
      title: "Interested in becoming a SINC Partner?",
      image: "/images/community/partners.webp",
      cta: { label: "Contact us", href: "mailto:info@sincantwerpen.be" },
    },
    {
      title: "Do you have press-related or other questions?",
      image: "/images/community/eco-systeem.webp",
      cta: { label: "Contact us", href: "mailto:info@sincantwerpen.be" },
    },
  ],
};

export const privacyPage = {
  title: "Privacy statement",
  blocks: [
    {
      type: "p",
      text: "SINC, Students for Innovation and Co-operation, located at Van Schoonbekestraat 55, 2018 Antwerp, is responsible for the processing of personal data as set out in this privacy statement.",
    },
    {
      type: "p",
      text: "Contact details:",
    },
    {
      type: "p",
      text: "https://sincantwerpen.be",
      href: "https://sincantwerpen.be",
    },
    {
      type: "p",
      text: "Ijzerenpoortkaai 3, 2000 Antwerp",
    },
    {
      type: "p",
      text: "+32495898715",
    },
    {
      type: "h2",
      text: "Information about SINC's services",
    },
    {
      type: "p",
      text: "SINC is an Antwerp student association and non-profit organisation (vzw) dedicated to stimulating entrepreneurship among students. SINC does this by organising events for students. In addition, the SINC website provides useful information that can help students start their own business. All data collected by SINC is intended to improve the students' experience.",
    },
    {
      type: "p",
      text: "SINC's services include organising events and providing information about entrepreneurship.",
    },
    {
      type: "h2",
      text: "Personal data we process",
    },
    {
      type: "p",
      text: "SINC processes your personal data because you use our website and/or take part in our events and/or because you provide this data to us yourself.",
    },
    {
      type: "p",
      text: "Below is an overview of the personal data we process:",
    },
    {
      type: "p",
      text: "– First and last name",
    },
    {
      type: "p",
      text: "– Email address",
    },
    {
      type: "p",
      text: "– Field of study",
    },
    {
      type: "p",
      text: "– University college or university where you study",
    },
    {
      type: "p",
      text: "– Current entrepreneurial stage",
    },
    {
      type: "p",
      text: "– Data about your activities on our website",
    },
    {
      type: "p",
      text: "– Internet browser and device type",
    },
    {
      type: "p",
      text: "– Other personal data you actively provide, for example by creating a profile on this website, registering for a SINC event, in correspondence and during telephone contact with a SINC board member.",
    },
    {
      type: "h3",
      text: "Special and/or sensitive personal data we process",
    },
    {
      type: "p",
      parts: [
        {
          text: "Our website and/or service does not intend to collect data about website visitors under the age of 16, unless they have permission from their parents or guardian. However, we cannot verify whether a visitor is over 16. We therefore encourage parents to be involved in their children's online activities, in order to prevent data about children being collected without parental consent. If you are convinced that we have collected personal information about a minor without this consent, please contact us at",
        },
        {
          text: " info@sincantwerpen.be",
          href: "mailto:info@sincantwerpen.be",
        },
        {
          text: " and we will delete this information.",
        },
      ],
    },
    {
      type: "h3",
      text: "For what purpose and on what basis we process personal data",
    },
    {
      type: "p",
      text: "SINC processes your personal data for the following purposes:",
    },
    {
      type: "p",
      text: "– Sending our newsletter to keep you up to date with news and useful information for students and (student) entrepreneurs.",
    },
    {
      type: "p",
      text: "– Being able to email you if this is necessary to provide our services. For example, to give further information about an event.",
    },
    {
      type: "p",
      text: "– Informing you about changes to our services and products",
    },
    {
      type: "p",
      text: "– Giving you the option to create an account",
    },
    {
      type: "p",
      text: "– Delivering and providing goods and services to you.",
    },
    {
      type: "p",
      text: "– SINC analyses your behaviour on the website in order to improve the website and to tailor the range of products and services to your preferences.",
    },
    {
      type: "h3",
      text: "Automated decision-making",
    },
    {
      type: "p",
      text: "SINC does not make decisions based on automated processing on matters that may have (significant) consequences for individuals. These are decisions taken by computer programs or systems without a human being (for example, a SINC team member) being involved. SINC uses the following computer programs or systems:",
    },
    {
      type: "p",
      text: "• WordPress and Flexmail:",
    },
    {
      type: "p",
      text: "The SINC website (www.sincantwerpen.be) is built with WordPress. Based on your activity on the SINC website, WordPress, in cooperation with Flexmail, can automatically send emails to your email address. This way, students with an early-stage business idea receive different and more targeted emails.",
    },
    {
      type: "h3",
      text: "How long we keep personal data",
    },
    {
      type: "p",
      text: "SINC does not keep your personal data longer than strictly necessary to achieve the purposes for which your data is collected. We use the following retention periods for the following (categories of) personal data:",
    },
    {
      type: "p",
      text: "Personal data > 5 years",
    },
    {
      type: "p",
      text: "Personal details > 5 years",
    },
    {
      type: "p",
      text: "Address > 5 years",
    },
    {
      type: "p",
      text: "Etc. > 5 years",
    },
    {
      type: "p",
      text: "The data SINC collects is kept for 5 years. This period was chosen because most students graduate, or have graduated, after an average of 5 years of study. SINC wants to support students as much as possible throughout their entire time as a student.",
    },
    {
      type: "h2",
      text: "Sharing personal data with third parties",
    },
    {
      type: "p",
      text: "SINC shares your personal data with various third parties if this is necessary to perform the agreement and to comply with any legal obligation. With companies that process your data on our behalf, we conclude a processing agreement to ensure the same level of security and confidentiality of your data. SINC remains responsible for these processing operations. In addition, SINC provides your personal data to other third parties. We only do this with your explicit consent.",
    },
    {
      type: "p",
      text: "SINC works together with a number of structural partners. To optimise the services and information provided to users (students), data may be passed on to SINC's structural partners. You can find a full list of the structural partners at https://sincantwerpen.be/partners",
    },
    {
      type: "h2",
      text: "Cookies, or similar techniques, that we use",
    },
    {
      type: "p",
      text: "SINC uses functional, analytical and tracking cookies. A cookie is a small text file that is stored in the browser of your computer, tablet or smartphone when you first visit this website. SINC uses cookies with a purely technical function. These ensure that the website works properly and that, for example, your preferred settings are remembered. These cookies are also used to make the website work properly and to be able to optimise it. In addition, we place cookies that track your browsing behaviour so that we can offer tailored content.",
    },
    {
      type: "p",
      text: "During your first visit to our website, we already informed you about these cookies and asked for your consent to place them.",
    },
    {
      type: "p",
      text: "You can opt out of cookies by setting your internet browser so that it no longer stores cookies. You can also delete all information previously stored via your browser settings.",
    },
    {
      type: "p",
      text: "For an explanation, see:",
    },
    {
      type: "p",
      text: "https://veiliginternetten.nl/wat-zijn-cookies/",
      href: "https://veiliginternetten.nl/wat-zijn-cookies/",
    },
    {
      type: "p",
      text: "Cookies are also placed on this website by third parties, for example advertisers and/or social media companies. Below is an overview:",
    },
    {
      type: "p",
      text: "Cookie: Google Analytics",
    },
    {
      type: "p",
      text: "Name: __ga",
    },
    {
      type: "p",
      text: "Function: Analytical cookie that measures website visits",
    },
    {
      type: "p",
      text: "Retention period: 2 years",
    },
    {
      type: "h3",
      text: "Accessing, correcting or deleting your data",
    },
    {
      type: "p",
      text: "You have the right to access, correct or delete your personal data. You also have the right to withdraw any consent you have given for the data processing or to object to the processing of your personal data by SINC, and you have the right to data portability. This means that you can submit a request to us to send the personal data we hold about you in a computer file to you or to another organisation you name.",
    },
    {
      type: "p",
      parts: [
        {
          text: "You can send a request for access, correction, deletion or transfer of your personal data, or a request to withdraw your consent or object to the processing of your personal data, to",
        },
        {
          text: " info@sincantwerpen.be",
          href: "mailto:info@sincantwerpen.be",
        },
        {
          text: ".",
        },
      ],
    },
    {
      type: "p",
      text: "To make sure the request for access was made by you, we ask you to send a copy of your proof of identity with the request. This is to protect your privacy. We will respond to your request as quickly as possible, and in any case within four weeks.",
    },
    {
      type: "p",
      text: "SINC would also like to point out that you have the option to file a complaint with the national supervisory authority, the Autoriteit Persoonsgegevens. You can do so via the following link:",
    },
    {
      type: "p",
      text: "https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons",
      href: "https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons",
    },
    {
      type: "h2",
      text: "How we protect personal data",
    },
    {
      type: "p",
      parts: [
        {
          text: "SINC takes the protection of your data seriously and takes appropriate measures to prevent misuse, loss, unauthorised access, unwanted disclosure and unauthorised modification. If you feel that your data is not properly secured or there are indications of misuse, please contact us at",
        },
        {
          text: " info@sincantwerpen.be",
          href: "mailto:info@sincantwerpen.be",
        },
      ],
    },
  ] satisfies PrivacyBlock[],
};
