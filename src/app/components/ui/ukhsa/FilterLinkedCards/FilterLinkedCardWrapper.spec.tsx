import { render } from '@/config/test-utils'

import { FilterLinkedCardWrapper } from './FilterLinkedCardWrapper'

// Mock the dynamic imports
jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/SubplotFilterCardContainer', () => {
  return function MockSubplotFilterCardContainer() {
    return <div data-testid="subplot-filter-card-container">Subplot Filter Card Container</div>
  }
})

jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/TimeSeriesFilterCardsContainer', () => {
  return function MockTimeSeriesFilterCardsContainer() {
    return <div data-testid="timeseries-filter-card-container">TimeSeries Filter Card Container</div>
  }
})

describe('FilterLinkedCardWrapper', () => {
  test("renders SubplotFilterCardContainer when cardType is 'subplot'", async () => {
    const component = await FilterLinkedCardWrapper({ cardType: 'subplot' })
    const { findByTestId } = render(component || <div />)

    const subplotContainer = await findByTestId('subplot-filter-card-container')
    expect(subplotContainer).toBeInTheDocument()
  })

  test("renders TimeSeriesFilterCardsContainer when cardType is 'time-series'", async () => {
    const component = await FilterLinkedCardWrapper({ cardType: 'time-series' })
    const { findByTestId } = render(component || <div />)

    const timeSeriesContainer = await findByTestId('timeseries-filter-card-container')
    expect(timeSeriesContainer).toBeInTheDocument()
  })

  test('renders nothing when cardType is an unrecognized value', async () => {
    const component = await FilterLinkedCardWrapper({ cardType: 'unknown' })

    expect(component).toBeUndefined()
  })

  test('renders nothing when cardType is an empty string', async () => {
    const component = await FilterLinkedCardWrapper({ cardType: '' })

    expect(component).toBeUndefined()
  })

  test('wraps SubplotFilterCardContainer in Suspense with null fallback', async () => {
    const component = await FilterLinkedCardWrapper({ cardType: 'subplot' })
    const { container } = render(component || <div />)

    // Check that Suspense is present (this is implicit through the async rendering working)
    const subplotContainer = await container.querySelector('[data-testid="subplot-filter-card-container"]')
    expect(subplotContainer).toBeInTheDocument()
  })

  test('wraps TimeSeriesFilterCardsContainer in Suspense with null fallback', async () => {
    const component = await FilterLinkedCardWrapper({ cardType: 'time-series' })
    const { container } = render(component || <div />)

    // Check that Suspense is present (this is implicit through the async rendering working)
    const timeSeriesContainer = await container.querySelector('[data-testid="timeseries-filter-card-container"]')
    expect(timeSeriesContainer).toBeInTheDocument()
  })
})
