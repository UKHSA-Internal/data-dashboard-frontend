import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { render } from '@/config/test-utils'

import { Headline } from './Headline'

jest.mock('@/api/requests/headlines/getHeadlines')
const getHeadlinesMock = jest.mocked(getHeadlines)

describe('Data request is successful', () => {
  getHeadlinesMock.mockResolvedValue({ success: true, data: { value: 24000, period_end: '2023-11-03' } })

  const data: ComponentProps<typeof Headline>['data'] = {
    topic: 'COVID-19',
    metric: 'test-metric',
    body: 'Test Heading',
  }

  test('renders a heading, date and number', async () => {
    const { getByText } = render((await Headline({ data, datePrefix: 'Up to' })) as ReactElement)
    const headingElement = getByText('Test Heading')
    const dateElement = getByText('Up to 3 Nov 2023')
    const valueElement = getByText('24,000')

    expect(headingElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
  })

  test('hides the date within chart cards', async () => {
    const { getByText } = render((await Headline({ data, datePrefix: 'Headline prefix' })) as ReactElement)
    const dateElement = getByText('Headline prefix 3 Nov 2023')
    expect(dateElement).toHaveClass('[.ukhsa-chart-card_&]:hidden')
  })
})

describe('Data request is unsuccessful', () => {
  test('renders null when the data request fails', async () => {
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

    const data: ComponentProps<typeof Headline>['data'] = {
      topic: 'COVID-19',
      metric: 'test-metric',
      body: 'Test Heading',
    }

    const { container } = render((await Headline({ data, datePrefix: '' })) as ReactElement)

    expect(container.firstChild).toBeNull()
  })
})
