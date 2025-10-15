import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.visualmindcourses.com',
      },
      {
        protocol: 'https',
        hostname: 'www.halcyonyarn.com',
      },
    ],
  },
};

export default nextConfig;
