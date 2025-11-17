import { z } from 'zod'

import type { Metrics, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import {
  cases_casesByDay,
  deaths_ONSRollingMean,
  healthcare_ICUHDUadmissionrateByWeek,
  testing_positivityByWeek,
} from '@/mock-server/handlers/tables/fixtures'

import { getTables, responseSchema } from './getTables'

type Response = z.infer<typeof responseSchema>
type SuccessResponse = z.SafeParseSuccess<Response>
type ErrorResponse = z.SafeParseError<Response>

const getTablesResponseMocks: Array<[Topics, Metrics, Response]> = [
  ['COVID-19', 'COVID-19_cases_casesByDay', cases_casesByDay],
  ['COVID-19', 'COVID-19_deaths_ONSRollingMean', deaths_ONSRollingMean],
  ['Influenza', 'influenza_healthcare_ICUHDUadmissionrateByWeek', healthcare_ICUHDUadmissionrateByWeek],
  ['Influenza', 'influenza_testing_positivityByWeek', testing_positivityByWeek],
]

describe('getTables', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Returns tabular data for the COVID-19 topic and new_cases_daily metric', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: cases_casesByDay,
      status: 200,
    })

    const result = await getTables({
      plots: [
        {
          topic: 'COVID-19',
          metric: 'new_cases_daily',
        },
      ],
    })

    expect(result).toEqual<SuccessResponse>({ success: true, data: cases_casesByDay })
  })

  test.each(getTablesResponseMocks)(
    'Returns tabular data for the %s topic and %s metric',
    async (topic, metric, data) => {
      jest.mocked(client).mockResolvedValueOnce({ data, status: 200 })

      const result = await getTables({ plots: [{ topic, metric }] })

      expect(result).toEqual<SuccessResponse>({ success: true, data })
    }
  )

  test('Handles invalid json received from the api', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: {},
      status: 200,
    })

    const result = await getTables({
      plots: [
        {
          topic: 'COVID-19',
          metric: 'new_cases_daily',
        },
      ],
      x_axis: 'metric',
      y_axis: 'stratum',
    })

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          path: [],
          message: 'Expected array, received object',
        },
      ]),
    })
  })

  test('Handles generic http error', async () => {
    jest.mocked(client).mockRejectedValueOnce({
      status: 400,
    })

    const result = await getTables({
      plots: [
        {
          topic: 'COVID-19',
          metric: 'new_cases_daily',
        },
      ],
    })

    expect(logger.error).toHaveBeenCalledTimes(1)

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          path: [],
          message: 'Expected array, received object',
        },
      ]),
    })
  })
})
