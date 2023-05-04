import { render, screen } from '@/config/test-utils'
import { Chart } from './Chart'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

test('Displays a chart from the store that was successfully fetched', () => {
  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: true,
      data: 'mocked-svg-data',
    },
  }

  render(
    <StoreProvider {...{ charts }}>
      <Chart id="mocked" />
    </StoreProvider>
  )

  expect(screen.getByAltText('')).toHaveAttribute('src', 'data:image/svg+xml;utf8,mocked-svg-data')
})

test('Handles a chart from the store that failed to fetch', () => {
  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: false,
    },
  }
  render(
    <StoreProvider {...{ charts }}>
      <Chart id="mocked" />
    </StoreProvider>
  )

  expect(screen.queryByAltText('')).not.toBeInTheDocument()
})
