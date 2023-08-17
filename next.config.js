/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  staticPageGenerationTimeout: 600,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig
