/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'condoroil.uz',  // Add your actual domain
      'storage.googleapis.com',  // If you're using Google Cloud Storage
      'cdn.condoroil.uz'  // Add any other domains you might use
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
