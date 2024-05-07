import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import adverseWeather from '../../public/locales/en/adverseWeather.json'
import common from '../../public/locales/en/common.json'
import errors from '../../public/locales/en/errors.json'
import metrics from '../../public/locales/en/metrics.json'
import whatsNew from '../../public/locales/en/whatsNew.json'
import formatters from './formatters'

export const defaultNS = 'common'
export const resources = {
  en: {
    common,
    whatsNew,
    adverseWeather,
    metrics,
    errors,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['common', 'topic', 'adverseWeather', 'whatsNew', 'metrics', 'errors'],
  resources,
  defaultNS,
  interpolation: {
    format: formatters,
  },
  debug: false,
})

export default i18n
