'use client'

import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'

import auth from '../../../public/locales/en/auth.json'
import common from '../../../public/locales/en/common.json'
import errors from '../../../public/locales/en/errors.json'
import metrics from '../../../public/locales/en/metrics.json'
import weatherHealthAlerts from '../../../public/locales/en/weatherHealthAlerts.json'
import whatsNew from '../../../public/locales/en/whatsNew.json'
import { getOptions } from './settings'

i18next.use(initReactI18next).init({
  ...getOptions(),
  supportedLngs: ['en'],
  resources: {
    en: {
      auth,
      common,
      metrics,
      whatsNew,
      weatherHealthAlerts,
      errors,
    },
  },
  lng: 'en',
})

export function useTranslation(ns, options = { lng: 'en' }) {
  return useTranslationOrg(ns, { ...options })
}
