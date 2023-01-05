/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["opgg-static.akamaized.net", "ddragon.leagueoflegends.com"],
  },

  async rewrites() {
    return [
      {
        destination: "https://ppgg.vercel.app/:path*",
        source: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
