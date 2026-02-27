// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        // Matches the old "manzanos-popshop/terms" route
        source: "/manzanos-popshop/terms",
        destination: "/mps-mobile/terms",
        permanent: true,
      },
      {
        // Matches the old "manzanos-popshop/privacy" route
        source: "/manzanos-popshop/privacy",
        destination: "/mps-web/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
