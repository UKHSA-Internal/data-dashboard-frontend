import z from 'zod'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

import { getTrends, responseSchema } from './getTrends'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a COVID-19 trend', async () => {
  const mockData: z.infer<typeof responseSchema> = {
    metric_name: 'new_cases_7days_change',
    metric_value: -592,
    percentage_metric_name: 'new_cases_7days_change_percentage',
    percentage_metric_value: -3,
    direction: 'down',
    colour: 'green',
  }

  jest.mocked(client).mockResolvedValueOnce({
    data: mockData,
    status: 200,
  })

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_change',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: mockData,
  })
})

test('Returns an Influenza headline value', async () => {
  const mockData: z.infer<typeof responseSchema> = {
    metric_name: 'weekly_hospital_admissions_rate_change',
    metric_value: 5911,
    percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
    percentage_metric_value: 0.3,
    direction: 'down',
    colour: 'green',
  }

  jest.mocked(client).mockResolvedValueOnce({
    data: mockData,
    status: 200,
  })

  const result = await getTrends({
    topic: 'Influenza',
    metric: 'weekly_hospital_admissions_rate_change',
    percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: mockData,
  })
})

test('Handles invalid json received from the api', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: {
      metric_name: null,
      metric_value: '-592', // <--- Wrong type (should get coerced automatically by Zod)
      percentage_metric_name: 'new_cases_7days_change_percentage',
      percentage_metric_value: -3.0,
      colour: '', // <--- Missing colour
      direction: 'down',
    },
    status: 200,
  })

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'null',
        path: ['metric_name'],
        message: 'Expected string, received null',
      },
      {
        received: '',
        code: 'invalid_enum_value',
        options: ['green', 'red', 'neutral'],
        path: ['colour'],
        message: "Invalid enum value. Expected 'green' | 'red' | 'neutral', received ''",
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    status: 400,
  })

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toMatchObject({
    success: false,
  })
})
