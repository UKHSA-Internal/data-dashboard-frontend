import z from 'zod'

import { client } from '@/api/api-utils'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getCharts, responseSchema } from './getCharts'

jest.mock('@/api/api-utils')
jest.mock('@/lib/logger')

test('Returns a chart svg and last updated date', async () => {
  const mockResponseData: z.infer<typeof responseSchema> = {
    chart: 'mocked-chart-svg',
    last_updated: '123',
  }

  jest.mocked(client).mockResolvedValueOnce({
    data: mockResponseData,
    status: 200,
  })

  const result = await getCharts({
    x_axis: null,
    y_axis: null,
    chart_height: chartSizes.narrow.height,
    chart_width: chartSizes.narrow.width,
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })

  expect(result).toEqual({
    data: mockResponseData,
    success: true,
  })
})

test('Handles API errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    data: null,
    status: 400,
  })

  const result = await getCharts({
    x_axis: null,
    y_axis: null,
    chart_height: chartSizes.narrow.height,
    chart_width: chartSizes.narrow.width,
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['chart'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['last_updated'],
        message: 'Required',
      },
    ]),
  })
})
