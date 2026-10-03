import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/applications/*/quote": ["./public/fonts/NotoSans-Regular.ttf"],
  },
};

export default nextConfig;
