import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { render } from '@/config/test-utils'

import { Percentage } from './Percentage'

jest.mock('@/api/requests/headlines/getHeadlines')

const getHeadlinesMock = jest.mocked(getHeadlines)

describe('Data request is successful', () => {
  const data: ComponentProps<typeof Percentage>['data'] = {
    topic: 'COVID-19',
    metric: 'test-metric',
    body: 'Test Heading',
  }

  test('renders a heading, date and percentage', async () => {
    getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 50.5, period_end: '2023-11-03' } })

    const { getByText } = render((await Percentage({ data, datePrefix: 'Date prefix test' })) as ReactElement)
    const headingElement = getByText('Test Heading')
    const dateElement = getByText('Date prefix test 3 Nov 2023')
    const valueElement = getByText('50.5%')

    expect(headingElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
  })

  test('formats the percentage to two decimal places', async () => {
    getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 55.3846, period_end: '2023-11-03' } })

    const { getByText } = render((await Percentage({ data, datePrefix: '' })) as ReactElement)
    const headingElement = getByText('Test Heading')
    const valueElement = getByText('55.4%')

    expect(headingElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
  })

  test('hides the date within chart cards', async () => {
    getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 50.5, period_end: '2023-11-03' } })

    const { getByText } = render((await Percentage({ data, datePrefix: 'Up to' })) as ReactElement)
    const dateElement = getByText('Up to 3 Nov 2023')
    expect(dateElement).toHaveClass('[.ukhsa-chart-card_&]:hidden')
  })
})

describe('Data request is unsuccessful', () => {
  test('renders null when the percentage request fails', async () => {
    getHeadlinesMock.mockResolvedValueOnce({
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

    const data: ComponentProps<typeof Percentage>['data'] = {
      topic: 'COVID-19',
      metric: 'test-metric',
      body: 'Test Heading',
    }

    const { container } = render((await Percentage({ data, datePrefix: '' })) as ReactElement)

    expect(container.firstChild).toBeNull()
  })
})
