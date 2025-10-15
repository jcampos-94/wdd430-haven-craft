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
<<<<<<< HEAD
        protocol: 'https',
        hostname: 'www.halcyonyarn.com',
=======
        protocol: "https",
        hostname: "www.halcyonyarn.com",
>>>>>>> 8ad9fb94e77c942efc69a69f61c5973c15aa0a9c
      },
    ],
  },
};

export default nextConfig;
