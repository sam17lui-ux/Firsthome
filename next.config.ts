import type { NextConfig } from "next";
import path from "path";

const root = process.cwd();

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@/components": path.join(root, "components"),
      "@/lib": path.join(root, "lib"),
    },
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.join(root, "components"),
      "@/lib": path.join(root, "lib"),
    };
    return config;
  },
};

export default nextConfig;
