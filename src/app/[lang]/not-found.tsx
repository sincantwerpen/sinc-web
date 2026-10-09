import { getT } from "@/content/server";
import { Button, Eyebrow } from "@/components/ui";

export default async function NotFound() {
  const { notFound, siteMeta } = await getT();
  return (
    <main className="relative isolate overflow-hidden">
      <title>{`${siteMeta.pages.notFound} | SINC Antwerpen`}</title>
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 size-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 glow text-blue/25" />
      <div className="container-x flex min-h-[100svh] flex-col items-start justify-center gap-7 pb-24 pt-36">
        <Eyebrow>{notFound.eyebrow}</Eyebrow>
        <p aria-hidden className="text-display -my-4 text-[clamp(120px,26vw,360px)] leading-[0.8] text-blue">404</p>
        <h1 className="text-display max-w-[900px] text-[min(clamp(40px,6vw,96px),11vw)]">{notFound.title}</h1>
        <p className="max-w-[560px] text-lg leading-[1.6] text-cream/70">{notFound.text}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={notFound.home.href}>{notFound.home.label}</Button>
          <Button href={notFound.events.href} variant="ghost">
            {notFound.events.label}
          </Button>
        </div>
      </div>
    </main>
  );
}
