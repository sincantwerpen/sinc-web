import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
