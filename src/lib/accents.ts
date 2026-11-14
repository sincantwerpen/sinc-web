import type { Pillar } from "@/content";

/**
 * SINC's four colours. Each pillar and each team department has one, the same pairs everywhere:
 * Inspireren / Voorzitters = blue, Informeren / Marketing = green, Connecteren / PR = purple,
 * Activeren / Events = yellow. Class names are written out in full so Tailwind finds them.
 */
export type Accent = "blue" | "green" | "purple" | "yellow";

export const accents: Record<
  Accent,
  {
    solid: string;
    onSolid: string;
    text: string;
    soft: string;
    ring: string;
    hoverRing: string;
    border: string;
    hoverSolid: string;
    from: string;
    glow: string;
  }
> = {
  blue: {
    solid: "bg-blue",
    onSolid: "text-white",
    text: "text-blue",
    soft: "bg-blue/20",
    ring: "ring-blue/60",
    hoverRing: "hover:ring-blue/70",
    border: "border-blue/50",
    hoverSolid: "hover:bg-blue hover:text-white hover:ring-blue",
    from: "from-blue",
    glow: "from-blue/45",
  },
  green: {
    solid: "bg-green",
    onSolid: "text-ink",
    text: "text-green",
    soft: "bg-green/20",
    ring: "ring-green/60",
    hoverRing: "hover:ring-green/70",
    border: "border-green/50",
    hoverSolid: "hover:bg-green hover:text-ink hover:ring-green",
    from: "from-green",
    glow: "from-green/45",
  },
  purple: {
    solid: "bg-purple",
    onSolid: "text-white",
    text: "text-purple",
    soft: "bg-purple/25",
    ring: "ring-purple/70",
    hoverRing: "hover:ring-purple/80",
    border: "border-purple/60",
    hoverSolid: "hover:bg-purple hover:text-white hover:ring-purple",
    from: "from-purple",
    glow: "from-purple/50",
  },
  yellow: {
    solid: "bg-yellow",
    onSolid: "text-ink",
    text: "text-yellow",
    soft: "bg-yellow/20",
    ring: "ring-yellow/60",
    hoverRing: "hover:ring-yellow/70",
    border: "border-yellow/50",
    hoverSolid: "hover:bg-yellow hover:text-ink hover:ring-yellow",
    from: "from-yellow",
    glow: "from-yellow/40",
  },
};

export const pillarAccent: Record<Pillar, Accent> = {
  Inspireren: "blue",
  Informeren: "green",
  Connecteren: "purple",
  Activeren: "yellow",
};

/** Team departments by id (see content/nl/team.ts). Unknown departments get blue. */
const departmentAccents: Record<string, Accent> = {
  voorzitters: "blue",
  marketing: "green",
  pr: "purple",
  events: "yellow",
};
export const departmentAccent = (id: string): Accent => departmentAccents[id] ?? "blue";
