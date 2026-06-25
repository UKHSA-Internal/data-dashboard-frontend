import { client } from '@/api/utils/api.utils'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getDualCategoryCharts, RequestParams } from './getDualCategoryCharts'

const mockRequestBody: RequestParams = {
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

describe('getDualCategoryCharts', () => {
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
