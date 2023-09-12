import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { render } from '@/config/test-utils'

import { Percentage } from './Percentage'

jest.mock('@/api/requests/headlines/getHeadlines')

const getHeadlinesMock = jest.mocked(getHeadlines)

test('renders the percentage correctly when successful', async () => {
  getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 50.5 } })

  const data: ComponentProps<typeof Percentage>['data'] = {
    topic: 'COVID-19',
    metric: 'test-metric',
    body: 'Test Heading',
  }
  const { getByText } = render((await Percentage({ data })) as ReactElement)
  const headingElement = getByText('Test Heading')
  const valueElement = getByText('50.5%')

  expect(headingElement).toBeInTheDocument()
  expect(valueElement).toBeInTheDocument()
})

test('formats the percentage to two decimal places', async () => {
  getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 55.3846 } })

  const data: ComponentProps<typeof Percentage>['data'] = {
    topic: 'COVID-19',
    metric: 'test-metric',
    body: 'Test Heading',
  }
  const { getByText } = render((await Percentage({ data })) as ReactElement)
  const headingElement = getByText('Test Heading')
  const valueElement = getByText('55.38%')

  expect(headingElement).toBeInTheDocument()
  expect(valueElement).toBeInTheDocument()
})

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

  const { container } = render((await Percentage({ data })) as ReactElement)

  expect(container.firstChild).toBeNull()
})
