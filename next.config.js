/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
}

module.exports = nextConfig
