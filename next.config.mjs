/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyxfzqdmdruwlofnebji.supabase.co'
      }
    ]
  }
}

export default nextConfig
