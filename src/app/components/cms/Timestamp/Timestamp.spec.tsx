import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getCharts } from '@/api/requests/charts/getCharts'
import { render } from '@/config/test-utils'

import { Timestamp } from './Timestamp'

jest.mock('@/api/requests/charts/getCharts')
const getChartsMock = jest.mocked(getCharts)

test('renders the timestamp correctly when successful', async () => {
  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: {
      chart: 'mock-chart',
      alt_text: '',
      last_updated: '2023-05-10T15:18:06.939535+01:00',
      figure: { data: [], layout: {} },
    },
  })

  const data: ComponentProps<typeof Timestamp>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    tag_manager_event_id: '',
    date_prefix: 'Up to and including',
    body: '',
    title: '',
    headline_number_columns: [],
    about: '',
  }

  const { getByText } = render((await Timestamp({ data, size: 'narrow' })) as ReactElement)
  expect(getByText('Up to and including 10 May 2023')).toBeInTheDocument()
})

test('renders null when the timestamp request fails', async () => {
  getChartsMock.mockResolvedValueOnce({
    success: false,
    error: new ZodError([
      {
        received: 'mock',
        code: 'invalid_enum_value',
        options: [],
        path: ['mock'],
        message: 'Invalid',
      },
    ]),
  })

  const data: ComponentProps<typeof Timestamp>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    tag_manager_event_id: '',
    date_prefix: '',
    body: '',
    title: '',
    headline_number_columns: [],
    about: '',
  }

  const { container } = render((await Timestamp({ data, size: 'narrow' })) as ReactElement)

  expect(container.firstChild).toBeNull()
})
