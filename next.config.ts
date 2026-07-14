import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**", pathname: "/**" }],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/learn", permanent: true },
      { source: "/how-it-works", destination: "/learn", permanent: true },
      { source: "/faq", destination: "/learn", permanent: true },
    ];
  },
};

export default nextConfig;
