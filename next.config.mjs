/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  experimental: { esmExternals: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
