import userEvent from '@testing-library/user-event'

import {
  DataFilter,
  FilterLinkedSubplotData,
  GeographyFilters,
  ThresholdFilter,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getParentGeography } from '@/app/utils/geography.utils'
import { render, screen, waitFor } from '@/config/test-utils'

import SubplotFilterCard from './SubplotFilterCard'

jest.mock('@/app/components/cms/About/About', () => ({
  __esModule: true,
  default: ({ content }: any) => <div data-testid="about-content">{content}</div>,
}))

jest.mock('@/app/components/cms/Download/SubplotClientDownload', () => ({
  SubplotClientDownload: () => <div data-testid="subplot-client-download">Download</div>,
}))

jest.mock('@/app/components/cms/Table/SubplotClientTable', () => ({
  SubplotClientTable: () => <div data-testid="subplot-client-table">Table</div>,
}))

jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/components/SubplotChart', () => ({
  __esModule: true,
  default: ({ handleTimePeriodChange, handleLatestDate }: any) => (
    <div data-testid="subplot-chart">
      <button onClick={() => handleTimePeriodChange(0)}>Change Period</button>
      <button onClick={() => handleLatestDate('2023-12-31')}>Set Date</button>
    </div>
  ),
}))

jest.mock('@/app/utils/geography.utils', () => ({
  getParentGeography: jest.fn(),
  flattenGeographyObject: jest.fn(() => []),
}))

jest.mock('@/app/utils/date.utils', () => ({
  formatDate: jest.fn((date: string) => `Formatted: ${date}`),
}))

const mockGetParentGeography = getParentGeography as jest.MockedFunction<typeof getParentGeography>

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

const mockSelectedVaccinations: DataFilter[] = [
  {
    id: 'vaccine-1',
    type: 'data_filter',
    value: {
      label: '6-in-1',
      colour: '#FF0000',
      parameters: {
        theme: { label: 'Theme', value: 'immunisation' },
        sub_theme: { label: 'Sub Theme', value: 'childhood-vaccines' },
        topic: { label: '6-in-1', value: '6-in-1' },
        metric: { label: 'Coverage', value: 'coverage' },
        stratum: { label: '12m', value: '12m' },
        sex: { label: 'All', value: 'all' },
        age: { label: 'All', value: 'all' },
      },
      accompanying_points: [],
    },
  },
]

const mockSelectedThresholds: ThresholdFilter[] = [
  {
    id: 'threshold-1',
    type: 'threshold',
    value: {
      label: 'Target',
      colour: '#00FF00',
      boundary_minimum_value: 90,
      boundary_maximum_value: 100,
    },
  },
]

const mockGeographyFilters: GeographyFilters = {
  geography_types: [
    { type: 'geography_filter', value: { label: 'Nation', colour: 'Red', geography_type: 'nation' }, id: '1' },
  ],
}

const mockCardData: FilterLinkedSubplotData = {
  title_prefix: 'Coverage',
  legend_title: 'Coverage %',
  target_threshold: 95,
  target_threshold_label: 'Target',
}

describe('SubplotFilterCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
    mockGetParentGeography.mockReturnValue({
      name: 'United Kingdom',
      geography_code: 'K02000001',
      geography_type: 'United Kingdom',
    })
  })

  test('initializes with last time period index', () => {
    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
      />
    )

    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  test('initializes with null date state', () => {
    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
      />
    )

    const description = screen.queryByText(/Last Updated/)
    expect(description).not.toBeInTheDocument()
  })

  test('updates time period index when handleTimePeriodChange is called', async () => {
    const user = userEvent.setup()

    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
      />
    )

    expect(screen.getByText(/2023/)).toBeInTheDocument()

    const changeButton = screen.getByText('Change Period')
    await user.click(changeButton)

    await waitFor(() => {
      expect(screen.getByText(/2022/)).toBeInTheDocument()
    })
  })

  test('updates description when date is set', async () => {
    const user = userEvent.setup()

    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
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

  test('computes title with geography parent and current time period', () => {
    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
      />
    )

    expect(screen.getByText(/Coverage between 2023 \(United Kingdom, England\)/)).toBeInTheDocument()
  })

  test('renders about tab when about is provided', () => {
    const cardDataWithAbout: FilterLinkedSubplotData = {
      ...mockCardData,
      about: 'About coverage data',
    }

    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={cardDataWithAbout}
        timePeriodTitle="Year selection"
      />
    )

    expect(screen.getByRole('tab', { name: /About/i })).toBeInTheDocument()
    expect(screen.getByTestId('about-content')).toBeInTheDocument()
  })

  test('does not render about tab when about is not provided', () => {
    render(
      <SubplotFilterCard
        geography={mockGeography}
        selectedVaccinations={mockSelectedVaccinations}
        selectedThresholds={mockSelectedThresholds}
        geographyFilters={mockGeographyFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        timePeriodTitle="Year selection"
      />
    )

    expect(screen.queryByRole('tab', { name: /About/i })).not.toBeInTheDocument()
  })
})
