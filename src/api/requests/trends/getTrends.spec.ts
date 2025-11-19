import z from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { fixtures } from '@/mock-server/handlers/trends/fixtures'

import { getTrends, responseSchema } from './getTrends'

const getTrendsMock = jest.mocked(client)

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>

beforeEach(() => jest.clearAllMocks())

test('Returns a COVID-19 trend', async () => {
  getTrendsMock.mockResolvedValueOnce({
    status: 200,
    data: fixtures['COVID-19']['COVID-19_headline_newcases_7daypercentchange'],
  })

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'COVID-19_headline_newcases_7daychange',
    percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
  })

  expect(getTrendsMock).toHaveBeenCalledWith('trends/v3', {
    searchParams: new URLSearchParams({
      topic: 'COVID-19',
      metric: 'COVID-19_headline_newcases_7daychange',
      percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
    }),
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      metric_name: 'COVID-19_headline_newcases_7daychange',
      metric_period_end: '2023-11-04',
      metric_value: -592,
      percentage_metric_name: 'COVID-19_headline_newcases_7daypercentchange',
      percentage_metric_period_end: '2023-11-04',
      percentage_metric_value: -3,
      direction: 'down',
      colour: 'green',
    },
  })
})

test('Returns an Influenza headline value', async () => {
  getTrendsMock.mockResolvedValueOnce({
    status: 200,
    data: fixtures.Influenza['influenza_headline_ICUHDUadmissionRateChange'],
  })

  const result = await getTrends({
    topic: 'Influenza',
    metric: 'influenza_headline_ICUHDUadmissionRateChange',
    percentage_metric: 'influenza_headline_ICUHDUadmissionRatePercentChange',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      metric_name: 'influenza_headline_ICUHDUadmissionRateChange',
      metric_period_end: '2023-11-04',
      metric_value: 5911,
      percentage_metric_name: 'influenza_headline_ICUHDUadmissionRatePercentChange',
      percentage_metric_period_end: '2023-11-04',
      percentage_metric_value: 0.3,
      direction: 'down',
      colour: 'green',
    },
  })
})

test('Handles invalid json received from the api', async () => {
  getTrendsMock.mockResolvedValueOnce({
    status: 200,
    data: {
      metric_name: null,
      metric_period_end: '2023-11-04',
      metric_value: '-592', // <--- Wrong type (should get coerced automatically by Zod)
      percentage_metric_name: 'new_cases_7days_change_percentage',
      percentage_metric_period_end: '2023-11-04',
      percentage_metric_value: -3.0,
      colour: '', // <--- Missing colour
      direction: 'down',
    },
  })

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result.success).toBe(false)
  expect(result.error).toBeInstanceOf(z.ZodError)
})

test('Handles generic http errors', async () => {
  getTrendsMock.mockRejectedValueOnce({
    status: 500,
    data: null,
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
