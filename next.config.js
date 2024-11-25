/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'localhost',
      'condoroil.uz',
      'imgur.com',
      'i.imgur.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Recommended performance optimizations
  swcMinify: true,
  // Recommended for production builds
  reactStrictMode: true,
  // Compression for better performance
  compress: true,
  // Improved powered by security header
  poweredByHeader: false,
};

module.exports = nextConfig;
