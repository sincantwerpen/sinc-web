import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The site's own images, and posters/portraits/photos from the SINC dashboard (src/lib/dashboard),
    // which /api/media/ passes on; those carry a version in the query string.
    localPatterns: [{ pathname: "/images/**", search: "" }, { pathname: "/api/media/**" }],
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
