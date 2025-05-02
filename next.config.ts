import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "airbnbnew.cybersoft.edu.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s1.media.ngoisao.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
