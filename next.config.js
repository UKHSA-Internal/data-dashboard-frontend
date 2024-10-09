/* eslint-disable @typescript-eslint/no-var-requires */
const dns = require('dns')

dns.setDefaultResultOrder('ipv4first')

/** @type {import('next').NextConfig} */
const nextConfig = {
  httpAgentOptions: {
    keepAlive: false,
  },
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
