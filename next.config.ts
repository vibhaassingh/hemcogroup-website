import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/group", destination: "/world/story", permanent: true },
      { source: "/ventures", destination: "/sectors", permanent: true },
      // The Foundation sector contains a single venture (MVV Foundation),
      // so the sector page and the venture page are merged — every
      // /sectors/foundation link lands directly on the MVV venture.
      {
        source: "/sectors/foundation",
        destination: "/ventures/mvv-foundation",
        permanent: false,
      },
      { source: "/journal", destination: "/world/journal", permanent: true },
      {
        source: "/journal/:slug",
        destination: "/world/journal/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
