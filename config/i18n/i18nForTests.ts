import i18n from 'i18next'
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next'

import formatters from './formatters'
import common from '../../public/locales/en/common.json'
import topic from '../../public/locales/en/topic.json'
import errors from '../../public/locales/en/errors.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common,
    topic,
    errors,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['common', 'topic', 'errors'],
  resources,
  defaultNS,
  interpolation: {
    format: formatters,
  },
  debug: false,
})

export default i18n
