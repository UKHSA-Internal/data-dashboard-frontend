import userEvent from '@testing-library/user-event'

import { FilterLinkedSubplotData } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getParentGeography } from '@/app/utils/geography.utils'
import {
  mockGeographyFilters,
  mockSelectedThresholds,
  mockSelectedVaccinations,
  mockTimePeriods,
  render,
  screen,
  waitFor,
} from '@/config/test-utils'

import SubplotFilterCard from './SubplotFilterCard'

jest.mock('@/app/components/cms/About/About', () => ({
  __esModule: true,
  default: ({ content }: any) => <div data-testid="about-content">{content}</div>,
}))

jest.mock('@/app/components/ui/ukhsa/Download/SubplotClientDownload', () => ({
  SubplotClientDownload: () => <div data-testid="subplot-client-download">Download</div>,
}))

jest.mock('@/app/components/ui/ukhsa/Table/SubplotClientTable', () => ({
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

    expect(screen.getByText(/2024/)).toBeInTheDocument()
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

    expect(screen.getByText(/2024/)).toBeInTheDocument()

    const changeButton = screen.getByText('Change Period')
    await user.click(changeButton)

    await waitFor(() => {
      expect(screen.getByText(/2023/)).toBeInTheDocument()
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

    expect(screen.getByText(/Coverage between 2024 \(United Kingdom, England\)/)).toBeInTheDocument()
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
