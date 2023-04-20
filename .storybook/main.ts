import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: (config) => {
    if (config.resolve?.fallback)
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        stream: false,
        zlib: false,
        timers: false,
      }

    return config
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}
export default config
