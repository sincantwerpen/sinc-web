// Het team 2026–2027. Add `email` and `linkedin` per person: the buttons light up automatically.
// Put a portrait in public/images/team-2026/ and set `photo` (without it, a placeholder with initials is shown).

export type Member = {
  name: string;
  role: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  /** Directors and presidents get a larger card. */
  lead?: boolean;
};

export type Department = { id: string; name: string; members: Member[] };

const photo = (slug: string) => `/images/team-2026/${slug}.jpg`;

export const teamPage = {
  eyebrow: "SINC 2026–2027",
  title: "Het team",
  lead: "Ons team bestaat uit een diverse groep studenten die zich een jaar lang inzetten voor ondernemerschap in Antwerpen en daarbuiten.",
  emailLabel: "Email",
  linkedinLabel: "LinkedIn",
  departmentsLabel: "Afdelingen",
  students: "studenten",
  band: {
    title: "Heb jij zin om deel uit te maken van het SINC 2027-2028 team?",
    cta: { label: "Stuur ons!", href: "mailto:info@sincantwerpen.be" },
  },
};

export const departments: Department[] = [
  {
    id: "voorzitters",
    name: "Voorzitters",
    members: [
      { name: "Mathis Hansen", role: "President", photo: photo("mathis-hansen"), lead: true },
      { name: "Erika Vliegen", role: "Vicepresident", photo: photo("erika-vliegen"), lead: true },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      { name: "Julie Vandenryt", role: "Event Director", photo: photo("julie-vandenryt"), lead: true },
      { name: "Arbina Reçica", role: "Event Manager", photo: photo("arbina-recica") },
      { name: "Naoufal Basite", role: "Event Manager", photo: photo("naoufal-basite") },
      { name: "Tugce", role: "Event Manager" },
      { name: "Helena Herrera Freire", role: "Event Manager", photo: photo("helena-herrera-freire") },
    ],
  },
  {
    id: "pr",
    name: "PR",
    members: [
      { name: "Michelle Vervoort", role: "PR Director", photo: photo("michelle-vervoort"), lead: true },
      { name: "Hayi Rebar Hashim", role: "PR Manager", photo: photo("hayi-rebar-hashim") },
      { name: "Thibeau Smets", role: "PR Manager", photo: photo("thibeau-smets") },
      { name: "Sander Roedig", role: "PR Manager", photo: photo("sander-roedig") },
      { name: "Frie Vermeersch", role: "PR Manager", photo: photo("frie-vermeersch") },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    members: [
      { name: "Ilian Costa", role: "Marketing Director", photo: photo("ilian-costa"), lead: true },
      { name: "Can Demet", role: "Marketing Manager", photo: photo("can-demet") },
      { name: "Lara Alper", role: "Marketing Manager", photo: photo("lara-alper") },
      { name: "Babatunde Agunloye", role: "Marketing Manager", photo: photo("babatunde-agunloye") },
      { name: "Safia El Mamoun", role: "Marketing Manager", photo: photo("safia-el-mamoun") },
      { name: "Ben Alp Celik", role: "Marketing Manager", photo: photo("ben-alp-celik") },
      { name: "Julie Geeraerts", role: "Marketing Manager", photo: photo("julie-geeraerts") },
    ],
  },
];

export const allMembers = departments.flatMap((d) => d.members);
