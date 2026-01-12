import { waitFor } from '@testing-library/dom'

import { DataFilter, FilterLinkedSubplotData } from '@/api/models/cms/Page/GlobalFilter'
import { ChartResponse } from '@/api/requests/charts/getCharts'
import { getSubplots } from '@/api/requests/charts/subplot/getSubplots'
import { useErrorData } from '@/app/hooks/globalFilterHooks'
import { flattenGeographyObject, getGeographyColourSelection } from '@/app/utils/geography.utils'
import { mapThresholdsToMetricValueRanges } from '@/app/utils/threshold.utils'
import {
  mockGeography,
  mockGeographyFilters,
  mockSelectedThresholds,
  mockSelectedVaccinations,
  mockTimePeriods,
  render,
  screen,
} from '@/config/test-utils'

import SubplotClientChart from './SubplotChart'

// Mock getSubplots API
jest.mock('@/api/requests/charts/subplot/getSubplots')
const getSubplotsMock = jest.mocked(getSubplots)

// Mock useErrorData hook
const mockSetChartRequestErrors = jest.fn()
const mockRemoveChartRequestError = jest.fn()
const mockClearChartRequestErrors = jest.fn()
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  ...jest.requireActual('@/app/hooks/globalFilterHooks'),
  useErrorData: jest.fn(),
}))
const mockUseErrorData = useErrorData as jest.MockedFunction<typeof useErrorData>

// Mock utility functions
jest.mock('@/app/utils/geography.utils', () => ({
  ...jest.requireActual('@/app/utils/geography.utils'),
  flattenGeographyObject: jest.fn(),
  getGeographyColourSelection: jest.fn(),
}))
const mockFlattenGeographyObject = flattenGeographyObject as jest.MockedFunction<typeof flattenGeographyObject>
const mockGetGeographyColourSelection = getGeographyColourSelection as jest.MockedFunction<
  typeof getGeographyColourSelection
>

jest.mock('@/app/utils/threshold.utils', () => ({
  ...jest.requireActual('@/app/utils/threshold.utils'),
  mapThresholdsToMetricValueRanges: jest.fn(),
}))
const mockMapThresholdsToMetricValueRanges = mapThresholdsToMetricValueRanges as jest.MockedFunction<
  typeof mapThresholdsToMetricValueRanges
>

// Mock ChartInteractive
jest.mock('@/app/components/cms/ChartInteractive/ChartInteractive', () => ({
  __esModule: true,
  default: ({ figure }: any) => (
    <div data-testid="chart-interactive">Chart Interactive: {figure?.layout?.title || 'No title'}</div>
  ),
}))

// Mock ClientInformationCard
jest.mock('@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard', () => ({
  __esModule: true,
  default: ({ variant, title, message }: any) => (
    <div data-testid={`client-info-card-${variant}`}>
      {title && <h2>{title}</h2>}
      {message && <p>{message}</p>}
    </div>
  ),
}))

// Mock TimePeriodSelector
jest.mock('@/app/components/ui/ukhsa/TimePeriodSelector/TimePeriodSelector', () => ({
  TimePeriodSelector: ({ timePeriods, currentTimePeriodIndex, onTimePeriodChange, timePeriodTitle }: any) => (
    <div data-testid="time-period-selector">
      <div data-testid="time-period-count">{timePeriods?.length || 0}</div>
      <div data-testid="current-index">{currentTimePeriodIndex}</div>
      <div data-testid="time-period-title">{timePeriodTitle}</div>
      <button onClick={() => onTimePeriodChange(1)}>Change Period</button>
    </div>
  ),
}))

const mockCardData: FilterLinkedSubplotData = {
  title_prefix: 'Coverage',
  legend_title: 'Coverage %',
  target_threshold: 95,
  target_threshold_label: 'Target',
  about: 'About coverage data',
}

const mockChartResponse: ChartResponse = {
  chart: 'mock-svg-string',
  last_updated: '2024-03-31',
  alt_text: 'Mock alt text',
  figure: {
    data: [
      {
        marker: { color: ['rgba(51, 25, 77, 1)'] },
        name: 'England',
        x: ['6-in-1 (12 months)'],
        y: [91.61],
        type: 'bar',
      },
    ],
    layout: {
      title: 'Coverage Chart',
      xaxis: { anchor: 'y', domain: [0, 1] },
      yaxis: { anchor: 'x', domain: [0, 1] },
    },
  },
}

const mockFlattenedGeographies = [
  {
    name: 'England',
    geography_code: 'E92000001',
    geography_type: 'Nation',
  },
]

describe('SubplotClientChart', () => {
  const mockHandleTimePeriodChange = jest.fn()
  const mockHandleLatestDate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()

    mockUseErrorData.mockReturnValue({
      chartRequestErrors: [],
      setChartRequestErrors: mockSetChartRequestErrors,
      clearChartRequestErrors: mockClearChartRequestErrors,
      removeChartRequestError: mockRemoveChartRequestError,
    })

    mockFlattenGeographyObject.mockReturnValue(mockFlattenedGeographies)
    mockGetGeographyColourSelection.mockReturnValue('COLOUR_1_DARK_BLUE')
    mockMapThresholdsToMetricValueRanges.mockReturnValue([{ start: '90', end: '100' }])
  })

  test('renders loading state initially', async () => {
    getSubplotsMock.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-loading')).toBeInTheDocument()
      expect(screen.getByText('Chart loading')).toBeInTheDocument()
      expect(screen.getByText('Requesting chart based on selected filters')).toBeInTheDocument()
    })
  })

  test('renders chart when API call succeeds', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('chart-interactive')).toBeInTheDocument()
      expect(screen.getByTestId('time-period-selector')).toBeInTheDocument()
    })
  })

  test('renders error state when API call fails', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('error')).toBeInTheDocument()
      expect(screen.getByText('No data available for the selected chart filters')).toBeInTheDocument()
      expect(screen.getByTestId('time-period-selector')).toBeInTheDocument()
    })
  })

  test('renders error state when exception occurs', async () => {
    getSubplotsMock.mockRejectedValueOnce(new Error('Network error'))

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('error')).toBeInTheDocument()
    })
  })

  test('calls getSubplots with correct parameters', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledWith({
        file_format: 'svg',
        chart_height: 260,
        chart_width: 515,
        x_axis_title: 'Vaccination type',
        y_axis_title: 'Coverage %',
        y_axis_minimum_value: null,
        y_axis_maximum_value: null,
        target_threshold: 95,
        target_threshold_label: 'Target',
        chart_parameters: {
          x_axis: 'geography',
          y_axis: 'metric',
          theme: 'immunisation',
          sub_theme: 'childhood_vaccines',
          date_from: '2023-01-01',
          date_to: '2023-12-31',
          age: 'all',
          sex: 'all',
          stratum: '24m',
          metric_value_ranges: [{ start: '90', end: '100' }],
        },
        subplots: [
          {
            subplot_title: '6-in-1 (12 months)',
            subplot_parameters: {
              topic: '6-in-1',
              metric: '6-in-1_coverage_coverageByYear',
              stratum: '12m',
            },
            plots: [
              {
                label: 'England',
                geography_type: 'Nation',
                geography: 'England',
                line_colour: 'COLOUR_1_DARK_BLUE',
              },
            ],
          },
        ],
      })
    })
  })

  test('calls handleLatestDate with last_updated when chart response is received', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith('2024-03-31')
    })
  })

  test('calls handleLatestDate with null when chart response is cleared', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith('2024-03-31')
    })

    // Change a dependency to trigger re-fetch
    rerender(
      <SubplotClientChart
        selectedVaccinations={[]}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith(null)
    })
  })

  test('calls removeChartRequestError on fetch start', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockRemoveChartRequestError).toHaveBeenCalledWith('subplot-E92000001')
    })
  })

  test('calls setChartRequestErrors when API response is unsuccessful', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockSetChartRequestErrors).toHaveBeenCalledWith({
        id: 'subplot-E92000001',
        error: expect.any(String),
      })
    })
  })

  test('re-fetches data when currentTimePeriodIndex changes', async () => {
    getSubplotsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledTimes(1)
    })

    // Change time period index
    rerender(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={1}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledTimes(2)
      // Verify it was called with the new date range
      expect(getSubplotsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          chart_parameters: expect.objectContaining({
            date_from: '2024-01-01',
            date_to: '2024-12-31',
          }),
        })
      )
    })
  })

  test('re-fetches data when selectedVaccinations changes', async () => {
    getSubplotsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledTimes(1)
    })

    // Change vaccinations
    const newVaccinations: DataFilter[] = [
      ...mockSelectedVaccinations,
      {
        id: 'vaccination-2',
        type: 'data_filter',
        value: {
          label: 'MMR (12 months)',
          colour: '#00FF00',
          parameters: {
            theme: { label: 'Theme', value: 'immunisation' },
            sub_theme: { label: 'Sub Theme', value: 'childhood_vaccines' },
            topic: { label: 'MMR', value: 'MMR' },
            metric: { label: 'Coverage', value: 'MMR_coverage' },
            stratum: { label: '12 months', value: '12m' },
            sex: { label: 'All', value: 'all' },
            age: { label: 'All Ages', value: 'all' },
          },
          accompanying_points: [],
        },
      },
    ]

    rerender(
      <SubplotClientChart
        selectedVaccinations={newVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledTimes(2)
    })
  })

  test('handles empty selectedThresholds', async () => {
    mockMapThresholdsToMetricValueRanges.mockReturnValueOnce([])

    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={[]}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockMapThresholdsToMetricValueRanges).toHaveBeenCalledWith([])
      expect(getSubplotsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          chart_parameters: expect.objectContaining({
            metric_value_ranges: [],
          }),
        })
      )
    })
  })

  test('calls handleLatestDate with null when chartResponse is null', async () => {
    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith('2024-03-31')
    })

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith(null)
    })
  })

  test('handles chartResponse without last_updated', async () => {
    const chartResponseWithoutDate = {
      ...mockChartResponse,
      last_updated: '',
    }

    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: chartResponseWithoutDate,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('chart-interactive')).toBeInTheDocument()
      expect(mockHandleLatestDate).not.toHaveBeenCalledWith('')
    })
  })

  test('handles null selectedThresholds', async () => {
    mockMapThresholdsToMetricValueRanges.mockReturnValueOnce([])

    getSubplotsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={null as any}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(getSubplotsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          chart_parameters: expect.objectContaining({
            metric_value_ranges: [],
          }),
        })
      )
    })
  })

  test('handles exception in fetchCharts', async () => {
    getSubplotsMock.mockRejectedValueOnce('String error')

    render(
      <SubplotClientChart
        selectedVaccinations={mockSelectedVaccinations}
        geographyFilters={mockGeographyFilters}
        selectedThresholds={mockSelectedThresholds}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        handleTimePeriodChange={mockHandleTimePeriodChange}
        geography={mockGeography}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
        timePeriodTitle="Year selection"
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('No data available for the selected chart filters')).toBeInTheDocument()
    })
  })
})
