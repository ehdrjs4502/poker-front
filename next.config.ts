import type { NextConfig } from "next";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";;
const path = "/api/v1"; // 기본 경로

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: `${path}/:path*`,
        destination: `${baseUrl}${path}/:path*`,
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
