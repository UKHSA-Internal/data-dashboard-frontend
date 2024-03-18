'use client'

// Adapted from this tutorial:
// https://locize.com/blog/next-app-dir-i18n/

import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'

import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace) => import(`../../../public/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  })

export function useTranslation(ns, options = { lng: 'en' }) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && options.lng && i18n.resolvedLanguage !== options.lng) {
    i18n.changeLanguage(lng)
  } else {
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])

    useEffect(() => {
      if (!options.lng || i18n.resolvedLanguage === options.lng) return
      i18n.changeLanguage(options.lng)
    }, [options.lng, i18n])
  }
  return ret
}
