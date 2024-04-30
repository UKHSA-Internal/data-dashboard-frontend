/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // experimental: {
  //   typedRoutes: true,
  // },
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
