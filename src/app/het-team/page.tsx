import type { Metadata } from "next";
import { departments, teamPage, type Department } from "@/content/team";
import { TeamHero } from "@/components/team/TeamHero";
import { MemberCard } from "@/components/team/MemberCard";
import { CtaBand } from "@/components/page/Sections";
import { Button, Reveal, RevealText } from "@/components/ui";

export const metadata: Metadata = {
  title: "Het team | SINC Antwerpen",
  description: teamPage.lead,
};

/**
 * Bento grid per department. Leads (president / directors) get a big 2×2 card; on wide screens the
 * cards to the left of the middle fly in from the left, the rest from the right.
 */
/** "Join the team" tile that fills the empty spots at the end of a grid. */
function JoinTile({ span }: { span: number }) {
  const { band } = teamPage;
  return (
    <Reveal className={`col-span-2 ${span === 3 ? "lg:col-span-3" : span === 1 ? "lg:col-span-1" : "lg:col-span-2"}`}>
      <div className="relative flex h-full min-h-[280px] flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-blue p-7 text-white sm:p-9">
        <div aria-hidden className="absolute -right-16 -top-20 size-[340px] glow text-white/20" />
        <h3 className="text-display relative text-[clamp(28px,2.8vw,44px)] leading-[1]" style={{ hyphens: "manual" }}>{band.title}</h3>
        <Button href={band.cta.href} variant="dark" className="relative w-fit">
          {band.cta.label}
        </Button>
      </div>
    </Reveal>
  );
}

function DepartmentSection({ d, last = false }: { d: Department; last?: boolean }) {
  const leads = d.members.filter((m) => m.lead);
  const onlyLeads = leads.length === d.members.length;
  // Fly-in side on the 4-column grid: the lead fills the left half of the first two rows, the first
  // four others fill the right half, and any further row starts again from the left.
  const side = (m: (typeof d.members)[number]): "left" | "right" => {
    if (onlyLeads) return leads.indexOf(m) === 0 ? "left" : "right";
    if (m.lead) return "left";
    const j = d.members.filter((x) => !x.lead).indexOf(m);
    return j < 4 ? "right" : (j - 4) % 4 < 2 ? "left" : "right";
  };
  // Empty cells after the last row on the 4-column grid (lead = 2×2 block + others).
  const others = d.members.length - leads.length;
  const free = onlyLeads || others <= 4 ? 0 : (4 - ((others - 4) % 4)) % 4;
  return (
    <section id={d.id} aria-labelledby={`${d.id}-title`} className="scroll-mt-28 overflow-x-clip py-16 sm:py-24">
      <div className="container-x flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <RevealText id={`${d.id}-title`} text={d.name} className="text-display text-[clamp(52px,9vw,140px)] leading-[0.85]" />
          <span className="mb-2 shrink-0 rounded-full bg-white/8 px-4 py-2 text-[14px] font-bold tabular-nums text-cream/70 ring-1 ring-white/10">
            {d.members.length}
          </span>
        </div>

        <div className={`grid grid-cols-2 gap-4 sm:gap-5 ${onlyLeads ? "lg:grid-cols-2" : "lg:grid-cols-4 lg:grid-flow-dense"}`}>
          {d.members.map((m) => {
            const big = !!m.lead;
            return (
              <div key={m.name} className={big ? (onlyLeads ? "col-span-2 lg:col-span-1" : "col-span-2 lg:row-span-2") : ""}>
                <MemberCard m={m} from={side(m)} big={big} />
              </div>
            );
          })}
          {last && free > 0 && <JoinTile span={free} />}
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  const lastDept = departments[departments.length - 1];
  const lastOthers = lastDept.members.filter((m) => !m.lead).length;
  const lastHasRoom = lastOthers > 4 && (lastOthers - 4) % 4 !== 0;
  return (
    <main>
      <TeamHero />
      {departments.map((d, i) => (
        <DepartmentSection key={d.id} d={d} last={i === departments.length - 1} />
      ))}
      {/* the join call-to-action fills the last grid when there is room, otherwise it gets its own band */}
      {lastHasRoom ? <div className="h-16" /> : <CtaBand title={teamPage.band.title} cta={teamPage.band.cta} />}
    </main>
  );
}
