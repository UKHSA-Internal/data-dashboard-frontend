import formatters from '../../../config/i18n/formatters'

export const fallbackLng = 'en'
export const languages = [fallbackLng]
export const defaultNS = 'common'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // https://www.i18next.com/overview/configuration-options#logging
    // Set debug to true to enable detailed logs in the terminal
    debug: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
    interpolation: {
      format: formatters,
      escapeValue: false,
    },
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
