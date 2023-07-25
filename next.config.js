/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
}

module.exports = nextConfig
