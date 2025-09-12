import { MapDataRequest, MapDataResponse } from '@/api/models/Maps'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock all dependencies
jest.mock('@/api/utils/api.utils')
jest.mock('@/lib/logger')

// Mock MapDataResponse.safeParse - define the mock inline
jest.mock('@/api/models/Maps', () => ({
  MapDataResponse: {
    safeParse: jest.fn(),
  },
}))

const mockClient = client as jest.MockedFunction<typeof client>
const mockLogger = logger as jest.Mocked<typeof logger>

// Get the mocked safeParse function after the mock is set up
const mockSafeParse = MapDataResponse.safeParse as jest.MockedFunction<typeof MapDataResponse.safeParse>

describe('postMapData', () => {
  const mockRequest: MapDataRequest = {
    geography: 'England',
    metric: 'new_cases_7_day_rolling',
    date: '2024-01-01',
  } as unknown as MapDataRequest

  const mockSuccessResponse = {
    data: [
      {
        geography_code: 'E06000001',
        geography_type: 'Upper Tier Local Authority',
        geography: 'Test Geography',
        metric_value: 100,
        accompanying_points: null,
      },
    ],
    latest_date: '2024-01-01',
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockSafeParse.mockReturnValue({ success: true as const, data: mockSuccessResponse })
  })

  test('passes the request object as body to client', async () => {
    mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })
    const { postMapData } = await import('./postMaps')
    await postMapData(mockRequest)

    expect(mockClient).toHaveBeenCalledWith(expect.any(String), {
      body: mockRequest,
    })
  })

  test('calls MapDataResponse.safeParse with client response data on success', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })

    await postMapData(mockRequest)

    expect(mockSafeParse).toHaveBeenCalledWith(mockSuccessResponse)
  })

  test('returns the result of MapDataResponse.safeParse on successful API call', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const expectedParsedResult = { success: true as const, data: mockSuccessResponse }

    mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })
    mockSafeParse.mockReturnValue(expectedParsedResult)

    const result = await postMapData(mockRequest)

    expect(result).toBe(expectedParsedResult)
  })

  test('logs error when client throws an exception', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const mockError = new Error('API request failed')

    mockClient.mockRejectedValue(mockError)

    await postMapData(mockRequest)

    expect(mockLogger.error).toHaveBeenCalledWith(mockError)
  })

  test('calls MapDataResponse.safeParse with default empty data when client throws an exception', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const mockError = new Error('API request failed')

    mockClient.mockRejectedValue(mockError)

    await postMapData(mockRequest)

    expect(mockSafeParse).toHaveBeenCalledWith({
      data: [],
      latest_date: '',
    })
  })

  test('returns the result of MapDataResponse.safeParse with default data when client throws an exception', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const expectedErrorResult = { success: false as const, error: {} as any }
    const mockError = new Error('API request failed')

    mockClient.mockRejectedValue(mockError)
    mockSafeParse.mockReturnValue(expectedErrorResult)

    const result = await postMapData(mockRequest)

    expect(result).toBe(expectedErrorResult)
  })

  test('handles network timeout errors gracefully', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const timeoutError = new Error('Network timeout')
    timeoutError.name = 'TimeoutError'

    mockClient.mockRejectedValue(timeoutError)

    await postMapData(mockRequest)

    expect(mockLogger.error).toHaveBeenCalledWith(timeoutError)
    expect(mockSafeParse).toHaveBeenCalledWith({
      data: [],
      latest_date: '',
    })
  })

  test('handles different request object structures correctly', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: false,
    }))
    const { postMapData } = await import('./postMaps')
    const complexRequest = {
      geography: 'Scotland',
      metric: 'deaths_7_day_rolling',
      date: '2024-02-15',
      additionalFilter: 'some_value',
    } as unknown as MapDataRequest

    mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })

    await postMapData(complexRequest)

    expect(mockClient).toHaveBeenCalledWith('proxy/maps/v1', {
      body: complexRequest,
    })
  })

  test('preserves the exact client response data structure when parsing', async () => {
    jest.doMock('@/app/utils/app.utils', () => ({
      isSSR: true,
    }))
    const { postMapData } = await import('./postMaps')
    const complexResponseData = {
      data: [
        {
          geography_code: 'E06000001',
          geography_type: 'Upper Tier Local Authority',
          geography: 'North Geography',
          metric_value: 100,
          accompanying_points: null,
        },
        {
          geography_code: 'E06000002',
          geography_type: 'Upper Tier Local Authority',
          geography: 'South Geography',
          metric_value: 200,
          accompanying_points: null,
        },
      ],
      latest_date: '2024-01-15',
    }

    mockClient.mockResolvedValue({ data: complexResponseData, status: 200 })
    await postMapData(mockRequest)

    expect(mockSafeParse).toHaveBeenCalledWith(complexResponseData)
  })

  describe('postMapData - isSSR path selection', () => {
    const mockRequest: MapDataRequest = {
      geography: 'England',
      metric: 'new_cases_7_day_rolling',
      date: '2024-01-01',
    } as unknown as MapDataRequest

    const mockSuccessResponse = {
      data: [
        {
          geography_code: 'E06000001',
          geography_type: 'Upper Tier Local Authority',
          geography: 'Test Geography',
          metric_value: 100,
          accompanying_points: null,
        },
      ],
      latest_date: '2024-01-01',
    }

    beforeEach(() => {
      jest.resetModules()
      // Re-setup the mocks that resetModules cleared
      jest.mock('@/api/utils/api.utils')
      jest.mock('@/lib/logger')
      jest.mock('@/api/models/Maps', () => ({
        MapDataResponse: {
          safeParse: jest.fn().mockReturnValue({ success: true, data: mockSuccessResponse }),
        },
      }))
    })

    test('calls client with SSR path when isSSR is true', async () => {
      jest.doMock('@/app/utils/app.utils', () => ({
        isSSR: true,
      }))

      const { postMapData } = await import('./postMaps')
      const { client } = await import('@/api/utils/api.utils')
      const mockClient = client as jest.MockedFunction<typeof client>

      mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })

      await postMapData(mockRequest)

      expect(mockClient).toHaveBeenCalledWith('maps/v1', {
        body: mockRequest,
      })
    })

    test('calls client with proxy path when isSSR is false', async () => {
      jest.doMock('@/app/utils/app.utils', () => ({
        isSSR: false,
      }))

      const { postMapData } = await import('./postMaps')
      const { client } = await import('@/api/utils/api.utils')
      const mockClient = client as jest.MockedFunction<typeof client>

      mockClient.mockResolvedValue({ data: mockSuccessResponse, status: 200 })

      await postMapData(mockRequest)

      expect(mockClient).toHaveBeenCalledWith('proxy/maps/v1', {
        body: mockRequest,
      })
    })
  })
})
