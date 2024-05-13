'use client'

import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'

import adverseWeather from '../../../public/locales/en/adverseWeather.json'
import common from '../../../public/locales/en/common.json'
import errors from '../../../public/locales/en/errors.json'
import metrics from '../../../public/locales/en/metrics.json'
import whatsNew from '../../../public/locales/en/whatsNew.json'
import { getOptions } from './settings'

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  ...getOptions(),
  supportedLngs: ['en'],
  resources: {
    en: {
      common,
      metrics,
      whatsNew,
      adverseWeather,
      errors,
    },
  },
  lng: 'en',
})

export function useTranslation(ns, options = { lng: 'en' }) {
  return useTranslationOrg(ns, { ...options })
}
