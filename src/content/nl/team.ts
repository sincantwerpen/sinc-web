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
      { name: "Mathis Hansen", role: "President", photo: photo("mathis-hansen"), lead: true, email: "mathis.hansen@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/mathis-hansen-322a81356/" },
      { name: "Erika Vliegen", role: "Vicepresident", photo: photo("erika-vliegen"), lead: true, email: "erika.vliegen@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/erika-vliegen-a78590283/" },
    ],
  },
  {
    id: "events",
    name: "Events",
    members: [
      { name: "Julie Vandenryt", role: "Event Director", photo: photo("julie-vandenryt"), lead: true, email: "julie.vandenryt@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/julie-vandenryt/" },
      { name: "Arbina Reçica", role: "Event Manager", photo: photo("arbina-recica"), email: "arbina.reqica@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/arbina-re%C3%A7ica-b2b399405" },
      { name: "Naoufal Basite", role: "Event Manager", photo: photo("naoufal-basite"), email: "naoufal.basite@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/naoufal-basite" },
      { name: "Tugce Cadir", role: "Event Manager", photo: photo("tugce-cadir"), email: "tugce.cadir@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/tugce-cadir-22b37a36a/" },
      { name: "Helena Herrera Freire", role: "Event Manager", photo: photo("helena-herrera-freire"), email: "helena.herrerafreire@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/helena-hf/" },
    ],
  },
  {
    id: "pr",
    name: "PR",
    members: [
      { name: "Michelle Vervoort", role: "PR Director", photo: photo("michelle-vervoort"), lead: true, email: "michelle.vervoort@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/michelle-vervoort/" },
      { name: "Hayi Rebar Hashim", role: "PR Manager", photo: photo("hayi-rebar-hashim"), email: "hayi.hashimrebar@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/hayi-hashimrebar/" },
      { name: "Thibeau Smets", role: "PR Manager", photo: photo("thibeau-smets"), email: "thibeau.smets@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/thibeau-smets/" },
      { name: "Sander Roedig", role: "PR Manager", photo: photo("sander-roedig"), email: "sander.roedig@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/sander-roedig-294494255" },
      { name: "Frie Vermeersch", role: "PR Manager", photo: photo("frie-vermeersch"), email: "frie.vermeersch@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/frie-vermeersch/" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    members: [
      { name: "Ilian Costa", role: "Marketing Director", photo: photo("ilian-costa"), lead: true, email: "ilian.costa@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/ilian-costa/" },
      { name: "Can Demet", role: "Marketing Manager", photo: photo("can-demet"), email: "can.demet@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/candemet/" },
      { name: "Lara Alper", role: "Marketing Manager", photo: photo("lara-alper"), email: "lara.alper@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/lara-alper-98a7a63b4/" },
      { name: "Babatunde Agunloye", role: "Marketing Manager", photo: photo("babatunde-agunloye"), email: "babatunde.agunloye@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/babatunde-agunloye-004483218/" },
      { name: "Safia El Mamoun", role: "Marketing Manager", photo: photo("safia-el-mamoun"), email: "safia.elmamoun@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/safia-el-mamoun-1229b3330/" },
      { name: "Ben Alp Celik", role: "Marketing Manager", photo: photo("ben-alp-celik"), email: "ben.celik@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/bencelik" },
      { name: "Julie Geeraerts", role: "Marketing Manager", photo: photo("julie-geeraerts"), email: "julie.geeraerts@sincantwerpen.be", linkedin: "https://www.linkedin.com/in/julie-g-40a11633b/" },
    ],
  },
];

export const allMembers = departments.flatMap((d) => d.members);
