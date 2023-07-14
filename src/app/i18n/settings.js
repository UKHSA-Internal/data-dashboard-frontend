export const fallbackLng = 'en'
export const languages = [fallbackLng]
export const defaultNS = 'common'

import pagesDirConfig from '../../../next-i18next.config.js'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    ...pagesDirConfig,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
