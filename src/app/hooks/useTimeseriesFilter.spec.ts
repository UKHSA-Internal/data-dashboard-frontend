import { renderHook } from '@/config/test-utils'

import { useTimeseriesFilterValue } from './useTimeseriesFilter'

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

// Store original window for cleanup
const originalWindow = global.window

describe('useTimeseriesFilterValue', () => {
  beforeEach(() => {
    // Ensure window exists and has sessionStorage
    global.window = originalWindow
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
      configurable: true,
    })
    mockSessionStorage.clear()
    jest.clearAllMocks()
  })

  afterAll(() => {
    global.window = originalWindow
  })

  test('should return undefined when no filters exist in session storage', () => {
    const chartId = 'test-chart'
    mockSessionStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    expect(result.current).toBeUndefined()
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('timeseriesFilters')
  })

  test('should return undefined when chart filter does not exist', () => {
    const chartId = 'non-existent-chart'
    const storedFilters = 'covid-cases|1-month;weather-data|7-days'
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    expect(result.current).toBeUndefined()
  })

  test('should return correct filter when chart filter exists', () => {
    const chartId = 'covid-cases'
    const expectedFilter = 'covid-cases|1-month'
    const storedFilters = `${expectedFilter};weather-data|7-days`
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    expect(result.current).toBe(expectedFilter)
  })

  test('should update filter when chartId changes', () => {
    const initialChartId = 'covid-cases'
    const newChartId = 'weather-data'
    const storedFilters = 'covid-cases|1-month;weather-data|7-days'
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    const { result, rerender } = renderHook(({ chartId }) => useTimeseriesFilterValue(chartId), {
      initialProps: { chartId: initialChartId },
    })

    expect(result.current).toBe('covid-cases|1-month')

    rerender({ chartId: newChartId })

    expect(result.current).toBe('weather-data|7-days')
  })

  test('should return undefined when window is undefined (SSR)', () => {
    mockSessionStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTimeseriesFilterValue('test-chart'))

    expect(result.current).toBeUndefined()
  })
})
