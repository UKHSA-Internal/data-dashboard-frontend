import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getTrends } from '@/api/requests/trends/getTrends'
import { render } from '@/config/test-utils'

import { Trend } from './Trend'

jest.mock('@/api/requests/trends/getTrends')
const getTrendsMock = jest.mocked(getTrends)

const mockRequestData: ComponentProps<typeof Trend>['data'] = {
  topic: 'COVID-19',
  metric: 'test-metric',
  percentage_metric: 'test-percentage-metric',
  body: 'Test Heading',
}

describe('Data request is successful', () => {
  test('renders upward positive trend correctly', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: 592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: 3.0,
        colour: 'green',
        direction: 'up',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(getByText('There has been an increase of 592 (3%) compared to the previous 7 days.')).toBeInTheDocument()
  })

  test('renders downward positive trend correctly', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: -3.0,
        colour: 'green',
        direction: 'down',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(getByText('There has been a decrease of -592 (-3%) compared to the previous 7 days.')).toBeInTheDocument()
  })

  test('renders upward negative trend correctly', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: 592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: 3.0,
        colour: 'red',
        direction: 'up',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(getByText('There has been an increase of 592 (3%) compared to the previous 7 days.')).toBeInTheDocument()
  })

  test('renders downward negative trend correctly', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: -3.0,
        colour: 'red',
        direction: 'down',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(getByText('There has been an decrease of -592 (-3%) compared to the previous 7 days.')).toBeInTheDocument()
  })

  test('renders neutral trend correctly', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: 0,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: 0,
        colour: 'neutral',
        direction: 'neutral',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(getByText('There has been no change compared to the previous 7 days.')).toBeInTheDocument()
  })

  test('formats trend values and percentages with multiple decimal places into a two decimal format', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: -592.123,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: 3.6789,
        colour: 'red',
        direction: 'down',
      },
    })

    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(
      getByText('There has been an decrease of -592.12 (3.68%) compared to the previous 7 days.')
    ).toBeInTheDocument()
  })

  test('hides the date within chart cards', async () => {
    getTrendsMock.mockResolvedValueOnce({
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_period_end: '2023-11-03',
        metric_value: -592.123,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_period_end: '2023-11-03',
        percentage_metric_value: 3.6789,
        colour: 'red',
        direction: 'down',
      },
    })
    const { getByText } = render((await Trend({ data: mockRequestData, datePrefix: 'Up to' })) as ReactElement)
    const dateElement = getByText('Up to 3 Nov 2023')
    expect(dateElement).toHaveClass('[.ukhsa-chart-card_&]:hidden')
  })
})

describe('Data request is unsuccessful', () => {
  test('renders null when the percentage request fails', async () => {
    getTrendsMock.mockResolvedValueOnce({
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

    const { container } = render((await Trend({ data: mockRequestData, datePrefix: '' })) as ReactElement)

    expect(container.firstChild).toBeNull()
  })
})
