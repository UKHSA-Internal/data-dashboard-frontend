import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { getOptions } from './settings'
import { TFunction } from 'i18next';

const initI18next = async (lng, ns) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`../../../public/locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function getServerTranslation(ns, options = { lng: 'en' }) {
  const i18nextInstance = await initI18next(options.lng, ns);

  // Create a fixed t function
  const fixedT = i18nextInstance.getFixedT(options.lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix);

  // Create a wrapper to decode HTML entities
  function decodeHTMLEntities(str) {
    if (!str || typeof str !== 'string') return str;
    const txt = typeof window !== 'undefined' ? document.createElement('textarea') : null;

    if (txt) {
      txt.innerHTML = str;
      return txt.value;
    } else {
      // Fallback for SSR (basic decoding of common entities)
      return str
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  }

  // Wrap the t function to decode HTML entities
  const t: TFunction = ((...args: any[]) => {
    const result = fixedT(...args);
    return decodeHTMLEntities(result);
  }) as TFunction;

  return {
    t,
    i18n: i18nextInstance,
  };
}
