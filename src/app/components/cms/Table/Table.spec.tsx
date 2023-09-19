import { ComponentProps, ReactElement } from 'react'

import { getCharts } from '@/api/requests/charts/getCharts'
import { getTables } from '@/api/requests/tables/getTables'
import { render } from '@/config/test-utils'

import { Table } from './Table'

// Mock charts api
jest.mock('@/api/requests/charts/getCharts')
const getChartsMock = jest.mocked(getCharts)

getChartsMock.mockResolvedValue({
  success: true,
  data: { chart: 'mock-chart', last_updated: '2023-05-10T15:18:06.939535+01:00' },
})

// Mock table api
jest.mock('@/api/requests/tables/getTables')
const getTableMock = jest.mocked(getTables)

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
    {
      reference: '2022-11-30',
      values: [
        {
          label: 'Plot1',
          value: 9360.0,
        },
      ],
    },
    {
      reference: '2023-01-31',
      values: [
        {
          label: 'Plot1',
          value: 12345.6666,
        },
      ],
    },
    {
      reference: '2022-02-28',
      values: [
        {
          label: 'Plot1',
          value: 600.049,
        },
      ],
    },
    {
      reference: '2022-02-28',
      values: [
        {
          label: 'Plot1',
          value: 8392.6,
        },
      ],
    },
  ],
})

const mockData: ComponentProps<typeof Table>['data'] = {
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

const mockSize = 'narrow'

test('table with caption and headers', async () => {
  const { getByRole, getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(
    getByRole('table', {
      name: 'Table Title data for table Body up to and including 10 May 2023. Values shown are totals on last day of the calendar month',
    })
  ).toBeInTheDocument()

  const headers = getAllByRole('columnheader')
  expect(headers).toHaveLength(2)
  expect(headers[0]).toHaveTextContent('Month')
  expect(headers[1]).toHaveTextContent('Amount')
})

test('table with row data', async () => {
  const { getByRole, getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(
    getByRole('table', {
      name: 'Table Title data for table Body up to and including 10 May 2023. Values shown are totals on last day of the calendar month',
    })
  ).toBeInTheDocument()

  const cells = getAllByRole('cell')

  expect(cells).toHaveLength(5)
  expect(cells[0]).toHaveTextContent('12,630')
  expect(cells[1]).toHaveTextContent('9,360')
  expect(cells[2]).toHaveTextContent('12,345.67')
  expect(cells[3]).toHaveTextContent('600.05')
  expect(cells[4]).toHaveTextContent('8,392.6')
})

test('table api request fails', async () => {
  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(
    queryByRole('table', {
      name: 'Table Title data for table Body up to and including 10 May 2023. Values shown are totals on last day of the calendar month',
    })
  ).not.toBeInTheDocument()
})
