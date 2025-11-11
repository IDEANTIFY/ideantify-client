import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
}

export default nextConfig
