// What the SINC dashboard (dashboard.sincantwerpen.be) sends: GET /api/public/site and the
// ticket / payment answers. The dashboard is the single source of events, the team page and
// replaced photos; this site only shows them. See README "Dashboard".

export type DashLang = "NL" | "EN";
export type Labels = Record<DashLang, string>;
export type Choice = { id: string; labels: Labels };

export type DashTicketType = { id: string; name: string; description?: string; priceCents: number; placesLeft: number | null };

export type DashCustomField = {
  id: string;
  type: "text" | "textarea" | "number" | "select";
  required?: boolean;
  options?: { id: string; labels: Labels }[];
  labels: Labels;
};

export type DashEvent = {
  id: string;
  category: "inspireren" | "informeren" | "connecteren" | "activeren";
  date: string;
  startTime: string;
  endTime?: string;
  startsAt: string | null;
  endsAt: string | null;
  location: string;
  recurrence: unknown;
  price: { free: boolean; label?: string };
  /** Path on the dashboard (/api/public/...), loaded through /api/media/. */
  image: string | null;
  ended: boolean;
  cancelled: boolean;
  registrationMode: "sinc" | "luma";
  lumaUrl?: string;
  placesLeft: number | null;
  waitlist: boolean;
  ticketTypes: DashTicketType[];
  registration: {
    enabled: boolean;
    fields: { phone: boolean; dietary: boolean; comment: boolean };
    fieldSettings: Partial<Record<string, { labels?: Partial<Labels>; required?: boolean; hide?: string[]; noOther?: boolean }>>;
    customFields: DashCustomField[];
    extraConfirm: { labels: Labels } | null;
  };
  items: Partial<Record<DashLang, { title: string; subtitle?: string; description: string; notice?: string }>>;
  preview?: boolean;
};

export type DashMember = {
  id: string;
  name: string;
  role: Labels;
  photo: string | null;
  email: string | null;
  linkedin: string | null;
  lead: boolean;
};

export type SitePayload = {
  events: DashEvent[];
  homepage: string[];
  team: { id: string; name: Labels; members: DashMember[] }[];
  /** Website path of a photo -> its replacement (a dashboard path). */
  photos: Record<string, string>;
  choices: { schools: Choice[]; studyYears: Choice[]; entrepreneurStages: Choice[] };
  at: string;
};

export type GuestTicket = {
  id: string;
  number: string;
  state: "ticket" | "checked_in" | "pay" | "review" | "waitlist" | "cancelled";
  lang: DashLang;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    school: string;
    fieldOfStudy: string;
    studyYear: string;
    entrepreneurStage: string;
  };
  ticketType: string | null;
  qrSvg: string | null;
  checkedInAt: string | null;
  payToken: string | null;
  priceCents: number;
  event: {
    id: string;
    titles: Partial<Record<DashLang, string>>;
    date: string;
    startTime: string;
    endTime: string | null;
    startsAt: string | null;
    endsAt: string | null;
    location: string;
    image: string | null;
    ended: boolean;
    cancelled: boolean;
  };
  canChange: boolean;
  canCancel: boolean;
  otherTypes: { id: string; name: string; available: boolean }[];
};

export type PaymentInfo = {
  state: "open" | "review" | "paid" | "closed";
  name: string;
  titles: Partial<Record<DashLang, string>>;
  date: string | null;
  details: { firstName: string; lastName: string; iban: string; amount: string; reference: string } | null;
  proof: { at: string; name: string | null } | null;
  rejected: { at: string; reason: string | null } | null;
};
