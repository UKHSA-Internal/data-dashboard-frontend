import z from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { fixtures } from '@/mock-server/handlers/headlines/fixtures'

import { getHeadlines, responseSchema } from './getHeadlines'

const getHeadlinesMock = jest.mocked(client)

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

beforeEach(() => jest.clearAllMocks())

test('Returns a COVID-19 headline value', async () => {
  getHeadlinesMock.mockResolvedValueOnce({
    status: 200,
    data: fixtures['COVID-19']['COVID-19_headline_newcases_7daytotals'],
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
      period_end: '2025-11-03',
    },
  })
})

test('Returns an Influenza headline value', async () => {
  getHeadlinesMock.mockResolvedValueOnce({
    status: 200,
    data: fixtures.Influenza['influenza_headline_positivityLatest'],
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
      value: 0.2558,
      period_end: '2023-11-03',
    },
  })
})

test('Handles invalid json received from the api', async () => {
  getHeadlinesMock.mockResolvedValueOnce({
    status: 200,
    data: {},
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
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['period_end'],
        message: 'Required',
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  getHeadlinesMock.mockRejectedValueOnce({
    status: 500,
    data: null,
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
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['period_end'],
        message: 'Required',
      },
    ]),
  })
})
