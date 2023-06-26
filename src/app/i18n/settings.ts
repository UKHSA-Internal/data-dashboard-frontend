import formatters from 'config/i18n/formatters'
import type { InitOptions } from 'i18next'

export const fallbackLng = 'en'
export const languages = [fallbackLng]
export const defaultNS = 'common'

export function getOptions(lng: InitOptions['lng'] = fallbackLng, ns: InitOptions['ns'] = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      format: formatters,
    },
  }
}
