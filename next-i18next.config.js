/* eslint-disable @typescript-eslint/no-var-requires */
const formatters = require('./config/i18n/formatters')

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  // Set debug to true to enable detailed logs in the terminal
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  interpolation: {
    format: formatters,
  },
}
