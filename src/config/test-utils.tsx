/* eslint-disable no-restricted-imports, import/export -- @testing-library imports/exports are allowed in this file only */
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '../../config/i18n/i18nForTests'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
