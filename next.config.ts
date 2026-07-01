import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
