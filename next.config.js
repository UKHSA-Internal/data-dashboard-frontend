/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
}

module.exports = nextConfig
