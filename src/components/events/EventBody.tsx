// The "Over dit event" text of an event page, shared by the site's own events and the dashboard's.

const TIME = /^(\d{1,2}[:hu]\d{2}(?:\s*[–-]\s*±?\d{1,2}[:hu]\d{2})?)\s*[|–-]?\s*(.*)$/;

/** Text with line breaks; lines that start with a time ("18:30 | Welcome") get a blue timestamp. */
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const m = line.match(TIME);
        return (
          <span key={i} className="block">
            {m ? (
              <>
                <span className="mr-3 inline-block min-w-[3.5em] font-bold tabular-nums text-blue">{m[1]}</span>
                {m[2]}
              </>
            ) : (
              line || "\u00A0"
            )}
          </span>
        );
      })}
    </>
  );
}

/** Renders the "Over dit event" text: "## " = subheading, "- " lines = list, other lines kept as-is. */
export function Body({ blocks }: { blocks: string[] }) {
  return (
    <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-cream/80 sm:text-lg">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          const [head, ...rest] = block.slice(3).split("\n");
          const items = rest.filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
          const other = rest.filter((l) => !l.startsWith("- "));
          return (
            <div key={i} className="mt-6 flex flex-col gap-4 first:mt-0">
              <h3 className="text-display text-[clamp(26px,3vw,36px)] text-cream">{head}</h3>
              {items.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {items.map((it, j) => (
                    <li key={j} className="rounded-full bg-white/[0.06] px-4 py-2 text-[15px] text-cream/85 ring-1 ring-white/10">
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {other.length > 0 && (
                <p>
                  <Lines text={other.join("\n")} />
                </p>
              )}
            </div>
          );
        }
        return (
          <p key={i}>
            <Lines text={block} />
          </p>
        );
      })}
    </div>
  );
}

