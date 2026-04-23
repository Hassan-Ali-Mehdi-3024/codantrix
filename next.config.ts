import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/case-studies/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
