/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@harvest-town/config", "@harvest-town/types"],
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/game',
        destination: '/game/index.html',
      },
    ]
  }
}

module.exports = nextConfig 