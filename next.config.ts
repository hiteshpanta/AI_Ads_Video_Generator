import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource2.heygen.ai",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
