import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 使用webpack而不是Turbopack以避免错误
  future: {
    webpack5: true,
  },
};

export default nextConfig;
