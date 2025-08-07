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
    // Arrange
    const chartId = 'test-chart'
    mockSessionStorage.getItem.mockReturnValue(null)

    // Act
    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    // Assert
    expect(result.current).toBeUndefined()
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('timeseriesFilters')
  })

  test('should return undefined when chart filter does not exist', () => {
    // Arrange
    const chartId = 'non-existent-chart'
    const storedFilters = 'covid-cases|1-month;weather-data|7-days'
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    // Act
    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    // Assert
    expect(result.current).toBeUndefined()
  })

  test('should return correct filter when chart filter exists', () => {
    // Arrange
    const chartId = 'covid-cases'
    const expectedFilter = 'covid-cases|1-month'
    const storedFilters = `${expectedFilter};weather-data|7-days`
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    // Act
    const { result } = renderHook(() => useTimeseriesFilterValue(chartId))

    // Assert
    expect(result.current).toBe(expectedFilter)
  })

  test('should update filter when chartId changes', () => {
    // Arrange
    const initialChartId = 'covid-cases'
    const newChartId = 'weather-data'
    const storedFilters = 'covid-cases|1-month;weather-data|7-days'
    mockSessionStorage.getItem.mockReturnValue(storedFilters)

    // Act
    const { result, rerender } = renderHook(({ chartId }) => useTimeseriesFilterValue(chartId), {
      initialProps: { chartId: initialChartId },
    })

    // Assert initial state
    expect(result.current).toBe('covid-cases|1-month')

    // Act - change chartId
    rerender({ chartId: newChartId })

    // Assert updated state
    expect(result.current).toBe('weather-data|7-days')
  })
})
