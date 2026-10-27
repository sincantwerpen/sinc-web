import { Button } from "@/components/ui";

/** A ticket or payment link that does not work (any more), in the site's style. */
export function NoticePage({ title, text }: { title: string; text: string }) {
  return (
    <main className="container-x flex min-h-[70vh] flex-col items-start justify-center gap-6 pb-24 pt-36">
      <h1 className="text-display text-[clamp(44px,7vw,88px)]">{title}</h1>
      <p className="max-w-[560px] text-lg leading-[1.6] text-cream/70">{text}</p>
      <Button href="/events">Events</Button>
    </main>
  );
}
