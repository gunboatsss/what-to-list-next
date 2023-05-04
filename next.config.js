/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com'
      }
    ]
  },
  headers
}
async function headers() {
  return [{
    source: '/',
    headers: [
      {
        key: 'Access-Control-Allow-Origin',
        value: 'https://api.coingecko.com'
      }
    ]
  }]
}
module.exports = nextConfig