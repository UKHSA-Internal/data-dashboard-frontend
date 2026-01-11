import { renderHook } from '@/config/test-utils'

import { useTimeseriesFilterUpdater, useTimeseriesFilterValue } from './useTimeseriesFilter'

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

describe('useTimeseriesFilterUpdater', () => {
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

  const originalWindow = global.window

  beforeEach(() => {
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

  test('setFilter adds new filter to session storage', () => {
    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.setFilter('chart1|1-month')

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('timeseriesFilters', 'chart1|1-month')
  })

  test('setFilter removes existing filter with same name before adding new one', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|old-value;chart2|value2')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.setFilter('chart1|new-value')

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('timeseriesFilters', 'chart2|value2;chart1|new-value')
  })

  test('setFilter does not add filter when value is "all"', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|1-month')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.setFilter('chart1|all')

    // Should remove the existing filter and not add new one
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('timeseriesFilters')
  })

  test('setFilter removes all filters when last filter is set to "all"', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|1-month')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.setFilter('chart1|all')

    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('timeseriesFilters')
  })

  test('setFilter filters out empty strings before saving', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|value1;;chart2|value2')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.setFilter('chart3|value3')

    const callArgs = mockSessionStorage.setItem.mock.calls[0]
    const savedValue = callArgs[1]
    expect(savedValue).not.toContain(';;')
    expect(savedValue.split(';').every((filter: string) => filter.length > 0)).toBe(true)
  })

  test('getAllFilters returns empty array when no filters exist', () => {
    mockSessionStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    const filters = result.current.getAllFilters()

    expect(filters).toEqual([])
  })

  test('getAllFilters returns array of filters when filters exist', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|1-month;chart2|7-days')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    const filters = result.current.getAllFilters()

    expect(filters).toEqual(['chart1|1-month', 'chart2|7-days'])
  })

  test('getAllFilters returns empty array when no filters exist (simulating SSR)', () => {
    mockSessionStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    const filters = result.current.getAllFilters()

    expect(filters).toEqual([])
  })

  test('clearAllFilters removes all filters from session storage', () => {
    mockSessionStorage.getItem.mockReturnValue('chart1|1-month;chart2|7-days')

    const { result } = renderHook(() => useTimeseriesFilterUpdater())

    result.current.clearAllFilters()

    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('timeseriesFilters')
  })
})
