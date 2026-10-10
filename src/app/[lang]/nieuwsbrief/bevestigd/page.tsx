import type { Metadata } from "next";
import { getT } from "@/content/server";
import { Button, Eyebrow } from "@/components/ui";
import { Tick } from "@/components/page/Tick";

// Flexmail sends people here after they click the confirmation link in the email.
export async function generateMetadata(): Promise<Metadata> {
  const { newsletterConfirmed } = await getT();
  return { title: `${newsletterConfirmed.title} | SINC Antwerpen`, robots: { index: false } };
}

export default async function NewsletterConfirmed() {
  const { newsletterConfirmed: c } = await getT();
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 size-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 glow text-blue/25" />
      <div className="container-x flex min-h-[100svh] flex-col items-start justify-center gap-7 pb-24 pt-36">
        <Tick />
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="text-display max-w-[900px] text-[min(clamp(44px,7vw,112px),12vw)]">{c.title}</h1>
        <p className="max-w-[560px] text-lg leading-[1.6] text-cream/70">{c.text}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={c.events.href}>{c.events.label}</Button>
          <Button href={c.socials.href} variant="ghost">
            {c.socials.label}
          </Button>
        </div>
      </div>
    </main>
  );
}
