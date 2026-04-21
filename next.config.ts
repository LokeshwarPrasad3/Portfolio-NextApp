import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "attachment",
    qualities: [75, 80, 85, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "skillicons.dev" },
      { protocol: "https", hostname: "lokeshwardewangan.in" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  compress: true,
  productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://picsum.photos https://skillicons.dev https://lokeshwardewangan.in https://avatars.githubusercontent.com; font-src 'self'; connect-src 'self' blob: data: https://api.github.com; worker-src 'self' blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
