import z from 'zod'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

import { getHeadlines, responseSchema } from './getHeadlines'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a COVID-19 headline value', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: { value: 24298 },
    status: 200,
  })

  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      value: 24298,
    },
  })
})

test('Returns an Influenza headline value', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: { value: '12.2' },
    status: 200,
  })

  const result = await getHeadlines({
    topic: 'Influenza',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'weekly_positivity_latest',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      value: 12.2,
    },
  })
})

test('Handles invalid json received from the api', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: {},
    status: 200,
  })

  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'nan',
        path: ['value'],
        message: 'Expected number, received nan',
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    status: 400,
  })

  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'nan',
        path: ['value'],
        message: 'Expected number, received nan',
      },
    ]),
  })
})
