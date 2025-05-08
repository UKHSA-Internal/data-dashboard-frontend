/* eslint-disable @typescript-eslint/no-var-requires */
const dns = require('dns')

dns.setDefaultResultOrder('ipv4first')

const sharedCache = process.env.CACHING_V2_ENABLED === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: sharedCache ? require.resolve('./cache-handler.mjs') : undefined,
  cacheMaxMemorySize: 0, // Disable default in-memory caching
  output: 'standalone',
  staticPageGenerationTimeout: 1000,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig
