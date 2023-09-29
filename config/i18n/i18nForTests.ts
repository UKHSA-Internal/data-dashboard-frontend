import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import common from '../../public/locales/en/common.json'
import errors from '../../public/locales/en/errors.json'
import formatters from './formatters'

export const defaultNS = 'common'
export const resources = {
  en: {
    common,
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
