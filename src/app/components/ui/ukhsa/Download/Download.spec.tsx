import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { ComponentProps, ReactElement } from 'react'

import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { getTables } from '@/api/requests/tables/getTables'
import { getSearchParams } from '@/app/hooks/getSearchParams'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render } from '@/config/test-utils'

import { Download } from './Download'

// Mock table api
jest.mock('@/api/requests/tables/getTables')
const getTableMock = jest.mocked(getTables)

jest.mock('@/app/hooks/getAreaSelector', () => ({ getAreaSelector: jest.fn(() => Promise.resolve([null, null])) }))

// Mock the url utils
const defaultUrl = new URL('http://localhost')
jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

// Mock our custom server component util
jest.mock('@/app/hooks/getSearchParams', () => ({
  getSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

// Mock the default NextJs util (for client components)
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

getTableMock.mockResolvedValue({
  success: true,
  data: [
    {
      reference: '2022-10-31',
      values: [
        {
          label: 'Plot1',
          value: 12630.0,
          in_reporting_delay_period: false,
        },
      ],
    },
  ],
})

const props: ComponentProps<typeof Download> = {
  data: {
    chart: [
      {
        type: 'plot',
        value: {
          topic: 'COVID-19',
          metric: 'new_cases_daily',
          chart_type: 'line_with_shaded_section',
          date_from: null,
          date_to: null,
          stratum: '',
          geography: '',
          geography_type: '',
        },
        id: '123',
      },
    ],
    y_axis: 'y-axis',
    x_axis: 'x-axis',
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    headline_number_columns: [],
    title: 'Table Title',
    body: 'Table Body',
    about: '',
  },
  isPublic: false,
}

test('Chart download', async () => {
  mockRouter.push('/topics/mock-topic')

  const { getByRole, getByText, getByLabelText } = render((await Download(props)) as ReactElement)

  expect(getByRole('heading', { name: 'Download data', level: 3 })).toBeInTheDocument()
  expect(getByText('Select format')).toBeInTheDocument()
  expect(getByLabelText('CSV')).toBeChecked()
  expect(getByLabelText('JSON')).toBeInTheDocument()

  expect(getByRole('button', { name: 'Download' })).toBeInTheDocument()
})

test('Chart download fails to show due to api exception', async () => {
  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole, getByRole, getByText } = render((await Download(props)) as ReactElement)

  expect(queryByRole('button', { name: 'Download' })).not.toBeInTheDocument()

  expect(getByText('No data available')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})

test('Chart download fails to show due to lack of data', async () => {
  const url = 'http://localhost?areaType=UKHSA+Region&areaName=North+East'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockResolvedValueOnce(new URL(url).searchParams)

  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole, getByRole, getByText } = render((await Download(props)) as ReactElement)

  expect(queryByRole('button', { name: 'Download' })).not.toBeInTheDocument()

  expect(getByText('No data available in North East')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})

test('Fallback message with escaped characters', async () => {
  const url = 'http://localhost?areaType=NHS+Trust&areaName=Birmingham+Women%27s+and+Children%27s+NHS+Foundation+Trust'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockResolvedValueOnce(new URL(url).searchParams)

  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { getByText } = render((await Download(props)) as ReactElement)

  expect(getByText("No data available in Birmingham Women's and Children's NHS Foundation Trust")).toBeInTheDocument()
})

describe('Dual category download', () => {
  const dualCategoryProps: ComponentProps<typeof Download> = {
    data: {
      title: 'Dual Category Chart',
      body: 'Chart body',
      about: '',
      tag_manager_event_id: null,
      x_axis: 'date',
      y_axis: 'metric',
      chart_type: 'stacked_bar',
      static_fields: {
        topic: 'COVID-19',
        metric: 'COVID-19_cases_casesByDay',
        geography_type: 'Nation',
        geography: 'England',
      },
      primary_field_values: ['2024-01-01'],
      secondary_category: 'age',
      segments: [
        { type: 'segment', id: 'seg-1', value: { secondary_field_value: '0-4', colour: 'COLOUR_1_DARK_BLUE' } },
      ],
    } as DualCategoryChartCardValue,
    isPublic: false,
  }

  test('renders DownloadForm for dual category data', async () => {
    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [{ reference: '2024-01-01', values: [{ label: '0-4', value: 10, in_reporting_delay_period: false }] }],
    })

    const { getByTestId } = render((await Download(dualCategoryProps)) as ReactElement)

    expect(getByTestId('download-form')).toBeInTheDocument()
  })

  test('renders fallback when dual category table request fails', async () => {
    getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

    const { queryByTestId, getByRole } = render((await Download(dualCategoryProps)) as ReactElement)

    expect(queryByTestId('download-form')).not.toBeInTheDocument()
    expect(getByRole('link', { name: 'Reset' })).toBeInTheDocument()
  })
})
