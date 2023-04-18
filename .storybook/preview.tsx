import React from 'react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../src/api/msw/handlers'

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
          <div>
            <Story />
          </div>
        )
      },
    ],
    msw: {
      handlers,
    },
  },
}

export default preview
