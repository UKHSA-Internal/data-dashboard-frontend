/* eslint-disable no-restricted-imports */
import React from 'react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { I18nextProvider } from 'react-i18next'
import { handlers } from '../src/api/msw/handlers'
import i18n from '../config/i18n/i18nForTests'

import '../src/styles/globals.css'

// Initialize MSW
initialize()

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator]

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'grey',
          value: '#f3f2f1',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    decorators: [
      (Story) => {
        return (
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        )
      },
    ],
    msw: {
      handlers,
    },
  },
}

export default preview
