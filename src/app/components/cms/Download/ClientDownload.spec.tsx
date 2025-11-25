import { waitFor } from '@testing-library/dom'

import { DataFilter, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { getTables } from '@/api/requests/tables/getTables'
import { mockGeography, mockTimePeriods, render, screen } from '@/config/test-utils'

import { ClientDownload } from './ClientDownload'

jest.mock('@/api/requests/tables/getTables')
const getTablesMock = jest.mocked(getTables)

jest.mock('@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard', () => ({
  __esModule: true,
  default: ({ variant, title, message }: any) => (
    <div data-testid={`client-info-card-${variant}`}>
      {title && <h2>{title}</h2>}
      {message && <p>{message}</p>}
    </div>
  ),
}))

jest.mock('./DownloadForm', () => ({
  DownloadForm: ({ chart, xAxis }: any) => (
    <div data-testid="download-form">
      <div data-testid="chart-count">{chart?.length || 0}</div>
      <div data-testid="x-axis">{xAxis}</div>
    </div>
  ),
}))

const mockDataFilters: DataFilter[] = [
  {
    id: 'filter-1',
    type: 'data_filter',
    value: {
      label: 'Test Metric 1',
      colour: '#FF0000',
      parameters: {
        theme: { label: 'Theme', value: 'theme-value' },
        sub_theme: { label: 'Sub Theme', value: 'sub-theme-value' },
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

const mockTableResponse = {
  success: true,
  data: [
    {
      reference: 'England',
      values: [
        {
          label: '2023-01-01',
          value: 100,
          in_reporting_delay_period: false,
        },
        {
          label: '2023-01-02',
          value: 150,
          in_reporting_delay_period: false,
        },
      ],
    },
  ],
}

describe('ClientDownload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  test('renders loading state initially', async () => {
    getTablesMock.mockImplementation(() => new Promise(() => {}))

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-loading')).toBeInTheDocument()
      expect(screen.getByText('Download loading')).toBeInTheDocument()
      expect(screen.getByText('Requesting download information based on selected filters')).toBeInTheDocument()
    })
  })

  test('renders error state when API call fails', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('No data is available for the download that you have requested.')).toBeInTheDocument()
    })
  })

  test('renders error state when exception occurs', async () => {
    getTablesMock.mockRejectedValueOnce(new Error('Network error'))

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('No data is available for the download that you have requested.')).toBeInTheDocument()
    })
  })

  test('renders DownloadForm when API call succeeds', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse.data,
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('download-form')).toBeInTheDocument()
      expect(screen.getByTestId('chart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('x-axis')).toHaveTextContent('date')
    })
  })

  test('calls getTables with correct parameters', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse.data,
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
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
            label: 'Test Metric 1',
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

  test('renders error state when tableResponse success is false', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('No data is available for the download that you have requested.')).toBeInTheDocument()
    })
  })

  test('transforms dataFilters correctly for DownloadForm', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse.data,
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      const downloadForm = screen.getByTestId('download-form')
      expect(downloadForm).toBeInTheDocument()
      expect(screen.getByTestId('chart-count')).toHaveTextContent('1')
    })
  })

  test('handles multiple data filters', async () => {
    const multipleFilters: DataFilter[] = [
      ...mockDataFilters,
      {
        id: 'filter-2',
        type: 'data_filter',
        value: {
          label: 'Test Metric 2',
          colour: '#00FF00',
          parameters: {
            theme: { label: 'Theme', value: 'theme-value' },
            sub_theme: { label: 'Sub Theme', value: 'sub-theme-value' },
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

    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse.data,
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={multipleFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('download-form')).toBeInTheDocument()
      expect(screen.getByTestId('chart-count')).toHaveTextContent('2')
    })
  })

  test('re-fetches data when dependencies change', async () => {
    getTablesMock.mockResolvedValue({
      success: true,
      data: mockTableResponse.data,
    })

    const { rerender } = render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalledTimes(1)
    })

    const newTimePeriods: TimePeriod[] = [
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

    rerender(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={newTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalledTimes(2)
    })
  })

  test('renders error message when tableResponse is not successful', async () => {
    getTablesMock.mockResolvedValueOnce({
      success: false,
      error: expect.any(Object),
    })

    render(
      <ClientDownload
        geography={mockGeography}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('client-info-card-error')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('No data is available for the download that you have requested.')).toBeInTheDocument()
    })
  })

  test('handles geography without geography_type', async () => {
    const geographyWithoutType = {
      ...mockGeography,
      geography_type: undefined,
    }

    getTablesMock.mockResolvedValueOnce({
      success: true,
      data: mockTableResponse.data,
    })

    render(
      <ClientDownload
        geography={geographyWithoutType}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        cardData={{ title_prefix: 'Test', legend_title: 'Legend' }}
      />
    )

    await waitFor(() => {
      expect(getTablesMock).toHaveBeenCalledWith(
        expect.objectContaining({
          plots: expect.arrayContaining([
            expect.objectContaining({
              geography: geographyWithoutType.name,
              geography_type: undefined,
            }),
          ]),
        })
      )
    })
  })
})
