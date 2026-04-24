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
      // Legacy rebuild redirects
      { source: '/case-studies',       destination: '/work',       permanent: true },
      { source: '/case-studies/:slug', destination: '/work/:slug', permanent: true },
      // Visual redesign IA renames
      { source: '/about',              destination: '/hassan',     permanent: true },
      { source: '/contact',            destination: '/book',       permanent: true },
      { source: '/blog',               destination: '/notes',      permanent: true },
      { source: '/blog/:slug',         destination: '/notes/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
