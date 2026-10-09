import type { Metadata } from "next";
import Image from "next/image";
import { getT, pageMeta } from "@/content/server";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/page/ContactForm";
import { PhotoStrip } from "@/components/page/PhotoColumns";
import { Button, Reveal, RevealText } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMeta("/contact", "contact", t.contactPage.lead);
}

export default async function ContactPage() {
  const { contactPage } = await getT();
  return (
    <main>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.titleLines}
        lead={contactPage.lead}
        visual={
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-[32px] bg-ink-2/80 p-6 ring-1 ring-white/10 lg:backdrop-blur-xl sm:p-8">
              <div aria-hidden className="absolute -right-20 -top-20 size-[300px] glow text-blue/25" />
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        }
      />

      <section className="pb-8">
        <PhotoStrip photos={contactPage.heroPhotos} />
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="questions-title">
        <div className="container-x flex flex-col gap-12">
          <RevealText id="questions-title" text={contactPage.questionsTitle} className="text-display text-[clamp(38px,5.4vw,84px)]" />
          <div className="grid gap-5 md:grid-cols-2">
            {contactPage.questions.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-ink-2 ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:ring-blue">
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9]">
                    <Image
                      src={q.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                    <h3 className="text-display text-[28px] leading-[1.05]">{q.title}</h3>
                    <Button href={q.cta.href} variant={i === 0 ? "primary" : "light"} className="w-fit">
                      {q.cta.label}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
