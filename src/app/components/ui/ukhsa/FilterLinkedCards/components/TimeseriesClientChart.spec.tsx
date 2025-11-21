import { waitFor } from '@testing-library/dom'

import { DataFilter, FilterLinkedTimeSeriesData } from '@/api/models/cms/Page/GlobalFilter'
import { ChartResponse, getCharts } from '@/api/requests/charts/getCharts'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { useErrorData } from '@/app/hooks/globalFilterHooks'
import { getMinMaxFullDate } from '@/app/utils/time-period.utils'
import { mockGeography, mockTimePeriods, render, screen } from '@/config/test-utils'

import TimeseriesClientChart from './TimeseriesClientChart'

// Mock getCharts API
jest.mock('@/api/requests/charts/getCharts')
const getChartsMock = jest.mocked(getCharts)

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
jest.mock('@/app/utils/time-period.utils', () => ({
  ...jest.requireActual('@/app/utils/time-period.utils'),
  getMinMaxFullDate: jest.fn(),
}))
const mockGetMinMaxFullDate = getMinMaxFullDate as jest.MockedFunction<typeof getMinMaxFullDate>

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
        age: { label: 'All Ages', value: 'all' },
      },
      accompanying_points: [],
    },
  },
]

const mockCardData: FilterLinkedTimeSeriesData = {
  title_prefix: 'Cases',
  legend_title: 'Number of cases',
  about: 'About cases data',
}

const mockChartResponse: ChartResponse = {
  chart: 'mock-svg-string',
  last_updated: '2024-03-31',
  alt_text: 'Mock alt text',
  figure: {
    data: [
      {
        x: ['2023-01-01', '2023-01-02'],
        y: [100, 150],
        type: 'scatter',
        mode: 'lines',
      },
    ],
    layout: {
      title: 'Cases Chart',
      xaxis: { anchor: 'y', domain: [0, 1] },
      yaxis: { anchor: 'x', domain: [0, 1] },
    },
  },
}

describe('TimeseriesClientChart', () => {
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

    mockGetMinMaxFullDate.mockReturnValue({
      date_from: '2023-01-01',
      date_to: '2024-12-31',
    })
  })

  test('renders loading state initially', async () => {
    getChartsMock.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-loading')).toBeInTheDocument()
      expect(screen.getByText('Chart loading')).toBeInTheDocument()
      expect(screen.getByText('Requesting chart based on selected filters')).toBeInTheDocument()
    })
  })

  test('renders chart when API call succeeds', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('chart-interactive')).toBeInTheDocument()
    })
  })

  test('renders error state when API call fails', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
      expect(screen.getByText('No data available')).toBeInTheDocument()
      expect(screen.getByText('Please adjust your filter selections to display a chart')).toBeInTheDocument()
    })
  })

  test('renders error state when exception occurs', async () => {
    getChartsMock.mockRejectedValueOnce(new Error('Network error'))

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  test('calls getCharts with correct parameters', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledWith({
        file_format: 'svg',
        chart_height: 260,
        chart_width: 515,
        x_axis: 'date',
        y_axis: 'metric',
        x_axis_title: 'Year',
        y_axis_title: 'Number of cases',
        y_axis_minimum_value: null,
        y_axis_maximum_value: null,
        plots: [
          {
            topic: 'COVID-19',
            metric: 'new_cases_7days_sum',
            stratum: 'default',
            sex: 'all',
            age: 'all',
            line_colour: '#FF0000',
            label: 'COVID-19 Cases',
            geography: 'England',
            geography_type: 'Nation',
            chart_type: 'line_multi_coloured',
            line_type: 'SOLID',
            date_from: '2023-01-01',
            date_to: '2024-12-31',
            use_smooth_lines: false,
            use_markers: true,
          },
        ],
      })
    })
  })

  test('calls handleLatestDate with last_updated when chart response is received', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith('2024-03-31')
    })
  })

  test('calls handleLatestDate with null when chart response is cleared', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith('2024-03-31')
    })

    // Change a dependency to trigger re-fetch
    rerender(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={[]}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockHandleLatestDate).toHaveBeenCalledWith(null)
    })
  })

  test('calls removeChartRequestError on fetch start', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockRemoveChartRequestError).toHaveBeenCalledWith('subplot-E92000001')
    })
  })

  test('calls setChartRequestErrors when API response is unsuccessful', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockSetChartRequestErrors).toHaveBeenCalledWith({
        id: 'timeseries-E92000001',
        error: expect.any(String),
      })
    })
  })

  test('re-fetches data when dataFilters changes', async () => {
    getChartsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(1)
    })

    // Change data filters
    const newDataFilters: DataFilter[] = [
      ...mockDataFilters,
      {
        id: 'filter-2',
        type: 'data_filter',
        value: {
          label: 'Influenza Cases',
          colour: '#00FF00',
          parameters: {
            theme: { label: 'Theme', value: 'infectious_disease' },
            sub_theme: { label: 'Sub Theme', value: 'respiratory' },
            topic: { label: 'Influenza', value: 'Influenza' },
            metric: { label: 'Cases', value: 'influenza_cases' },
            stratum: { label: 'All', value: 'default' },
            sex: { label: 'All', value: 'all' },
            age: { label: 'All Ages', value: 'all' },
          },
          accompanying_points: [],
        },
      },
    ]

    rerender(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={newDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(2)
    })
  })

  test('re-fetches data when geography changes', async () => {
    getChartsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })

    const { rerender } = render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(1)
    })

    // Change geography
    const newGeography: GeographiesSchemaObject = {
      name: 'Wales',
      geography_code: 'W92000004',
      geography_type: 'Nation',
      relationships: [],
    }

    rerender(
      <TimeseriesClientChart
        geography={newGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(2)
      // Verify it was called with the new geography
      expect(getChartsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          plots: expect.arrayContaining([
            expect.objectContaining({
              geography: 'Wales',
            }),
          ]),
        })
      )
    })
  })

  test('uses getMinMaxFullDate to determine date range', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    mockGetMinMaxFullDate.mockReturnValueOnce({
      date_from: '2022-01-01',
      date_to: '2025-12-31',
    })

    render(
      <TimeseriesClientChart
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(mockGetMinMaxFullDate).toHaveBeenCalledWith(mockTimePeriods)
      expect(getChartsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          plots: expect.arrayContaining([
            expect.objectContaining({
              date_from: '2022-01-01',
              date_to: '2025-12-31',
            }),
          ]),
        })
      )
    })
  })

  test('handles geography without geography_type', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })

    const geographyWithoutType: GeographiesSchemaObject = {
      name: 'Test Area',
      geography_code: 'TEST001',
      geography_type: undefined,
      relationships: [],
    }

    render(
      <TimeseriesClientChart
        geography={geographyWithoutType}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
        handleLatestDate={mockHandleLatestDate}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          plots: expect.arrayContaining([
            expect.objectContaining({
              geography: 'Test Area',
              geography_type: undefined,
            }),
          ]),
        })
      )
    })
  })
})
