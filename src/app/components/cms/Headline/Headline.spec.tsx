import { ComponentProps, ReactElement } from 'react'
import { ZodError } from 'zod'

import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { render } from '@/config/test-utils'

import { Headline } from './Headline'

jest.mock('@/api/requests/headlines/getHeadlines')

const getHeadlinesMock = jest.mocked(getHeadlines)

test('renders the headline correctly when successful', async () => {
  getHeadlinesMock.mockResolvedValueOnce({ success: true, data: { value: 24000 } })

  const data: ComponentProps<typeof Headline>['data'] = {
    topic: 'COVID-19',
    metric: 'test-metric',
    body: 'Test Heading',
  }
  const { getByText } = render((await Headline({ data })) as ReactElement)
  const headingElement = getByText('Test Heading')
  const valueElement = getByText('24,000')

  expect(headingElement).toBeInTheDocument()
  expect(valueElement).toBeInTheDocument()
})

test('renders null when the headline request fails', async () => {
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

  const { container } = render((await Headline({ data })) as ReactElement)

  expect(container.firstChild).toBeNull()
})
