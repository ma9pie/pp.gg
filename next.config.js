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
  async rewrites() {
    return [
      {
        destination: "https://ppgg.vercel.app/api/v1/:path*",
        source: "/api/v1/:path*",
      },
    ];
  },
  async rewrites() {
    return [
      {
        destination: "http://localhost:3000/:path*",
        source: "/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
