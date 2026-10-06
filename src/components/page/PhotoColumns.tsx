import Image from "next/image";

/**
 * Three columns of photos that scroll endlessly, the middle one in the opposite
 * direction. Pure CSS animation, pauses on hover.
 */
export function PhotoColumns({ photos }: { photos: string[] }) {
  const cols = [0, 1, 2].map((c) => photos.filter((_, i) => i % 3 === c));
  return (
    <div
      aria-hidden
      className="group relative grid h-[460px] grid-cols-3 gap-3 overflow-hidden [mask-image:linear-gradient(transparent,black_14%,black_86%,transparent)] sm:h-[620px] sm:gap-4"
    >
      {cols.map((col, c) => {
        const items = [...col, ...col, ...col, ...col];
        return (
          <div key={c} className={c === 1 ? "-mt-24" : ""}>
            <div
              className={`flex flex-col gap-3 [--marquee-duration:38s] group-hover:[animation-play-state:paused] sm:gap-4 ${
                c === 1 ? "animate-[marquee-y_38s_linear_infinite_reverse]" : "animate-[marquee-y_38s_linear_infinite]"
              }`}
            >
              {items.map((src, i) => (
                <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-white/10">
                  <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** One horizontal row of tall photos sliding past endlessly. */
export function PhotoStrip({ photos }: { photos: string[] }) {
  const items = [...photos, ...photos];
  return (
    <div aria-hidden className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 animate-marquee gap-4 pr-4 [--marquee-duration:50s] group-hover:[animation-play-state:paused]">
          {items.map((src, i) => (
            <div
              key={i}
              className={`relative aspect-[9/14] w-44 overflow-hidden rounded-[22px] bg-ink-2 ring-1 ring-white/10 sm:w-56 ${i % 2 ? "mt-10" : ""}`}
            >
              <Image src={src} alt="" fill sizes="224px" className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
