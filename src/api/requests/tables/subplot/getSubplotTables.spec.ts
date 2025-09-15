import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { defaultCoverageTableValues } from '@/mock-server/handlers/tables/subplot/fixtures'

import { getSubplotTables, responseSchema } from './getSubplotTables'

type Response = z.infer<typeof responseSchema>
type successResponse = z.SafeParseSuccess<Response>
type ErrorResponse = z.SafeParseError<Response>

const validPayload = {
  chart_parameters: {
    theme: 'mock theme',
    sub_theme: 'mock sub theme',
    topic: 'mock topic',
    metric_value_ranges: [],
  },
  subplots: [
    {
      subplot_title: 'mocked subplot title',
      subplot_parameters: {},
      plots: [],
    },
  ],
}

describe('getSubplotTables', () => {
  test('Returns tabular data for a subplot chart for immunisation topic', async () => {
    const requestBody = validPayload

    jest.mocked(client).mockResolvedValueOnce({ data: defaultCoverageTableValues, status: 200 })

    const result = await getSubplotTables(requestBody)

    expect(result).toEqual<successResponse>({ success: true, data: defaultCoverageTableValues })
  })

  test('Handles invalid json received from the API', async () => {
    const requestBody = validPayload
    const invalidResponse = {
      ...defaultCoverageTableValues,
      subplots: { invalid_key: 'invalid_value' },
    }
    jest.mocked(client).mockResolvedValueOnce({
      data: invalidResponse,
      status: 200,
    })

    const result = await getSubplotTables(requestBody)

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
    const requestBody = validPayload
    jest.mocked(client).mockRejectedValueOnce({
      status: 400,
    })

    const result = await getSubplotTables(requestBody)

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
