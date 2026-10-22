import Image from "next/image";
import { logoRatios } from "@/content/logoRatios";

/**
 * Partner logo sized by area instead of by height: every logo gets about the same visual weight, so
 * square logos (De Cronos Groep, Vlajo) aren't tiny next to wide ones (The Beacon). Capped to the box.
 */
export function PartnerLogo({
  src,
  alt,
  area = 9000,
  maxWidth = 220,
  maxHeight = 84,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  area?: number;
  maxWidth?: number;
  maxHeight?: number;
  eager?: boolean;
  className?: string;
}) {
  const ratio = logoRatios[src] ?? 3;
  let width = Math.sqrt(area * ratio);
  let height = width / ratio;
  if (width > maxWidth) [width, height] = [maxWidth, maxWidth / ratio];
  if (height > maxHeight) [width, height] = [maxHeight * ratio, maxHeight];
  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(width * 2)}
      height={Math.round(height * 2)}
      loading={eager ? "eager" : undefined}
      style={{ width: Math.round(width), height: Math.round(height) }}
      className={`max-w-full object-contain ${className}`}
    />
  );
}
