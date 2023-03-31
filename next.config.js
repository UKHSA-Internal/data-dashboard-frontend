/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['wp-lb-api-1448457284.eu-west-2.elb.amazonaws.com'],
  },
}

module.exports = nextConfig
