import { ImageProps } from 'next/image'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getCharts } from '@/api/requests/charts/getCharts'
import { getSearchParams } from '@/app/hooks/getSearchParams'
import { render } from '@/config/test-utils'

import { Chart } from './Chart'

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
  useSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => ({ src, alt }: ImageProps) => <img src={src as string} alt={alt} />)
jest.mock('@/api/requests/charts/getCharts')

const getChartsMock = jest.mocked(getCharts)

console.error = jest.fn()

test('renders a narrow chart correctly', async () => {
  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: {
      chart: 'mock-chart-narrow',
      alt_text: 'alt text for chart',
      last_updated: '2023-05-10T15:18:06.939535+01:00',
      figure: { data: [], layout: {} },
    },
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    x_axis_title: '',
    y_axis_title: '',
    y_axis_maximum_value: null,
    y_axis_minimum_value: null,
    chart: [
      {
        id: '',
        type: 'plot',
        value: {
          topic: 'COVID-19',
          metric: '',
          chart_type: 'simple_line',
          geography: 'London',
          geography_type: 'UKHSA Region',
        },
      },
    ],
    body: 'COVID-19 chart description.',
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    title: '',
    headline_number_columns: [],
    about: '',
  }

  const { getByAltText } = render(
    (await Chart({
      data,
      sizes: [
        {
          default: true,
          size: 'narrow',
        },
      ],
    })) as ReactElement
  )

  expect(getChartsMock).toHaveBeenCalledWith({
    chart_height: 260,
    chart_width: 515,
    plots: [
      {
        topic: 'COVID-19',
        metric: '',
        chart_type: 'simple_line',
        geography: 'London',
        geography_type: 'UKHSA Region',
      },
    ],
    x_axis_title: '',
    y_axis_title: '',
    x_axis: null,
    y_axis: null,
    y_axis_maximum_value: null,
    y_axis_minimum_value: null,
  })

  expect(getByAltText('alt text for chart - Refer to tabular data.')).toHaveAttribute(
    'src',
    'data:image/svg+xml;utf8,mock-chart-narrow'
  )
})

test('renders the chart by geography and geography type when both are present in the url search params', async () => {
  jest
    .mocked(getSearchParams)
    .mockReturnValueOnce(new URL('http://localhost?areaType=UKHSA+Region&areaName=North+East').searchParams)

  getChartsMock.mockResolvedValueOnce({
    success: true,
    data: {
      chart: 'mock-chart-narrow',
      alt_text: 'alt text for chart',
      last_updated: '2023-05-10T15:18:06.939535+01:00',
      figure: { data: [], layout: {} },
    },
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    x_axis_title: '',
    y_axis_title: '',
    y_axis_maximum_value: null,
    y_axis_minimum_value: null,
    chart: [
      {
        id: '',
        type: 'plot',
        value: {
          topic: 'COVID-19',
          metric: '',
          chart_type: 'simple_line',
          geography: 'London',
          geography_type: 'UKHSA Region',
        },
      },
    ],
    body: 'COVID-19 chart description.',
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    title: '',
    headline_number_columns: [],
    about: '',
  }

  const { getByAltText } = render(
    (await Chart({
      data,
      sizes: [
        {
          default: true,
          size: 'narrow',
        },
      ],
    })) as ReactElement
  )

  expect(getChartsMock).toHaveBeenCalledWith({
    chart_height: 260,
    chart_width: 515,
    plots: [
      {
        topic: 'COVID-19',
        metric: '',
        chart_type: 'simple_line',
        geography: 'North East',
        geography_type: 'UKHSA Region',
      },
    ],
    x_axis: null,
    y_axis: null,
    x_axis_title: '',
    y_axis_title: '',
    y_axis_maximum_value: null,
    y_axis_minimum_value: null,
  })

  expect(getByAltText('alt text for chart - Refer to tabular data.')).toHaveAttribute(
    'src',
    'data:image/svg+xml;utf8,mock-chart-narrow'
  )
})

test('full width charts should also have an acompanying narrow version for mobile viewports', async () => {
  ;['mock-chart-wide', 'mock-chart-narrow'].forEach((chart) => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: {
        chart,
        alt_text: 'alt text for chart',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: { data: [], layout: {} },
      },
    })
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    body: 'COVID-19 chart description.',
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    title: '',
    headline_number_columns: [],
    about: '',
  }

  const { getByAltText, getByTestId } = render(
    (await Chart({
      data,
      sizes: [
        {
          minWidth: 768,
          size: 'wide',
        },
        {
          default: true,
          size: 'narrow',
        },
      ],
    })) as ReactElement
  )

  expect(getByAltText('alt text for chart - Refer to tabular data.')).toHaveAttribute(
    'src',
    'data:image/svg+xml;utf8,mock-chart-narrow'
  )
  expect(getByTestId('chart-src-min-768')).toHaveAttribute('srcset', 'data:image/svg+xml;utf8,mock-chart-wide')
  expect(getByTestId('chart-src-min-768')).toHaveAttribute('media', '(min-width: 768px)')
})

test('landing page half width charts should also have an acompanying third width version for mobile viewports', async () => {
  ;['mock-chart-third', 'mock-chart-half'].forEach((chart) => {
    getChartsMock.mockResolvedValueOnce({
      success: true,
      data: {
        chart,
        alt_text: 'alt text for chart',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: { data: [], layout: {} },
      },
    })
  })

  const data: ComponentProps<typeof Chart>['data'] = {
    x_axis: null,
    y_axis: null,
    chart: [],
    body: 'COVID-19 chart description.',
    tag_manager_event_id: '',
    title: '',
    headline_number_columns: [],
    date_prefix: '',
    about: '',
  }

  const { getByAltText, getByTestId } = render(
    (await Chart({
      data,
      sizes: [
        {
          minWidth: 1200,
          size: 'half',
        },
        {
          default: true,
          size: 'third',
        },
      ],
    })) as ReactElement
  )

  expect(getByAltText('alt text for chart - Refer to tabular data.')).toHaveAttribute(
    'src',
    'data:image/svg+xml;utf8,mock-chart-half'
  )
  expect(getByTestId('chart-src-min-1200')).toHaveAttribute('srcset', 'data:image/svg+xml;utf8,mock-chart-third')
})

test('renders a fallback message when the chart requests fail', async () => {
  const url = 'http://localhost?areaType=UKHSA+Region&areaName=North+East'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockReturnValueOnce(new URL(url).searchParams)

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
    body: 'COVID-19 chart description.',
    title: 'Cases by specimen date',
    headline_number_columns: [],
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    about: '',
  }

  const { getByText, getByRole } = render(
    (await Chart({
      data,
      sizes: [
        {
          default: true,
          size: 'narrow',
        },
      ],
    })) as ReactElement
  )

  expect(getByText('No data available in North East')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})

test('Fallback message with escaped characters', async () => {
  const url = 'http://localhost?areaType=NHS+Trust&areaName=Birmingham+Women%27s+and+Children%27s+NHS+Foundation+Trust'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockReturnValueOnce(new URL(url).searchParams)

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
    x_axis_title: '',
    y_axis_title: '',
    y_axis_maximum_value: null,
    y_axis_minimum_value: null,
    chart: [],
    body: 'COVID-19 chart description.',
    tag_manager_event_id: '',
    date_prefix: 'Up to',
    title: 'Cases by specimen date',
    headline_number_columns: [],
    about: '',
  }

  const { getByText } = render(
    (await Chart({
      data,
      sizes: [
        {
          default: true,
          size: 'narrow',
        },
      ],
    })) as ReactElement
  )

  expect(getByText("No data available in Birmingham Women's and Children's NHS Foundation Trust")).toBeInTheDocument()
})
