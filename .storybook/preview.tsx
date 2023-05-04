/* eslint-disable no-restricted-imports */
import React from 'react'
import { Preview } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../config/i18n/i18nForTests'

import '../src/styles/globals.css'

const preview: Preview = {
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
      (Story) => (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      ),
    ],
  },
}

export default preview
