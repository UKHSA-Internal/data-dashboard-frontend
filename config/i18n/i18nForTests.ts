import i18n from 'i18next'
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next'

import formatters from './formatters'
import common from '../../public/locales/en/common.json'
import errors from '../../public/locales/en/errors.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      common,
      errors,
    },
  },
  interpolation: {
    format: formatters,
  },
  debug: false,
})

export default i18n
