import type { InitOptions } from 'i18next'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

type Language = InitOptions['lng']
type Namespace = InitOptions['ns']

const initI18next = async (lng: Language, ns: Namespace) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(ns: string) {
  const i18nextInstance = await initI18next('en', ns)
  return {
    t: i18nextInstance.getFixedT('en'),
    i18n: i18nextInstance,
  }
}
