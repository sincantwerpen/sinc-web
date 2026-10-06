import { Hero } from "@/components/Hero";
import { VelocityMarquee } from "@/components/Marquee";
import { Pillars } from "@/components/Pillars";
import { Events } from "@/components/Events";
import { Community } from "@/components/Community";
import { about } from "@/content/site";

export default function Home() {
  const pillarWords = about.pillars.map((p) => p.title);
  return (
    <main>
        <Hero />
        <div className="relative z-10 -rotate-2 border-y border-white/10 bg-blue py-5 text-white shadow-[0_30px_80px_-30px_rgba(0,150,255,0.6)] sm:py-7">
          <VelocityMarquee words={pillarWords} className="text-display text-[clamp(36px,6vw,88px)]" />
        </div>
        <Pillars />
        <Events />
        <Community />
    </main>
  );
}
