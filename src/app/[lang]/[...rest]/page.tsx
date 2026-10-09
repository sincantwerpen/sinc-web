import { notFound } from "next/navigation";

// Unknown addresses are rendered on request (the language segment itself only allows nl and en).
export const dynamicParams = true;

// Any address that doesn't match a page shows the SINC 404 page (inside the site layout).
export default function CatchAll() {
  notFound();
}
