import { ZodError } from 'zod'

import { render, screen } from '@/config/test-utils'
import { StoreState } from '@/lib/store'
import StoreProvider from '@/lib/StoreProvider'

import { Headline } from './Headline'

test('Displays a headline from the store that was successfully fetched', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-headlines': {
      success: true,
      data: {
        value: 21000000,
      },
    },
  }

  render(
    <StoreProvider {...{ headlines }}>
      <Headline heading="Happy path" id="mocked" />
    </StoreProvider>
  )

  expect(screen.getByText('Happy path: 21,000,000'))
})

test('Handles a headline from the store that failed to fetch', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-headlines': {
      success: false,
      error: new ZodError([
        {
          received: 'mock',
          code: 'invalid_enum_value',
          options: [],
          path: ['mock'],
          message: 'Invalid',
        },
      ]),
    },
  }
  const { container } = render(
    <StoreProvider {...{ headlines }}>
      <Headline heading="Unhappy path" id="mocked" />
    </StoreProvider>
  )

  expect(container.firstChild).toBeNull()
  expect(screen.queryByText('Unhappy path')).not.toBeInTheDocument()
})
