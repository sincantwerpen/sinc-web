import { NextResponse, type NextRequest } from "next/server";

// Dutch pages keep their normal addresses (/events) but live in app/[lang] as /nl/events, so those
// requests are rewritten internally. English pages are under /en. /nl/... in the address bar is
// redirected to the address without /nl.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return;
  const url = request.nextUrl.clone();
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/nl${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except API routes, Next.js internals and files (anything with a dot, e.g. /icon.png).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
