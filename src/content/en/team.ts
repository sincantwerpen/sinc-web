// English version of ../nl/team.ts. The people (names, photos, email, LinkedIn) are kept only in the
// Dutch file; here only the page texts, department names and roles are translated.

import { departments as nlDepartments, type Department } from "../nl/team";

export const teamPage = {
  eyebrow: "SINC 2026–2027",
  title: "The team",
  lead: "Our team is made up of a diverse group of students who dedicate a whole year to entrepreneurship in Antwerp and beyond.",
  emailLabel: "Email",
  linkedinLabel: "LinkedIn",
  departmentsLabel: "Departments",
  students: "students",
  band: {
    title: "Would you like to be part of the SINC 2027-2028 team?",
    cta: { label: "Send us a message!", href: "mailto:info@sincantwerpen.be" },
  },
};

const departmentNames: Record<string, string> = { voorzitters: "Presidents" };
const roles: Record<string, string> = { Vicepresident: "Vice President" };

export const departments: Department[] = nlDepartments.map((d) => ({
  ...d,
  name: departmentNames[d.id] ?? d.name,
  members: d.members.map((m) => ({ ...m, role: roles[m.role] ?? m.role })),
}));

export const allMembers = departments.flatMap((d) => d.members);
