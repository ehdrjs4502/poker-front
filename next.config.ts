import type { NextConfig } from "next";

export const baseUrl =
  "https://unremunerative-birgit-denticulately.ngrok-free.dev";
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
};

export default nextConfig;
