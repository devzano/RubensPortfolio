// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // This disables Vercel's processing for ALL images globally
  },
};

export default nextConfig;
