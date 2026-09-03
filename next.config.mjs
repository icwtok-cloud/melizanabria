/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.mercado-unico.com",
      },
    ],
  },
};

export default nextConfig;
