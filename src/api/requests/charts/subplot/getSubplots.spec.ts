import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { getSubplots, RequestParams, requestSchema, responseSchema } from './getSubplots'

// Mock the dependencies
jest.mock('@/api/utils/api.utils')
jest.mock('@/lib/logger')
jest.mock('@/app/utils/app.utils', () => ({
  isSSR: false,
}))

const mockClient = client as jest.MockedFunction<typeof client>
const mockLogger = logger as jest.Mocked<typeof logger>

describe('getSubplots', () => {
  const mockValidRequestParams: RequestParams = {
    file_format: 'svg',
    chart_width: 515,
    chart_height: 260,
    x_axis_title: 'Coverage %',
    y_axis_title: 'Year',
    y_axis_minimum_value: null,
    y_axis_maximum_value: null,
    target_threshold: 95,
    target_threshold_label: 'coverage %',
    chart_parameters: {
      x_axis: 'geography',
      y_axis: 'metric',
      theme: 'immunisation',
      sub_theme: 'childhood_vaccines',
      date_from: '2023-04-01',
      date_to: '2024-03-31',
      age: 'all',
      sex: 'all',
      stratum: '24m',
    },
    subplots: [
      {
        subplot_title: '6-in-1 (1 year)',
        subplot_parameters: {
          topic: '6-in-1',
          metric: '6-in-1_coverage_coverageByYear',
          stratum: '12m',
        },
        plots: [
          {
            label: 'United Kingdom',
            geography_type: 'United Kingdom',
            geography: 'United Kingdom',
            line_colour: 'COLOUR_9_DEEP_PLUM',
          },
          {
            label: 'Northern Ireland',
            geography_type: 'Nation',
            geography: 'Northern Ireland',
            line_colour: 'COLOUR_1_DARK_BLUE',
          },
        ],
      },
    ],
  }

  const mockValidResponse = {
    chart: 'mock-svg-string',
    last_updated: '2024-03-31',
    alt_text: 'Mock alt text for accessibility',
    figure: {
      data: [
        {
          marker: { color: ['rgba(51, 25, 77, 1)'] },
          name: 'United Kingdom',
          x: ['United Kingdom'],
          y: [91.61],
          type: 'bar',
        },
      ],
      layout: {
        template: { data: {} },
        xaxis: { anchor: 'y', domain: [0, 1] },
        yaxis: { anchor: 'x', domain: [0, 1] },
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('successful responses', () => {
    it('should successfully fetch chart data with valid parameters', async () => {
      mockClient.mockResolvedValue({ status: 200, data: mockValidResponse })

      const result = await getSubplots(mockValidRequestParams)

      expect(mockClient).toHaveBeenCalledWith('proxy/charts/subplot/v1', {
        body: mockValidRequestParams,
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(mockValidResponse)
      }
    })

    it('should use SSR path when isSSR is true', async () => {
      // Mock isSSR to return true for this test
      jest.doMock('@/app/utils/app.utils', () => ({
        isSSR: true,
      }))

      // Re-import to get the mocked version
      const { getSubplots: getSubplotsSSR } = await import('./getSubplots')

      mockClient.mockResolvedValue({ status: 200, data: mockValidResponse })

      await getSubplotsSSR(mockValidRequestParams)

      expect(mockClient).toHaveBeenCalledWith('proxy/charts/subplot/v1', {
        body: mockValidRequestParams,
      })
    })

    it('should handle optional parameters correctly', async () => {
      const requestWithOptionalParams: RequestParams = {
        ...mockValidRequestParams,
        x_axis_title: undefined,
        y_axis_title: undefined,
        y_axis_minimum_value: undefined,
        y_axis_maximum_value: undefined,
        target_threshold_label: null,
      }

      mockClient.mockResolvedValue({ status: 200, data: mockValidResponse })

      const result = await getSubplots(requestWithOptionalParams)

      expect(result.success).toBe(true)
      expect(mockClient).toHaveBeenCalledWith('proxy/charts/subplot/v1', {
        body: requestWithOptionalParams,
      })
    })

    it('should handle multiple subplots correctly', async () => {
      const requestWithMultipleSubplots: RequestParams = {
        ...mockValidRequestParams,
        subplots: [
          mockValidRequestParams.subplots[0],
          {
            subplot_title: 'PCV (1 year)',
            subplot_parameters: {
              topic: 'pneumococcal',
              metric: 'pneumococcal_coverage_coverageByYear',
              stratum: '12m',
            },
            plots: [
              {
                label: 'United Kingdom',
                geography_type: 'United Kingdom',
                geography: 'United Kingdom',
                line_colour: 'COLOUR_9_DEEP_PLUM',
              },
            ],
          },
        ],
      }

      mockClient.mockResolvedValue({ status: 200, data: mockValidResponse })

      const result = await getSubplots(requestWithMultipleSubplots)

      expect(result.success).toBe(true)
      expect(mockClient).toHaveBeenCalledWith('proxy/charts/subplot/v1', {
        body: requestWithMultipleSubplots,
      })
    })
  })

  describe('error handling', () => {
    it('should handle 400 errors and log info message', async () => {
      const error400 = new Error('Bad Request')
      error400.code = 400
      mockClient.mockRejectedValue(error400)

      const result = await getSubplots(mockValidRequestParams)

      expect(mockLogger.info).toHaveBeenCalledWith('POST failed (no data) charts/subplot/v1 %s', '6-in-1 (1 year)')
      expect(result.success).toBe(false)
    })

    it('should handle non-400 errors and log error message', async () => {
      const genericError = new Error('Internal Server Error')
      genericError.code = 500
      mockClient.mockRejectedValue(genericError)

      const result = await getSubplots(mockValidRequestParams)

      expect(mockLogger.error).toHaveBeenCalledWith('Internal Server Error')
      expect(result.success).toBe(false)
    })

    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network error')
      mockClient.mockRejectedValue(networkError)

      const result = await getSubplots(mockValidRequestParams)

      expect(mockLogger.error).toHaveBeenCalledWith('Network error')
      expect(result.success).toBe(false)
    })

    it('should handle multiple subplot titles in 400 error logging', async () => {
      const requestWithMultipleSubplots: RequestParams = {
        ...mockValidRequestParams,
        subplots: [
          { ...mockValidRequestParams.subplots[0], subplot_title: 'First Plot' },
          { ...mockValidRequestParams.subplots[0], subplot_title: 'Second Plot' },
        ],
      }

      const error400 = new Error('Bad Request')
      error400.code = 400
      mockClient.mockRejectedValue(error400)

      await getSubplots(requestWithMultipleSubplots)

      expect(mockLogger.info).toHaveBeenCalledWith(
        'POST failed (no data) charts/subplot/v1 %s',
        'First Plot,Second Plot'
      )
    })
  })

  describe('schema validation', () => {
    it('should return success false when response does not match schema', async () => {
      const invalidResponse = {
        chart: 123, // Should be string
        last_updated: '2024-03-31',
        alt_text: 'Mock alt text',
        figure: { data: [], layout: {} },
      }

      mockClient.mockResolvedValue({ status: 400, data: invalidResponse })

      const result = await getSubplots(mockValidRequestParams)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeDefined()
      }
    })

    it('should handle missing required fields in response', async () => {
      const incompleteResponse = {
        chart: 'mock-svg-string',
        // Missing last_updated, alt_text, and figure
      }

      mockClient.mockResolvedValue({ status: 400, data: incompleteResponse })

      const result = await getSubplots(mockValidRequestParams)

      expect(result.success).toBe(false)
    })
  })

  describe('request parameter mapping', () => {
    it('should correctly map all request parameters', async () => {
      mockClient.mockResolvedValue({ status: 400, data: mockValidResponse })

      await getSubplots(mockValidRequestParams)

      const expectedBody = {
        file_format: 'svg',
        chart_width: 515,
        chart_height: 260,
        x_axis_title: 'Coverage %',
        y_axis_title: 'Year',
        y_axis_minimum_value: null,
        y_axis_maximum_value: null,
        target_threshold: 95,
        target_threshold_label: 'coverage %',
        chart_parameters: mockValidRequestParams.chart_parameters,
        subplots: mockValidRequestParams.subplots,
      }

      expect(mockClient).toHaveBeenCalledWith('proxy/charts/subplot/v1', {
        body: expectedBody,
      })
    })

    it('should preserve subplot structure in request body', async () => {
      mockClient.mockResolvedValue({ status: 400, data: mockValidResponse })

      await getSubplots(mockValidRequestParams)

      const callArgs = mockClient.mock.calls[0][1]
      const requestBody = callArgs?.body as RequestParams

      expect(requestBody.subplots).toHaveLength(1)
      expect(requestBody.subplots[0].subplot_title).toBe('6-in-1 (1 year)')
      expect(requestBody.subplots[0].plots).toHaveLength(2)
      expect(requestBody.subplots[0].plots[0].label).toBe('United Kingdom')
    })
  })
  describe('requestSchema validation', () => {
    it('should validate a complete valid request', () => {
      const result = requestSchema.safeParse(mockValidRequestParams)
      expect(result.success).toBe(true)
    })

    it('should reject request with invalid file_format', () => {
      const invalidRequest = {
        ...mockValidRequestParams,
        file_format: 123,
      }
      const result = requestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })

    it('should reject request without required fields', () => {
      const incompleteRequest = {
        file_format: 'svg',
        // Missing other required fields
      }
      const result = requestSchema.safeParse(incompleteRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('responseSchema validation', () => {
    it('should validate a complete valid response', () => {
      const result = responseSchema.safeParse(mockValidResponse)
      expect(result.success).toBe(true)
    })

    it('should reject response with missing chart field', () => {
      const invalidResponse = {
        ...mockValidResponse,
        chart: undefined,
      }
      const result = responseSchema.safeParse(invalidResponse)
      expect(result.success).toBe(false)
    })
  })
})
