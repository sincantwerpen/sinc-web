// English texts for the events in ../nl/events.ts. Everything else (photo, start time, ticket link,
// `upcoming`) comes from the Dutch file, so a new event only has to be added there; until it gets an
// entry here, the English site shows the Dutch text.

import { sincEvents as nlEvents, pillars, type SincEvent } from "../nl/events";

type EventText = Pick<SincEvent, "subtitle" | "topics" | "excerpt" | "body"> &
  Partial<Pick<SincEvent, "title" | "date" | "time" | "doors" | "location" | "price">>;

const FREE = "FREE";

const texts: Record<string, EventText> = {
  "sinc-soiree-the-art-of-failing": {
    subtitle: "The Art of Failing",
    topics: "Keynotes, Networking",
    excerpt: "Discover why the biggest blunders are often the best springboards, and how to turn an epic fail into your biggest win.",
    date: "20 October",
    price: FREE,
    body: [
      "You do your own bookkeeping and feel like a real entrepreneur, until you get a fine that's higher than your entire revenue. Or you sink your whole budget into a campaign that delivers nothing. Everyone messes up now and then, and that's exactly the part of entrepreneurship you rarely hear about.",
      "On 20 October, discover why the biggest blunders are often the best springboards. Because you can't succeed without failing.",
      "## The speakers",
      "Daria Kenis – PlotTwist\nAdventurous group trips for young people. Daria shares how mistakes and unexpected turns brought her to where she is today.",
      "Laurens Van den Bleeken & Simon Verhoeven – Yuno\nThe all-in-one app to connect, plan and discover your new city on Erasmus. They talk about how to deal with choices that turned out to be completely wrong.",
      "## 🤝 Let's network!",
      "After the keynotes: open bar and real conversations, no stiff small talk. You might just go home with exactly the insight you need to turn your own fail into a win.",
      "Everyone fails. Only the best learn from it.",
    ],
  },
  "go-with-the-coach": {
    subtitle: "Future-proof entrepreneurship",
    topics: "Keynotes, Coaching, Networking",
    excerpt: "Discover how to stay future-proof and ask all your questions to real experts. Choose your track: hands-on coaching or inspiring keynotes.",
    date: "12 November",
    price: FREE,
    body: [
      "Do you have a plan, an idea, or the drive to shape your future? The world of entrepreneurship is changing at lightning speed. At Go With The Coach, you'll discover how to stay future-proof, and you can ask all your questions to real experts.",
      "We kick off with an inspiring keynote on future-proof entrepreneurship and careers: long-term thinking and pushing on when things get tough.",
      "## 👩‍💻 Coaching track\n- Finance\n- Sales\n- Marketing\n- Beginner Essentials\n- Legal\nDo you already have concrete questions or your own business? Choose 2 of these 5 coaching sessions and get concrete answers. Networking with other ambitious students is part of it too, of course.",
      "## 💡 Inspire track\n- AI & the future\n- Skills of the future\nNo concrete questions yet, but curious about the future of entrepreneurship? Get inspired by two keynotes, with concrete tips to get started in a future-proof way.",
      "You choose your track when you register. Both tickets are free, but places are limited!",
    ],
  },
  "seef-the-best-for-last": {
    subtitle: "SINC BBQ",
    topics: "BBQ",
    excerpt: "We're closing the year with a cosy BBQ at Antwerpse Brouw Compagnie: SEEF",
    date: "13 May",
    body: [
      "We're closing the year with a cosy BBQ at Antwerpse Brouw Compagnie: SEEF🍻",
      "On 13 May, we invite you to a relaxed evening with good food, great vibes and, of course, the well-known SEEF beers. The setting? An atmospheric brewery where we fire up the Ofyr ourselves, complemented by a buffet.",
      "Don't forget to sign up via the link!",
      "Not on the SINC board? You can join with a BBQ ticket (€32). You choose between two packages:",
      "## BBQ Classic\n- Satay\n- BBQ sausage\n- Chicken drumsticks\n- Spare ribs\n- Selection of fresh vegetables\n- Potato salad & pasta salad\n- Bread rolls & butter\n- Various fresh sauces",
      "## BBQ Veggie\n- Vegetable parcel\n- Berloumi cheese\n- Veggie burger\n- Selection of fresh vegetables\n- Potato salad & pasta salad\n- Bread rolls & butter\n- Various fresh sauces",
      "🕕 Start: 18:00 — 23:00",
      "The perfect end to the year: great food, getting to know people and simply enjoying the evening.",
      "PS: sign up in time, places are limited 😉",
    ],
  },
  "sinc-101-career-edition": {
    subtitle: "Learn practical skills in three workshops with real scenarios.",
    topics: "Career Edition",
    excerpt: "Launching SINC 101: a hands-on evening of workshops.",
    date: "29 April",
    price: FREE,
    body: nlEvents.find((e) => e.slug === "sinc-101-career-edition")!.body,
  },
  "sinc-soiree-2": {
    subtitle: "Two top speakers",
    topics: "Marketing, Networking",
    excerpt: "We've planned something you won't want to miss: an evening at The Beacon Antwerp.",
    date: "11 March",
    price: FREE,
    body: [
      "𝐒𝐈𝐍𝐂 𝐒𝐨𝐢𝐫é𝐞 𝐨𝐧 11 𝐌𝐚𝐫𝐜𝐡\nWe've planned something you won't want to miss: an evening at The Beacon Antwerp with 𝐭𝐰𝐨 𝐭𝐨𝐩 𝐬𝐩𝐞𝐚𝐤𝐞𝐫𝐬, 𝐬𝐡𝐨𝐫𝐭 𝐤𝐞𝐲𝐧𝐨𝐭𝐞𝐬 𝐚𝐧𝐝 𝐚 𝐧𝐞𝐭𝐰𝐨𝐫𝐤𝐢𝐧𝐠 𝐦𝐨𝐦𝐞𝐧𝐭 with fellow students and entrepreneurs.",
      "Jasper Dockx\n➡️ Entrepreneur and lecturer.",
      "● founder of Twaalfde Man\n● co-founder of NUBI\n● started Students @ The Office.",
      "Someone who doesn't wait for opportunities, but builds them himself",
      "Philip De Cleen\n➡️ Chief Marketing Evangelist and marketing lecturer.",
      "● 30+ years of experience in marketing & communication for brands including Lay's, Dixan, Neckermann…\n● author of 'Marketing. Wake up and go with the flow'\n● contestant on De Mol.",
      "You'll hang on his every word.",
      "🕒 18:30 – ±22:00\n📍 The Beacon",
      "And yes, there are falafel wraps for those who are fasting. 😉 (and for everyone else too, of course)",
      "Put it in your calendar already. This is going to be a real SINC Soirée",
    ],
  },
  "kerst-soiree": {
    title: "Christmas soirée",
    subtitle: "Learn to speak with impact and network without the cringe",
    topics: "Pitch, Network",
    excerpt: "During this winter edition of the SINC soirée, we'll immerse you in an evening full of learning",
    date: "17 December",
    price: FREE,
    body: [
      "Learn to speak with impact and network without cringe small talk at the Christmas soirée!",
      "During this winter edition of the SINC soirée, we'll immerse you in an evening that's both educational and cosy. Don't expect a formal event, but a warm atmosphere where you learn, connect and above all have a great time.",
      "We start with How to Pitch, where you'll discover how to get your idea or business across clearly and convincingly. That's followed by How to Network, so you can skip all the cringe small talk and go straight to real, valuable conversations.",
      "After the theory, it's time to put everything into practice. During the networking moment, you can practise right away in a relaxed setting, with warm bites and delicious drinks that complete the cosy atmosphere.",
      "## Programme",
      "18:30 – 19:00 | Doors open\n19:00 – 19:30 | How to pitch\n19:30 – 19:40 | Break\n19:40 – 19:55 | How to network\n19:55 – 22:30 | Networking",
      "Please note: the programme is subject to change.",
    ],
  },
  "arts-inc": {
    subtitle: "Where creativity meets entertainment & AI",
    topics: "Creativity, design, AI",
    excerpt: "Creativity is for everyone. This year, we're diving into the world of entertainment and AI",
    date: "2 December",
    price: FREE,
    body: nlEvents.find((e) => e.slug === "arts-inc")!.body,
  },
  "go-with-the-coach-jouw-kans-om-alles-te-vragen": {
    subtitle: "Your chance to ask anything",
    topics: "Finance, Sales, Marketing, Beginner essentials, Legal lift, Founder stories",
    excerpt: "A student with a plan, a business or just the urge to get started? Then this event is for you.",
    date: "22 October",
    price: FREE,
    body: [
      "A student with a plan, an idea of your own or just the urge to get started?\nAt Go With The Coach, you get the unique chance to ask all your questions to real experts.",
      "## 🗣️ There's no Planet B",
      "Both tracks start with a powerful keynote by Tibbe Verschaffel (Planet B) on sustainable entrepreneurship. Tibbe gives you a WONDRful dose of inspiration in less than an hour.",
      "## 👩‍💻 Coaching Track",
      "Do you already have concrete questions or your own business? Then this is the place for you!",
      "✔ 3 interactive coaching rounds where you choose your own topics (Finance, Sales, Marketing, Beginner Essentials or Legal Lift)",
      "✔ The option of personal 1-on-1 conversations with coaches",
      "✔ Networking with other ambitious students",
      "➡️ Choose this ticket if you want concrete answers and really want to take steps.",
      "⏳ Sign up now. Places are limited!",
      "## 💡Inspire Track",
      "No concrete questions yet, but curious about entrepreneurship?\nNo problem! This programme gives you a taste of the entrepreneurial world and a big dose of inspiration.",
      "✔ Founder stories from Sondra Voorbraak (ARBOR Antwerpen)",
      "✔ Founder stories from Yindra Cox (Oaas)",
      "✔ Inspiring stories, concrete tips and insights to discover your own path",
      "➡️ Choose this ticket if you want to learn, discover and take your first steps in entrepreneurship.",
      "⏳ Sign up now. Places are limited!",
    ],
  },
  "go-with-the-coach-2-2": {
    subtitle: "Coaching to success!",
    topics: "Sales, Finance, Services for starters, Marketing, Tools for starters",
    excerpt: "On Monday 28 April, we're organising a brand-new Go With The Coach!",
    date: "28 April",
    doors: "18:00",
    price: FREE,
    body: [
      "🚀 Go With The Coach is back with a second edition this academic year! 🚀",
      "On Monday 28 April, we're organising a brand-new Go With The Coach! This time, we're doing things a little differently. 💥",
      "Instead of 1-on-1 sessions, you'll be placed in small groups where you can learn from two experienced coaches per theme. You choose the three themes that interest you most in advance and take part in three interactive 30-minute coaching sessions. 🤩",
      "Topics are:\n💼 Sales\n💰 Finance\n📑 Services for starters\n📊 Marketing\n🌱 Tools for starters",
    ],
  },
  galabal: {
    title: "Gala ball - SINC 10 years",
    subtitle: "This year we're celebrating a special milestone!",
    topics: "Gala ball 🪩",
    excerpt: "SINC is turning 10! Of course, we're not letting that go by unnoticed! 🎉",
    date: "9 May",
    doors: "20:00",
    body: [
      "This year we're celebrating a special milestone: SINC is turning 10! 🎉 Of course, we're not letting that go by unnoticed! We're celebrating this anniversary with a big party and everyone is welcome to celebrate with us!",
      "Get ready for an evening full of surprises, good company and a touch of magic. Together, we'll make it a moment to never forget!",
      "## LINE-UP\n🪩 00:15 – 03:00 DJ NITSUJ | Don't expect a standard set, but a night full of familiar tunes with a creative twist.",
      "Put on your best outfit and come raise a glass with us to 10 fantastic years! See you there!🥂",
      "📅 9 May 2025\n📍 Dunden, Lange Gasthuisstraat 29-31, 2000 Antwerp",
    ],
  },
  "arts-inc-create-new-dimensions": {
    subtitle: "Create New Dimensions",
    topics: "Content Creation and AI",
    excerpt: "This year, ARTS.inc will focus on the dimensions of Content Creation and AI.",
    date: "19 November",
    doors: "18:30",
    price: FREE,
    body: nlEvents
      .find((e) => e.slug === "arts-inc-create-new-dimensions")!
      .body.map((line) => line.replace("PAUZE", "BREAK")),
  },
  "go-with-the-coach-2024": {
    subtitle: "Speed date with your future! 🚀",
    topics: "📱 Tools for starters 🧑🏻‍💻 Services for starters 📊 Finance 🖼️ Marketing 💻 Tools 📈 Sales 🤖 AI",
    excerpt: "Go With The Coach, or “GWTC”, is an event where you as a student go on a “speed date”.",
    date: "22 October",
    doors: "18:00",
    price: FREE,
    body: [
      "Are you a student with a business idea or have you already started your own company? Or do you dream of becoming an entrepreneur one day, but don't know where to start? On 22 October 2024, SINC is once again organising Go With The Coach, where you get the chance to receive valuable advice from experienced professionals during several 1-on-1 coaching sessions!",
      "What can you expect\n🕕 18:00 – Doors open\n🕕 18:30 – Event kicks off with an inspiring keynote speaker\n💡 Coaching sessions: Talk to several experts from different fields during 15-minute 1-on-1 sessions. Ask all your questions and get practical tips and insights.\n⚡ Networking moment: After the coaching sessions, you can expand your network during the closing networking moment.",
      "The coaching sessions are organised around the following themes:\n📱 Tools for starters\n🧑🏻‍💻 Services for starters\n📊 Finance\n🖼️ Marketing\n💻 Tools\n📈 Sales\n🤖 AI",
      "When you register, you indicate which themes you'd like advice on, and we make sure you're matched with the right coaches.",
      "This is THE evening to grow your entrepreneurial skills! Save the date and get ready to make your entrepreneurial dreams come true!💡",
    ],
  },
};

export const sincEvents: SincEvent[] = nlEvents.map((e) => ({ ...e, ...texts[e.slug] }));

export { pillars };

export const upcomingEvents = sincEvents.filter((e) => e.upcoming);
export const pastEvents = sincEvents.filter((e) => !e.upcoming);
export const getEvent = (slug: string) => sincEvents.find((e) => e.slug === slug);
