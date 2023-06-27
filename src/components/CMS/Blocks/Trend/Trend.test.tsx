import { render, screen } from '@/config/test-utils'
import { StoreState } from '@/lib/store'
import StoreProvider from '@/lib/StoreProvider'

import { Trend } from './Trend'

test('Displays a trend from the store that was successfully fetched', () => {
  const trends: StoreState['trends'] = {
    'mocked-trends': {
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_value: -3.0,
        colour: 'green',
        direction: 'down',
      },
    },
  }

  render(
    <StoreProvider {...{ trends }}>
      <Trend heading="Happy path" id="mocked" />
    </StoreProvider>
  )

  expect(screen.getByText('Happy path: -592 (-3%), downward positive trend'))
})

test('Handles a trend from the store that failed to fetch', () => {
  const trends: StoreState['trends'] = {
    'mocked-trends': {
      success: false,
    },
  }
  const { container } = render(
    <StoreProvider {...{ trends }}>
      <Trend heading="Unhappy path" id="mocked" />
    </StoreProvider>
  )

  expect(container.firstChild).toBeNull()
  expect(screen.queryByText('Unhappy path')).not.toBeInTheDocument()
})
