/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enabled optimization for better performance on VPS
  },
}

export default nextConfig
