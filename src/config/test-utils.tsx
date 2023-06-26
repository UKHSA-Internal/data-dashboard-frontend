/* eslint-disable import/export,no-restricted-imports */
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
// eslint-disable-next-line no-restricted-imports
import { I18nextProvider } from 'react-i18next'

import i18n from '../../config/i18n/i18nForTests'
import { NextIntlProvider } from 'next-intl'

import messages from '../messages/en.json'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <NextIntlProvider messages={messages} locale={'en'}>
        {children}
      </NextIntlProvider>
    </I18nextProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
