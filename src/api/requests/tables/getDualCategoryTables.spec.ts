import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { getDualCategoryTables, RequestParams } from './getDualCategoryTables'

const mockRequestBody: RequestParams = {
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

describe('getDualCategoryTables', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns parsed data on success', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: mockResponseData, status: 200 })

    const result = await getDualCategoryTables(mockRequestBody)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockResponseData)
  })

  test('logs error and returns failed parse when response data is invalid', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: { invalid: 'data' }, status: 200 })

    const result = await getDualCategoryTables(mockRequestBody)

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('getDualCategoryTables parse error:'))
    expect(result.success).toBe(false)
  })

  test('logs error and returns failed parse when client throws', async () => {
    jest.mocked(client).mockRejectedValueOnce(new Error('Network error'))

    const result = await getDualCategoryTables(mockRequestBody)

    expect(logger.error).toHaveBeenCalled()
    expect(result.success).toBe(false)
  })
})
