/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    async rewrites() {
    return [
      {
        source: '/api/upload',
        destination: 'http://na-ny1.galaxynodes.cloud:1828/upload', // Can't recall what the fk this is for so im not removing it in case.
      },
    ];
  },
}

module.exports = nextConfig;
