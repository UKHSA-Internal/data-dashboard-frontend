// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  output: 'standalone',
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
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
