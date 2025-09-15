import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import auth from '../../public/locales/en/auth.json'
import common from '../../public/locales/en/common.json'
import errors from '../../public/locales/en/errors.json'
import metrics from '../../public/locales/en/metrics.json'
import weatherHealthAlerts from '../../public/locales/en/weatherHealthAlerts.json'
import whatsNew from '../../public/locales/en/whatsNew.json'
import formatters from './formatters'

export const defaultNS = 'common'
export const resources = {
  en: {
    auth,
    common,
    whatsNew,
    weatherHealthAlerts,
    metrics,
    errors,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['auth', 'common', 'topic', 'weatherHealthAlerts', 'whatsNew', 'metrics', 'errors'],
  resources,
  defaultNS,
  interpolation: {
    format: formatters,
    escapeValue: false,
  },
  debug: false,
})

export default i18n
