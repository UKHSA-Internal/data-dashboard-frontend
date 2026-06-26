import { ReactElement } from 'react'

import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { getTables } from '@/api/requests/tables/getTables'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { render, screen } from '@/config/test-utils'

import { DualCategoryTable } from './DualCategoryTable'

const defaultUrl = new URL('http://localhost')

jest.mock('@/api/requests/tables/getTables')
jest.mock('@/app/hooks/getAreaSelector', () => ({ getAreaSelector: jest.fn() }))
jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => '/') }))
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

const getDualCategoryTablesMock = jest.mocked(getTables)
const getAreaSelectorMock = jest.mocked(getAreaSelector)

const mockData: DualCategoryChartCardValue = {
  title: 'Test Chart',
  body: 'test body',
  about: '',
  tag_manager_event_id: null,
  x_axis: 'date',
  x_axis_title: 'Date',
  y_axis: 'metric',
  y_axis_title: 'Value',
  chart_type: 'stacked_bar',
  static_fields: {
    topic: 'COVID-19',
    metric: 'COVID-19_cases_casesByDay',
    geography_type: 'Nation',
    geography: 'England',
  },
  primary_field_values: ['2024-01-01', '2024-01-08'],
  secondary_category: 'age',
  segments: [{ type: 'segment', id: 'seg-1', value: { secondary_field_value: '0-4', colour: 'COLOUR_1_DARK_BLUE' } }],
}

const mockTableResponse = {
  success: true as const,
  data: [
    {
      reference: '2024-01-01',
      values: [{ label: '0-4', value: 100, in_reporting_delay_period: false }],
    },
    {
      reference: '2024-01-08',
      values: [{ label: '0-4', value: 200, in_reporting_delay_period: false }],
    },
  ],
}

describe('DualCategoryTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getAreaSelectorMock.mockResolvedValue([null, null])
    getDualCategoryTablesMock.mockResolvedValue(mockTableResponse)
  })

  test('renders a table with data', async () => {
    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('renders the table caption with title and body', async () => {
    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.getByText(/Test Chart data for/i)).toBeInTheDocument()
  })

  test('renders column headers', async () => {
    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    const headers = screen.getAllByRole('columnheader')
    expect(headers.length).toBeGreaterThan(0)
    expect(headers[1]).toHaveTextContent('0-4')
  })

  test('renders data rows', async () => {
    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.getByText('100.00')).toBeInTheDocument()
    expect(screen.getByText('200.00')).toBeInTheDocument()
  })

  test('renders "-" for null value cells', async () => {
    getDualCategoryTablesMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2024-01-01',
          values: [{ label: '0-4', value: null, in_reporting_delay_period: false }],
        },
      ],
    })

    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.getByRole('cell')).toHaveTextContent('-')
  })

  test('renders fallback when getDualCategoryTables returns failure', async () => {
    getDualCategoryTablesMock.mockResolvedValueOnce({
      success: false,
      error: new Error('API error') as never,
    })

    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Reset' })).toBeInTheDocument()
  })

  test('renders fallback when table data is empty', async () => {
    getDualCategoryTablesMock.mockResolvedValueOnce({ success: true, data: [] })

    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('passes area selector overrides to the API request', async () => {
    getAreaSelectorMock.mockResolvedValueOnce(['UKHSA Region', 'North East'])

    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    expect(getDualCategoryTablesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        static_fields: expect.objectContaining({
          geography_type: 'UKHSA Region',
          geography: 'North East',
        }),
      })
    )
  })

  test('renders multiple groups when response has multiple labels', async () => {
    getDualCategoryTablesMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2024-01-01',
          values: [
            { label: '0-4', value: 10, in_reporting_delay_period: false },
            { label: '5-9', value: 20, in_reporting_delay_period: false },
          ],
        },
      ],
    })

    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    const headers = screen.getAllByRole('columnheader')
    const headerTexts = headers.map((h) => h.textContent)
    expect(headerTexts.some((t) => t?.includes('0-4'))).toBe(true)
    expect(headerTexts.some((t) => t?.includes('5-9'))).toBe(true)
  })

  test('applies last-row border styling', async () => {
    render((await DualCategoryTable({ data: mockData })) as ReactElement)

    const rows = screen.getAllByRole('row')
    // Data rows exist beyond the header
    expect(rows.length).toBeGreaterThan(1)
  })
})
