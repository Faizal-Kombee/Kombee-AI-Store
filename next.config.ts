import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Simple config to avoid Turbopack root issues
};

export default nextConfig;
