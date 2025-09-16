/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  }
}

module.exports = nextConfig

