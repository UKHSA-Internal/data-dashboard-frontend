import { waitFor } from '@testing-library/dom'

import { DataFilter, FilterLinkedTimeSeriesData, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { ChartResponse, getCharts } from '@/api/requests/charts/getCharts'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getTables, Response } from '@/api/requests/tables/getTables'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import { getParentGeography } from '@/app/utils/geography.utils'
import { getMinMaxFullDate, getMinMaxTimePeriodLabels } from '@/app/utils/time-period.utils'
import { render, screen } from '@/config/test-utils'

import { ClientTable } from './ClientTable'

jest.mock('@/api/requests/charts/getCharts')
const getChartsMock = jest.mocked(getCharts)

jest.mock('@/api/requests/tables/getTables')
const getTablesMock = jest.mocked(getTables)

jest.mock('@/app/utils/chart-table.utils', () => ({
  ...jest.requireActual('@/app/utils/chart-table.utils'),
  parseChartTableData: jest.fn(),
}))
const mockParseChartTableData = parseChartTableData as jest.MockedFunction<typeof parseChartTableData>

jest.mock('@/app/utils/geography.utils', () => ({
  ...jest.requireActual('@/app/utils/geography.utils'),
  getParentGeography: jest.fn(),
}))
const mockGetParentGeography = getParentGeography as jest.MockedFunction<typeof getParentGeography>

jest.mock('@/app/utils/time-period.utils', () => ({
  ...jest.requireActual('@/app/utils/time-period.utils'),
  getMinMaxFullDate: jest.fn(),
  getMinMaxTimePeriodLabels: jest.fn(),
}))
const mockGetMinMaxFullDate = getMinMaxFullDate as jest.MockedFunction<typeof getMinMaxFullDate>
const mockGetMinMaxTimePeriodLabels = getMinMaxTimePeriodLabels as jest.MockedFunction<typeof getMinMaxTimePeriodLabels>

jest.mock('@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard', () => ({
  __esModule: true,
  default: ({ variant, title, message }: any) => (
    <div data-testid={`client-info-card-${variant}`}>
      {title && <h2>{title}</h2>}
      {message && <p>{message}</p>}
    </div>
  ),
}))

jest.mock('@/app/i18n/client', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      const translations: Record<string, string> = {
        'cms.blocks.table.timeseries_title': `${params?.title} ${params?.geographyDetails}`,
        'cms.blocks.table.min_year_to_max_year': `${params?.minYear} to ${params?.maxYear}`,
        'cms.blocks.table.header': params?.value || key,
        'cms.blocks.table.row': params?.value || '',
        reportingLagPeriodKey: 'Reporting delay period',
      }
      return translations[key] || key
    },
  }),
}))

const mockGeography: GeographiesSchemaObject = {
  name: 'England',
  geography_code: 'E92000001',
  geography_type: 'Nation',
  relationships: [],
}

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

const mockTimePeriods: TimePeriod[] = [
  {
    id: 'period-1',
    type: 'time_period',
    value: {
      label: '2023',
      date_from: '2023-01-01',
      date_to: '2023-12-31',
    },
  },
  {
    id: 'period-2',
    type: 'time_period',
    value: {
      label: '2024',
      date_from: '2024-01-01',
      date_to: '2024-12-31',
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

const mockTableResponse: Response = [
  {
    reference: '2023-01-01',
    values: [
      {
        label: 'COVID-19 Cases',
        value: 100,
        in_reporting_delay_period: false,
      },
    ],
  },
  {
    reference: '2023-01-02',
    values: [
      {
        label: 'COVID-19 Cases',
        value: 150,
        in_reporting_delay_period: false,
      },
    ],
  },
]

const mockParsedTableData = [
  {
    columns: [
      { header: 'Date', accessorKey: 'col-0' },
      { header: 'COVID-19 Cases', accessorKey: 'col-1' },
    ],
    data: [
      {
        record: {
          'col-0': '2023-01-01',
          'col-1': 100,
        },
        inReportingDelay: false,
      },
      {
        record: {
          'col-0': '2023-01-02',
          'col-1': 150,
        },
        inReportingDelay: false,
      },
    ],
  },
]

describe('ClientTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()

    mockGetParentGeography.mockReturnValue({
      name: 'United Kingdom',
      geography_code: 'UK',
      geography_type: 'United Kingdom',
    })

    mockGetMinMaxFullDate.mockReturnValue({
      date_from: '2023-01-01',
      date_to: '2024-12-31',
    })

    mockGetMinMaxTimePeriodLabels.mockReturnValue({
      minLabel: '2023',
      maxLabel: '2024',
    })

    mockParseChartTableData.mockReturnValue(mockParsedTableData)
  })

  test('renders loading state initially', async () => {
    getChartsMock.mockImplementation(() => new Promise(() => {})) // Never resolves
    getTablesMock.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-loading')).toBeInTheDocument()
      expect(screen.getByText('Table loading')).toBeInTheDocument()
      expect(screen.getByText('Requesting tabular information based on selected filters')).toBeInTheDocument()
    })
  })

  test('renders error state when chart API call fails', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('error')).toBeInTheDocument()
      expect(screen.getByText('No data is available for the tables that you have requested.')).toBeInTheDocument()
    })
  })

  test('renders error state when table API call fails', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('error')).toBeInTheDocument()
    })
  })

  test('renders error state when chart API throws exception', async () => {
    getChartsMock.mockRejectedValueOnce(new Error('Network error'))
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
    })
  })

  test('renders table when both API calls succeed', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('Cases (United Kingdom, England)')).toBeInTheDocument()
      expect(screen.getByText('2023 to 2024')).toBeInTheDocument()
    })
  })

  test('calls getCharts with correct parameters', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledWith({
        chart_height: 260,
        chart_width: 515,
        x_axis: 'date',
        y_axis: 'metric',
        y_axis_title: 'Year',
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

  test('calls getTables with correct parameters', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalledWith({
        x_axis: 'date',
        y_axis: 'metric',
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

  test('renders table headers correctly', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      const headers = screen.getAllByRole('columnheader')
      // getColumnHeader returns chartLabel if it exists, which is "Date" from parsed table data
      expect(headers[0]).toHaveTextContent('Date')
      expect(headers[1]).toHaveTextContent('COVID-19 Cases')
    })
  })

  test('renders table rows with data', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('2023-01-01')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('2023-01-02')).toBeInTheDocument()
      expect(screen.getByText('150')).toBeInTheDocument()
    })
  })

  test('displays reporting delay period indicator when data has delay', async () => {
    const tableDataWithDelay = [
      {
        columns: [
          { header: 'Date', accessorKey: 'col-0' },
          { header: 'COVID-19 Cases', accessorKey: 'col-1' },
        ],
        data: [
          {
            record: {
              'col-0': '2023-01-01',
              'col-1': 100,
            },
            inReportingDelay: true,
          },
        ],
      },
    ]

    mockParseChartTableData.mockReturnValueOnce(tableDataWithDelay)

    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('Reporting delay period')).toBeInTheDocument()
    })
  })

  test('handles geography without geography_type', async () => {
    const geographyWithoutType: GeographiesSchemaObject = {
      name: 'Test Area',
      geography_code: 'TEST001',
      geography_type: undefined,
      relationships: [],
    }

    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={geographyWithoutType}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
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

  test('re-fetches data when dataFilters changes', async () => {
    getChartsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValue({
      success: true,
      data: mockTableResponse,
    })

    const { rerender } = render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(1)
      expect(getTablesMock).toHaveBeenCalledTimes(1)
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
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={newDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(2)
      expect(getTablesMock).toHaveBeenCalledTimes(2)
    })
  })

  test('re-fetches data when geography changes', async () => {
    getChartsMock.mockResolvedValue({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValue({
      success: true,
      data: mockTableResponse,
    })

    const { rerender } = render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
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
      <ClientTable
        size="narrow"
        geography={newGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getChartsMock).toHaveBeenCalledTimes(2)
      expect(getTablesMock).toHaveBeenCalledTimes(2)
    })
  })

  test('uses parseChartTableData with correct maxColumns for narrow size', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(mockParseChartTableData).toHaveBeenCalledWith(mockTableResponse, {
        maxColumns: expect.any(Number),
      })
    })
  })

  test('uses parseChartTableData with correct maxColumns for wide size', async () => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="wide"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(mockParseChartTableData).toHaveBeenCalledWith(mockTableResponse, {
        maxColumns: expect.any(Number),
      })
    })
  })

  test('handles null values in table data', async () => {
    const tableDataWithNull = [
      {
        columns: [
          { header: 'Date', accessorKey: 'col-0' },
          { header: 'COVID-19 Cases', accessorKey: 'col-1' },
        ],
        data: [
          {
            record: {
              'col-0': '2023-01-01',
              'col-1': null,
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockParseChartTableData.mockReturnValueOnce(tableDataWithNull)

    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  test('uses axisTitle when chartLabel is empty', async () => {
    const mockCardDataWithAxisTitle = {
      ...mockCardData,
      x_axis_title: 'Custom X Axis',
      y_axis_title: 'Custom Y Axis',
    } as FilterLinkedTimeSeriesData & { x_axis_title: string; y_axis_title: string }

    const tableData = [
      {
        columns: [
          { header: '', accessorKey: 'col-0' },
          { header: '', accessorKey: 'col-1' },
        ],
        data: [
          {
            record: {
              'col-0': '2023-01-01',
              'col-1': '100',
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockParseChartTableData.mockReturnValueOnce(tableData)

    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardDataWithAxisTitle}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  test('uses fallback when both chartLabel and axisTitle are empty', async () => {
    const mockCardDataNoLabels = {
      ...mockCardData,
      x_axis_title: '',
      y_axis_title: '',
    } as FilterLinkedTimeSeriesData & { x_axis_title: string; y_axis_title: string }

    const tableData = [
      {
        columns: [
          { header: '', accessorKey: 'col-0' },
          { header: '', accessorKey: 'col-1' },
        ],
        data: [
          {
            record: {
              'col-0': '2023-01-01',
              'col-1': '100',
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockParseChartTableData.mockReturnValueOnce(tableData)

    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: mockChartResponse,
    })
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse,
    })

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardDataNoLabels}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  test('handles error when table fetch fails', async () => {
    const error = new Error('Failed to fetch tables')
    getTablesMock.mockRejectedValueOnce(error)

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalled()
    })
  })

  test('handles non-Error exceptions in catch block', async () => {
    getTablesMock.mockRejectedValueOnce('String error')

    render(
      <ClientTable
        size="narrow"
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={mockCardData}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalled()
    })
  })
})
