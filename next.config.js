/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["opgg-static.akamaized.net", "ddragon.leagueoflegends.com"],
  },
};

module.exports = nextConfig;
