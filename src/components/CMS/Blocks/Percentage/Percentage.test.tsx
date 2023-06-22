import { render, screen } from '@/config/test-utils'

import { Percentage } from './Percentage'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

test('Displays a percentage from the store that was successfully fetched', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-percentages': {
      success: true,
      data: {
        value: 50,
      },
    },
  }

  render(
    <StoreProvider {...{ headlines }}>
      <Percentage heading="Happy path" id="mocked" />
    </StoreProvider>
  )

  expect(screen.getByText('Happy path: 50%'))
})

test('Handles a headline from the store that failed to fetch', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-percentages': {
      success: false,
    },
  }
  const { container } = render(
    <StoreProvider {...{ headlines }}>
      <Percentage heading="Unhappy path" id="mocked" />
    </StoreProvider>
  )

  expect(container.firstChild).toBeNull()
  expect(screen.queryByText('Unhappy path')).not.toBeInTheDocument()
})
