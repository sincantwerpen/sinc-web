import type { Metadata } from "next";
import type { PrivacyBlock } from "@/content";
import { getT, pageMeta } from "@/content/server";
import { Eyebrow, Reveal } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMeta("/privacy", "privacy", t.privacyPage.blocks.find((b) => b.type === "p")?.text ?? "");
}

const linkCls = "font-bold text-blue underline decoration-1 underline-offset-4 break-words hover:text-white";

function Inline({ b }: { b: PrivacyBlock }) {
  if (b.parts)
    return (
      <>
        {b.parts.map((p, i) =>
          p.href ? (
            <a key={i} href={p.href} className={linkCls}>
              {p.text}
            </a>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </>
    );
  if (b.href)
    return (
      <a href={b.href} className={linkCls} target={b.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {b.text}
      </a>
    );
  return <>{b.text}</>;
}

/** Groups consecutive "– item" paragraphs into one list. */
function group(blocks: PrivacyBlock[]) {
  const out: (PrivacyBlock | { type: "ul"; items: PrivacyBlock[] })[] = [];
  for (const b of blocks) {
    const isItem = b.type === "p" && /^[–•]\s/.test(b.text ?? "");
    const last = out[out.length - 1];
    if (isItem && last && last.type === "ul") last.items.push(b);
    else if (isItem) out.push({ type: "ul", items: [b] });
    else out.push(b);
  }
  return out;
}

export default async function PrivacyPage() {
  const { privacyPage } = await getT();
  const blocks = group(privacyPage.blocks);
  return (
    <main className="pb-16 pt-36 sm:pt-44">
      <div className="container-x">
        <div className="mx-auto flex max-w-[820px] flex-col gap-8">
          <Eyebrow>SINC VZW</Eyebrow>
          <h1 className="text-display text-[min(clamp(38px,7vw,104px),10.6vw)]">{privacyPage.title}</h1>
          <Reveal>
            <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-cream/75">
              {blocks.map((b, i) => {
                if (b.type === "ul")
                  return (
                    <ul key={i} className="flex flex-col gap-2 border-l-2 border-blue/50 pl-5">
                      {b.items.map((it, j) => (
                        <li key={j}>{(it.text ?? "").replace(/^[–•]\s/, "")}</li>
                      ))}
                    </ul>
                  );
                if (b.type === "h2")
                  return (
                    <h2 key={i} className="text-display mt-10 text-[clamp(28px,3.4vw,44px)] text-cream">
                      {b.text}
                    </h2>
                  );
                if (b.type === "h3")
                  return (
                    <h3 key={i} className="mt-6 text-[22px] font-bold tracking-[-0.02em] text-cream">
                      {b.text}
                    </h3>
                  );
                return (
                  <p key={i}>
                    <Inline b={b} />
                  </p>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
