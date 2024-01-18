import { ImageProps } from 'next/image'
import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getCharts } from '@/api/requests/charts/getCharts'
import { render } from '@/config/test-utils'

import { Chart } from './Chart'

// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => ({ src, alt }: ImageProps) => <img src={src as string} alt={alt} />)
jest.mock('next/headers', () => ({
  headers: () => ({ get: () => new URL('http://localhost?areaType=Nation&areaName=England') }),
}))
jest.mock('@/api/requests/charts/getCharts')

const getChartsMock = jest.mocked(getCharts)

test('renders the chart correctly when successful', async () => {
  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: { chart: 'mock-chart', last_updated: '2023-05-10T15:18:06.939535+01:00' },
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    body: '',
    title: '',
    headline_number_columns: [],
  }

  const { getByAltText } = render((await Chart({ data, size: 'narrow' })) as ReactElement)

  expect(getByAltText('')).toHaveAttribute('src', 'data:image/svg+xml;utf8,mock-chart')
})

test('full width charts should also have an acompanying narrow version for mobile viewports', async () => {
  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: { chart: 'mock-chart-narrow', last_updated: '2023-05-10T15:18:06.939535+01:00' },
  })
  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: { chart: 'mock-chart-wide', last_updated: '2023-05-10T15:18:06.939535+01:00' },
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    body: '',
    title: '',
    headline_number_columns: [],
  }

  const { getByAltText, getByTestId } = render((await Chart({ data, size: 'wide' })) as ReactElement)

  expect(getByAltText('')).toHaveAttribute('src', 'data:image/svg+xml;utf8,mock-chart-narrow')
  expect(getByTestId('chart-src-min-768')).toHaveAttribute('srcset', 'data:image/svg+xml;utf8,mock-chart-wide')
  expect(getByTestId('chart-src-min-768')).toHaveAttribute('media', '(min-width: 768px)')
})

test('renders a fallback message when the chart requests fail', async () => {
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

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    body: '',
    title: 'Cases by specimen date',
    headline_number_columns: [],
  }

  const { getByText, getByRole } = render((await Chart({ data, size: 'narrow' })) as ReactElement)

  expect(getByText('No data for Cases by specimen date in England')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})
