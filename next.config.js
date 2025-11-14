const dns = require('dns')

dns.setDefaultResultOrder('ipv4first')

const sharedCache = process.env.CACHING_V2_ENABLED === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: sharedCache ? require.resolve('./cache-handler.mjs') : undefined,
  cacheMaxMemorySize: 10000000, // set default max memory size to 10Mb
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
