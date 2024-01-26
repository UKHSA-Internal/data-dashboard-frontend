import { ComponentProps, ReactElement } from 'react'

import { getTables } from '@/api/requests/tables/getTables'
import { useSearchParams } from '@/app/hooks/useSearchParams'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render } from '@/config/test-utils'

import { Download } from './Download'

// Mock table api
jest.mock('@/api/requests/tables/getTables')
const getTableMock = jest.mocked(getTables)

// Mock the url utils
const defaultUrl = new URL('http://localhost')
jest.mock('@/app/hooks/usePathname', () => ({ usePathname: jest.fn(() => defaultUrl.pathname) }))
jest.mock('@/app/hooks/useSearchParams', () => ({ useSearchParams: jest.fn(() => defaultUrl.searchParams) }))

getTableMock.mockResolvedValue({
  success: true,
  data: [
    {
      reference: '2022-10-31',
      values: [
        {
          label: 'Plot1',
          value: 12630.0,
        },
      ],
    },
  ],
})

const mockData: ComponentProps<typeof Download>['data'] = {
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
  headline_number_columns: [],
  title: 'Table Title',
  body: 'Table Body',
}

test('Chart download button', async () => {
  mockRouter.push('/topics/mock-topic')
  const { getByRole } = render((await Download({ data: mockData })) as ReactElement)
  expect(getByRole('button', { name: 'Download (csv)' })).toBeInTheDocument()
})

test('Chart download button fails to show due to api exception', async () => {
  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole, getByRole, getByText } = render((await Download({ data: mockData })) as ReactElement)

  expect(queryByRole('button', { name: 'Download (csv)' })).not.toBeInTheDocument()

  expect(getByText('No data available')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})

test('Chart download button fails to show due to lack of data', async () => {
  jest
    .mocked(useSearchParams)
    .mockReturnValueOnce(new URL('http://localhost?areaType=UKHSA+Region&areaName=North+East').searchParams)

  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole, getByRole, getByText } = render((await Download({ data: mockData })) as ReactElement)

  expect(queryByRole('button', { name: 'Download (csv)' })).not.toBeInTheDocument()

  expect(getByText('No data available in North East')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})
