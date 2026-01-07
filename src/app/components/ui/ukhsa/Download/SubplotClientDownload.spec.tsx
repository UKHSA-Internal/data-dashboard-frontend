import { waitFor } from '@testing-library/dom'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { getSubplotTables } from '@/api/requests/tables/subplot/getSubplotTables'
import { mockGeographyFilters, render } from '@/config/test-utils'

import { SubplotClientDownload } from './SubplotClientDownload'

jest.mock('@/api/requests/tables/subplot/getSubplotTables')
const getSubplotTableMock = jest.mocked(getSubplotTables)

const defaultUrl = new URL('http://localhost:8080')
jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}))

getSubplotTableMock.mockResolvedValue({
  success: true,
  data: [
    {
      reference: 'England',
      values: [
        {
          in_reporting_delay_period: false,
          label: '6-in-1 (12 months)',
          value: 88.0,
        },
        {
          in_reporting_delay_period: false,
          label: '6-in-1 (24 months)',
          value: 78.0,
        },
        {
          in_reporting_delay_period: false,
          label: 'MMR1 (24 months)',
          value: 84.0,
        },
      ],
    },
    {
      reference: 'North East',
      values: [
        {
          in_reporting_delay_period: false,
          label: '6-in-1 (12 months)',
          value: 97.0,
        },
        {
          in_reporting_delay_period: false,
          label: '6-in-1 (24 months)',
          value: 89.0,
        },
        {
          in_reporting_delay_period: false,
          label: 'MMR1 (24 months)',
          value: 84.0,
        },
      ],
    },
  ],
})

const mockGeography = {
  name: 'England',
  geography_code: 'E92000001',
  geography_type: 'Nation',
  parent_geography_code: 'UK',
  relationships: [],
}

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

const mockTimePeriods: TimePeriod[] = [
  { id: '1', value: { label: '2024-Q1', date_from: '2024-01-01', date_to: '2024-03-31' }, type: 'time_period' },
  { id: '2', value: { label: '2024-Q2', date_from: '2024-04-01', date_to: '2024-06-30' }, type: 'time_period' },
]

const mockCurrentTimePeriodIndex: number = mockTimePeriods.length - 1

const mockedSelectedMetricValues: any[] = []

describe('SubplotClientDownload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () =>
    render(
      <SubplotClientDownload
        geography={mockGeography}
        geographyFilters={mockGeographyFilters}
        dataFilters={mockDataFilters}
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={mockCurrentTimePeriodIndex}
        selectedThresholds={mockedSelectedMetricValues}
      />
    )

  test('SubplotClientDownload renders correctly', async () => {
    const { getByRole, getByText, getByLabelText } = renderComponent()

    await waitFor(() => {
      expect(getByRole('heading', { name: 'Download data', level: 3 })).toBeInTheDocument()
      expect(getByText('Select format')).toBeInTheDocument()
      expect(getByLabelText('CSV')).toBeChecked()
      expect(getByLabelText('JSON')).toBeInTheDocument()

      expect(getByRole('button', { name: 'Download' })).toBeInTheDocument()
    })
  })

  test('Chart download fails to show due to lack of data', async () => {
    getSubplotTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

    const { queryByRole, getByText } = renderComponent()

    await waitFor(() => {
      expect(queryByRole('button', { name: 'Download' })).not.toBeInTheDocument()
      expect(getByText('No data is available for the download that you have requested.')).toBeInTheDocument()
    })
  })
})
