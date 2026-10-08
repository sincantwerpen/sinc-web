import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/ecosysteem", destination: "/community", permanent: true }];
  },
};

export default nextConfig;
