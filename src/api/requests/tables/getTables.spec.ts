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

import { DualCategoryRequestParams, getTables, responseSchema } from './getTables'

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

describe('getTables (dual category)', () => {
  const mockRequestBody: DualCategoryRequestParams = {
    x_axis: null,
    y_axis: null,
    chart_type: 'stacked_bar',
    static_fields: {
      topic: 'COVID-19',
      metric: 'COVID-19_cases_casesByDay',
      geography_type: 'Nation',
      geography: 'England',
    },
    primary_field_values: ['2024-01-01'],
    secondary_category: 'age',
    segments: [{ secondary_field_value: '0-4', colour: 'COLOUR_1_DARK_BLUE' }],
  }

  const mockResponseData = [
    {
      reference: '2024-01-01',
      values: [{ label: '0-4', value: 100, in_reporting_delay_period: false }],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns parsed data on success', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: mockResponseData, status: 200 })

    const result = await getTables(mockRequestBody)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockResponseData)
  })

  test('logs error and returns failed parse when response data is invalid', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: { invalid: 'data' }, status: 200 })

    const result = await getTables(mockRequestBody)

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('getTables parse error:'))
    expect(result.success).toBe(false)
  })

  test('logs error and returns failed parse when client throws', async () => {
    jest.mocked(client).mockRejectedValueOnce(new Error('Network error'))

    const result = await getTables(mockRequestBody)

    expect(logger.error).toHaveBeenCalled()
    expect(result.success).toBe(false)
  })
})
