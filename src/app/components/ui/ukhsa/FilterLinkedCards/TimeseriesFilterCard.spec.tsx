import userEvent from '@testing-library/user-event'

import { DataFilter, FilterLinkedTimeSeriesData, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getParentGeography } from '@/app/utils/geography.utils'
import { getMinMaxYears } from '@/app/utils/time-period.utils'
import { render, screen, waitFor } from '@/config/test-utils'

import TimeseriesFilterCard from './TimeseriesFilterCard'

jest.mock('@/app/components/cms/About/About', () => ({
  __esModule: true,
  default: ({ content }: any) => <div data-testid="about-content">{content}</div>,
}))

jest.mock('@/app/components/ui/ukhsa/Download/ClientDownload', () => ({
  ClientDownload: () => <div data-testid="client-download">Download</div>,
}))

jest.mock('@/app/components/ui/ukhsa/Table/ClientTable', () => ({
  ClientTable: () => <div data-testid="client-table">Table</div>,
}))

jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/components/TimeseriesClientChart', () => ({
  __esModule: true,
  default: ({ handleLatestDate }: any) => (
    <div data-testid="timeseries-chart">
      <button onClick={() => handleLatestDate('2023-12-31')}>Set Date</button>
    </div>
  ),
}))

jest.mock('@/app/utils/geography.utils', () => ({
  getParentGeography: jest.fn(),
}))

jest.mock('@/app/utils/date.utils', () => ({
  formatDate: jest.fn((date: string) => `Formatted: ${date}`),
}))

jest.mock('@/app/utils/time-period.utils', () => ({
  getMinMaxYears: jest.fn(),
}))

const mockGetParentGeography = getParentGeography as jest.MockedFunction<typeof getParentGeography>
const mockGetMinMaxYears = getMinMaxYears as jest.MockedFunction<typeof getMinMaxYears>

const mockGeography: GeographiesSchemaObject = {
  name: 'England',
  geography_code: 'E92000001',
  geography_type: 'Nation',
  relationships: [
    {
      name: 'United Kingdom',
      geography_code: 'K02000001',
      geography_type: 'United Kingdom',
    },
  ],
}

const mockTimePeriods: TimePeriod[] = [
  {
    id: 'period-1',
    type: 'time_period',
    value: {
      label: '2022',
      date_from: '2022-01-01',
      date_to: '2022-12-31',
    },
  },
  {
    id: 'period-2',
    type: 'time_period',
    value: {
      label: '2023',
      date_from: '2023-01-01',
      date_to: '2023-12-31',
    },
  },
]

const mockDataFilters: DataFilter[] = [
  {
    id: 'filter-1',
    type: 'data_filter',
    value: {
      label: 'COVID-19 Cases',
      colour: '#FF0000',
      parameters: {
        theme: { label: 'Theme', value: 'infectious_disease' },
        sub_theme: { label: 'Sub Theme', value: 'respiratory' },
        topic: { label: 'COVID-19', value: 'COVID-19' },
        metric: { label: 'Cases', value: 'new_cases_7days_sum' },
        stratum: { label: 'All', value: 'default' },
        sex: { label: 'All', value: 'all' },
        age: { label: 'All', value: 'all' },
      },
      accompanying_points: [],
    },
  },
]

const mockCardData: FilterLinkedTimeSeriesData = {
  title_prefix: 'Cases',
  legend_title: 'Number of cases',
}

describe('TimeseriesFilterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
    mockGetParentGeography.mockReturnValue({
      name: 'United Kingdom',
      geography_code: 'K02000001',
      geography_type: 'United Kingdom',
    })
    mockGetMinMaxYears.mockReturnValue({
      minDate: '2022',
      maxDate: '2023',
    })
  })

  test('initializes with null date state', () => {
    render(
      <TimeseriesFilterCard
        geography={mockGeography}
        timePeriods={mockTimePeriods}
        dataFilters={mockDataFilters}
        cardData={mockCardData}
      />
    )

    const description = screen.queryByText(/Last Updated/)
    expect(description).not.toBeInTheDocument()
  })

  test('updates description when date is set', async () => {
    const user = userEvent.setup()

    render(
      <TimeseriesFilterCard
        geography={mockGeography}
        timePeriods={mockTimePeriods}
        dataFilters={mockDataFilters}
        cardData={mockCardData}
      />
    )

    expect(screen.queryByText(/Last Updated/)).not.toBeInTheDocument()

    const setDateButton = screen.getByText('Set Date')
    await user.click(setDateButton)

    await waitFor(() => {
      expect(screen.getByText(/Last Updated/)).toBeInTheDocument()
      expect(screen.getByText(/Formatted: 2023-12-31/)).toBeInTheDocument()
    })
  })

  test('computes title with date range and geography', () => {
    render(
      <TimeseriesFilterCard
        geography={mockGeography}
        timePeriods={mockTimePeriods}
        dataFilters={mockDataFilters}
        cardData={mockCardData}
      />
    )

    expect(screen.getByText(/Cases between 2022 - 2023 \(United Kingdom, England\)/)).toBeInTheDocument()
  })

  test('renders about tab when about is provided', () => {
    const cardDataWithAbout: FilterLinkedTimeSeriesData = {
      ...mockCardData,
      about: 'About timeseries data',
    }

    render(
      <TimeseriesFilterCard
        geography={mockGeography}
        timePeriods={mockTimePeriods}
        dataFilters={mockDataFilters}
        cardData={cardDataWithAbout}
      />
    )

    expect(screen.getByRole('tab', { name: /About/i })).toBeInTheDocument()
    expect(screen.getByTestId('about-content')).toBeInTheDocument()
  })

  test('does not render about tab when about is not provided', () => {
    render(
      <TimeseriesFilterCard
        geography={mockGeography}
        timePeriods={mockTimePeriods}
        dataFilters={mockDataFilters}
        cardData={mockCardData}
      />
    )

    expect(screen.queryByRole('tab', { name: /About/i })).not.toBeInTheDocument()
  })
})
