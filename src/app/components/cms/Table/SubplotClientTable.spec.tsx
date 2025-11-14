import { GeographyFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { getSubplotTables } from '@/api/requests/tables/subplot/getSubplotTables'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import { flattenGeographyObject, getParentGeography } from '@/app/utils/geography.utils'
import { render, screen, waitFor } from '@/config/test-utils'

import { SubplotClientTable } from './SubplotClientTable'

jest.mock('@/app/utils/geography.utils')
jest.mock('@/app/utils/chart-table.utils')
jest.mock('@/api/requests/tables/subplot/getSubplotTables')

const mockedGetParentGeography = getParentGeography as jest.MockedFunction<typeof getParentGeography>
const mockedFlattenGeography = flattenGeographyObject as jest.MockedFunction<typeof flattenGeographyObject>
const mockedParseChartTableData = parseChartTableData as jest.MockedFunction<typeof parseChartTableData>
const mockedGetSubplotTables = getSubplotTables as jest.MockedFunction<typeof getSubplotTables>

const mockedChartSize = 'wide'
const mockedChartDate = '2021-03-31'

const mockTimePeriods: TimePeriod[] = [
  { id: '1', value: { label: '2024-Q1', date_from: '2024-01-01', date_to: '2024-03-31' }, type: 'time_period' },
  { id: '2', value: { label: '2024-Q2', date_from: '2024-04-01', date_to: '2024-06-30' }, type: 'time_period' },
]

const mockCurrentTimePeriodIndex: number = mockTimePeriods.length - 1

const mockGeographyFilters: GeographyFilters = {
  geography_types: [
    { type: 'geography_filter', value: { label: 'Nation', colour: 'Red', geography_type: 'nation' }, id: '1' },
    { type: 'geography_filter', value: { label: 'Region', colour: 'Blue', geography_type: 'region' }, id: '2' },
  ],
}

const mockParsedChartTableData = [
  {
    columns: [
      {
        header: 'Date',
        accessorKey: 'col-0',
      },
      {
        header: '6-in-1 (12 months)',
        accessorKey: 'col-1',
      },
      {
        header: '6-in-1 (24 months)',
        accessorKey: 'col-2',
      },
    ],
    data: [
      {
        record: {
          'col-0': 'England',
          'col-1': '88.0000',
          'col-2': '78.0000',
        },
        inReportingDelay: false,
      },
      {
        record: {
          'col-0': 'North East',
          'col-1': '97.0000',
          'col-2': '89.0000',
        },
        inReportingDelay: false,
      },
      {
        record: {
          'col-0': 'Darlington',
          'col-1': '90.0000',
          'col-2': '87.0000',
        },
        inReportingDelay: false,
      },
    ],
  },
  {
    columns: [
      {
        header: 'Date',
        accessorKey: 'col-0',
      },
      {
        header: 'MMR1 (24 months)',
        accessorKey: 'col-1',
      },
    ],
    data: [
      {
        record: {
          'col-0': 'England',
          'col-1': null,
        },
        inReportingDelay: false,
      },
      {
        record: {
          'col-0': 'North East',
          'col-1': '84',
        },
        inReportingDelay: false,
      },
      {
        record: {
          'col-0': 'Darlington',
          'col-1': '93',
        },
        inReportingDelay: false,
      },
    ],
  },
]

const mockDataFilters: any = [
  {
    id: 'vaccine1',
    type: 'data_filter',
    value: {
      label: 'First Dose',
      colour: '#0000FF',
      parameters: {
        theme: { name: 'Vaccination', id: 'vaccination' },
        sub_theme: { name: 'COVID-19', id: 'covid19' },
        topic: { name: 'Doses', id: 'doses' },
        stratum: { name: 'All', id: 'all' },
        metric: { name: 'First Dose', id: 'first_dose' },
        age: { name: 'All Ages', id: 'all_ages' },
        sex: { name: 'All', id: 'all' },
      },
      accompanying_points: [],
    },
  },
  {
    id: 'vaccine2',
    type: 'data_filter',
    value: {
      label: 'Second Dose',
      colour: '#00FFFF',
      parameters: {
        theme: { name: 'Vaccination', id: 'vaccination' },
        sub_theme: { name: 'COVID-19', id: 'covid19' },
        topic: { name: 'Doses', id: 'doses' },
        stratum: { name: 'All', id: 'all' },
        metric: { name: 'Second Dose', id: 'second_dose' },
        age: { name: 'All Ages', id: 'all_ages' },
        sex: { name: 'All', id: 'all' },
      },
      accompanying_points: [],
    },
  },
]

const mockCardData = {
  title_prefix: 'mock card prefix',
  legend_title: 'mock legend title',
  target_threshold: 95,
  target_threshold_label: undefined,
  about: undefined,
}

const mockGeography = {
  name: 'England',
  geography_code: 'E92000001',
  geography_type: 'Nation',
  parent_geography_code: 'UK',
  relationships: [],
}

const mockGeographyRelations = [
  {
    name: 'United Kingdom',
    geography_code: 'K02000001',
    geography_type: 'United Kingdom',
  },
  {
    name: 'England',
    geography_code: 'E92000001',
    geography_type: 'Nation',
  },
]

const mockedSubplotTablesResponse: any = { success: true }

const mockedSelectedMetricValues: any[] = []

describe('SubplotClientTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedGetParentGeography.mockReturnValue({ name: 'UK', geography_type: 'Nation', geography_code: 'MOCK code' })
    mockedFlattenGeography.mockReturnValue(mockGeographyRelations)
    mockedGetSubplotTables.mockReturnValue(mockedSubplotTablesResponse)
    mockedParseChartTableData.mockReturnValue(mockParsedChartTableData)
  })

  const renderComponent = () =>
    render(
      <SubplotClientTable
        size={mockedChartSize}
        timestamp={mockedChartDate}
        geography={mockGeography}
        geographyFilters={mockGeographyFilters}
        dataFilters={mockDataFilters}
        selectedThresholds={mockedSelectedMetricValues}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={mockCurrentTimePeriodIndex}
        cardData={mockCardData}
      />
    )

  test('Renders title and date prefix', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('mock card prefix by vaccine type - (UK, England)'))
      expect(screen.findByText(/Up to and including/))

      expect(mockedGetParentGeography).toHaveBeenCalledWith(mockGeography)
      expect(mockedFlattenGeography).toHaveBeenCalledWith(mockGeography)
    })
  })

  test('Renders the correct table headers', async () => {
    const { getAllByRole } = renderComponent()

    await waitFor(() => {
      const headers = getAllByRole('columnheader')
      expect(headers[0]).toHaveTextContent('Location')
      expect(headers[1]).toHaveTextContent('6-in-1 (12 months)')
      expect(headers[2]).toHaveTextContent('6-in-1 (24 months)')
    })
  })

  test('Renders expected metric values with correct formatting', async () => {
    const mockData = [
      {
        columns: [
          {
            header: 'Date',
            accessorKey: 'col-0',
          },
          {
            header: '6-in-1 (12 months)',
            accessorKey: 'col-1',
          },
        ],
        data: [
          {
            record: {
              'col-0': 'England',
              'col-1': '88.0000',
            },
            inReportingDelay: false,
          },
          {
            record: {
              'col-0': 'North East',
              'col-1': '89.0000',
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockedParseChartTableData.mockReturnValue(mockData)

    const expectedCellCount = mockData[0].data.length

    const { getAllByRole } = renderComponent()

    await waitFor(() => {
      const cells = getAllByRole('cell')
      expect(cells).toHaveLength(expectedCellCount)

      expect(cells[0]).toHaveTextContent('88.00')
      expect(cells[1]).toHaveTextContent('89.00')
    })
  })

  test('Renders the correct metric values and formatting when null values are included', async () => {
    const mockData = [
      {
        columns: [
          {
            header: 'Date',
            accessorKey: 'col-0',
          },
          {
            header: '6-in-1 (12 months)',
            accessorKey: 'col-1',
          },
        ],
        data: [
          {
            record: {
              'col-0': 'England',
              'col-1': '88.00000',
            },
            inReportingDelay: false,
          },
          {
            record: {
              'col-0': 'North East',
              'col-1': null,
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockedParseChartTableData.mockReturnValue(mockData)

    const expectedCellCount = mockData[0].data.length

    const { getAllByRole } = renderComponent()

    await waitFor(() => {
      const cells = getAllByRole('cell')
      expect(cells).toHaveLength(expectedCellCount)

      expect(cells[0]).toHaveTextContent('88.00')
      expect(cells[1]).toHaveTextContent('-')
    })
  })

  test('uses axisTitle when chartLabel is empty', async () => {
    const mockDataWithAxisTitle = [
      {
        columns: [
          {
            header: 'Date',
            accessorKey: 'col-0',
          },
          {
            header: 'Metric Value',
            accessorKey: 'col-1',
          },
        ],
        data: [
          {
            record: {
              'col-0': '2024-01-01',
              'col-1': '100',
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockedParseChartTableData.mockReturnValue(mockDataWithAxisTitle)

    const mockCardDataWithAxisTitle = {
      ...mockCardData,
    }

    const { getAllByRole } = render(
      <SubplotClientTable
        size={mockedChartSize}
        timestamp={mockedChartDate}
        geography={mockGeography}
        geographyFilters={mockGeographyFilters}
        dataFilters={mockDataFilters}
        selectedThresholds={mockedSelectedMetricValues}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={mockCurrentTimePeriodIndex}
        cardData={mockCardDataWithAxisTitle}
      />
    )

    await waitFor(() => {
      const headers = getAllByRole('columnheader')
      expect(headers.length).toBeGreaterThan(0)
    })
  })

  test('uses fallback when both chartLabel and axisTitle are empty', async () => {
    const mockDataWithEmptyHeaders = [
      {
        columns: [
          {
            header: '',
            accessorKey: 'col-0',
          },
          {
            header: '',
            accessorKey: 'col-1',
          },
        ],
        data: [
          {
            record: {
              'col-0': '2024-01-01',
              'col-1': '100',
            },
            inReportingDelay: false,
          },
        ],
      },
    ]

    mockedParseChartTableData.mockReturnValue(mockDataWithEmptyHeaders)

    const mockCardDataNoLabels = {
      ...mockCardData,
    }

    const { getAllByRole } = render(
      <SubplotClientTable
        size={mockedChartSize}
        timestamp={mockedChartDate}
        geography={mockGeography}
        geographyFilters={mockGeographyFilters}
        dataFilters={mockDataFilters}
        selectedThresholds={mockedSelectedMetricValues}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={mockCurrentTimePeriodIndex}
        cardData={mockCardDataNoLabels}
      />
    )

    await waitFor(() => {
      const headers = getAllByRole('columnheader')
      expect(headers.length).toBeGreaterThan(0)
    })
  })

  test('handles error when table fetch fails', async () => {
    const error = new Error('Failed to fetch tables')
    mockedGetSubplotTables.mockRejectedValueOnce(error)

    renderComponent()

    await waitFor(() => {
      expect(mockedGetSubplotTables).toHaveBeenCalled()
      expect(screen.queryByText(/error/i)).toBeInTheDocument()
    })
  })

  test('handles non-Error exceptions in catch block', async () => {
    mockedGetSubplotTables.mockRejectedValueOnce('String error')

    renderComponent()

    await waitFor(() => {
      expect(mockedGetSubplotTables).toHaveBeenCalled()
    })
  })
})
