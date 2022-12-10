/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["opgg-static.akamaized.net"],
  },
};

module.exports = nextConfig;
