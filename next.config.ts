import type { NextConfig } from "next";

// What a page may load: only this site's own scripts, styles, images, fonts and requests (the
// dashboard's images come through /api/media, so they count as own). Nothing from another host
// runs here, and no eval. Inline scripts stay allowed: Next.js puts the page data in them, and
// refusing them needs a nonce per request, which would make every page render per request.
// `npm run dev` needs eval for React's error overlay.
const dev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // `npm run dev` only: open it on a phone via the Mac's address on the home network (192.168.x.x).
  allowedDevOrigins: ["192.168.*.*"],
  poweredByHeader: false,
  images: {
    // The site's own images, and posters/portraits/photos from the SINC dashboard (src/lib/dashboard),
    // which /api/media/ passes on; those carry a version in the query string.
    localPatterns: [{ pathname: "/images/**", search: "" }, { pathname: "/api/media/**" }],
  },
  // On every answer: no other site may frame this one, files keep their declared type, other sites
  // only get the origin as referrer, no page may use camera, microphone, location or payment, and
  // pages load only this site's own files (csp above). HSTS comes from Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  async redirects() {
    // Old WordPress addresses, so links on Google and social media keep working.
    return [
      { source: "/ecosysteem", destination: "/community", permanent: true },
      { source: "/eco-systeem", destination: "/community", permanent: true },
      { source: "/student-ondernemers", destination: "/community#student-ondernemers", permanent: true },
      { source: "/sinc-hub/:path*", destination: "/community", permanent: true },
    ];
  },
};

export default nextConfig;
