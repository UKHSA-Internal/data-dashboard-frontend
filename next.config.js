/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [process.env.NEXT_PUBLIC_API_URL],
  },
}

module.exports = nextConfig
