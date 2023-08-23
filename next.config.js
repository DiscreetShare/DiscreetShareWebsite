/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: 'http://na-ny1.galaxynodes.cloud:1828/upload',
      },
    ];
  },
}

module.exports = nextConfig;