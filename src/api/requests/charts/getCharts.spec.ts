import z from 'zod'

import { client } from '@/api/utils/api.utils'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getCharts, responseSchema } from './getCharts'
import { getDualCategoryCharts, RequestParams as DualCategoryRequestParams } from './getDualCategoryCharts'

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
    is_public: true,
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
    is_public: true,
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
    is_public: true,
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
    is_public: true,
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
    is_public: true,
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
    is_public: true,
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
    is_public: true,
  })

  expect(logger.info).toHaveBeenCalledWith('POST failed (no data) charts/v3 %s', 'new_cases_7days_sum')
  expect(result.success).toBe(false)
})

describe('getDualCategoryCharts', () => {
  const mockRequestBody: DualCategoryRequestParams = {
    chart_height: chartSizes.narrow.height,
    chart_width: chartSizes.narrow.width,
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

  const mockResponseData = {
    chart: 'mock-chart-svg',
    alt_text: 'Mock chart',
    last_updated: '2025-05-21',
    figure: { data: [], layout: {} },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns parsed data on success', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: mockResponseData, status: 200 })

    const result = await getDualCategoryCharts(mockRequestBody)

    expect(result.success).toBe(true)
    expect(result.data?.chart).toBe('mock-chart-svg')
  })

  test('logs validation error and returns failed parse when response data is invalid', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: { invalid: 'data' }, status: 200 })

    const result = await getDualCategoryCharts(mockRequestBody)

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('getDualCategoryCharts Zod Validation error:'))
    expect(result.success).toBe(false)
  })

  test('logs info on 400 error and returns failed parse', async () => {
    const error = new Error('Bad Request')
    error.code = 400
    jest.mocked(client).mockRejectedValueOnce(error)

    const result = await getDualCategoryCharts(mockRequestBody)

    expect(logger.info).toHaveBeenCalledWith(
      'POST failed (no data) charts/dual-category/v1 %s',
      mockRequestBody.static_fields.metric
    )
    expect(result.success).toBe(false)
  })

  test('logs error on non-400 Error and returns failed parse', async () => {
    const error = new Error('Server Error')
    error.code = 500
    jest.mocked(client).mockRejectedValueOnce(error)

    const result = await getDualCategoryCharts(mockRequestBody)

    expect(logger.error).toHaveBeenCalledWith('getDualCategoryCharts error: Server Error')
    expect(result.success).toBe(false)
  })

  test('returns failed parse for non-Error throws', async () => {
    jest.mocked(client).mockRejectedValueOnce('string error')

    const result = await getDualCategoryCharts(mockRequestBody)

    expect(result.success).toBe(false)
  })
})
