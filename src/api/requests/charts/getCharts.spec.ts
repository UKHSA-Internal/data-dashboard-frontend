import z from 'zod'

import { client } from '@/api/utils/api.utils'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getCharts, responseSchema } from './getCharts'

test('Returns a chart svg and last updated date', async () => {
  const mockResponseData: z.infer<typeof responseSchema> = {
    chart: 'mocked-chart-svg',
    alt_text: 'alt text',
    last_updated: '123',
    figure: {
      data: [
        {
          x: [],
          y: [],
          showlegend: false,
          type: 'bar',
        },
      ],
      layout: {
        xaxis: {},
        yaxis: {},
      },
    },
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

test('Handles API errors when data is missing (400 status code)', async () => {
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
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['alt_text'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'undefined',
        path: ['figure'],
        message: 'Required',
      },
    ]),
  })
})

test('Handles API errors for non-400 error responses', async () => {
  const error = new Error('Failed')
  error.code = 500
  jest.mocked(client).mockRejectedValueOnce(error)

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

  expect(logger.error).toHaveBeenNthCalledWith(1, 'getCharts error: Failed')

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
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['alt_text'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'undefined',
        path: ['figure'],
        message: 'Required',
      },
    ]),
  })
})

test('Handles non-Error instances in catch block', async () => {
  jest.mocked(client).mockRejectedValueOnce('String error')

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

  expect(result.success).toBe(false)
})

test('Handles error when error.code is undefined', async () => {
  const error = new Error('Failed')
  jest.mocked(client).mockRejectedValueOnce(error)

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

  expect(logger.error).toHaveBeenCalledWith('getCharts error: Failed')
  expect(result.success).toBe(false)
})

test('Handles Zod validation error when response data is invalid', async () => {
  const invalidResponseData = {
    chart: 'mocked-chart-svg',
    // Missing required fields: last_updated, alt_text, figure
  }

  jest.mocked(client).mockResolvedValueOnce({
    data: invalidResponseData,
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

  expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Zod Validation error:'))
  expect(result.success).toBe(false)
})

test('Handles error when error.code is 400', async () => {
  const error = new Error('Bad Request')
  error.code = 400
  jest.mocked(client).mockRejectedValueOnce(error)

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

  expect(logger.info).toHaveBeenCalledWith('POST failed (no data) charts/v3 %s', 'new_cases_7days_sum')
  expect(result.success).toBe(false)
})
