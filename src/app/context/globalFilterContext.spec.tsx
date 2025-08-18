// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// globalFilterContext.spec.ts
import { ReactNode } from 'react'

import { GeographyFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { getGeographies } from '@/api/requests/geographies/getGeographies'
import { extractGeographyIdFromGeographyFilter } from '@/app/utils/global-filter-content-parser'
import { act, renderHook, waitFor } from '@/config/test-utils'

import { FilterOption, GlobalFilterProvider, useGlobalFilters } from './globalFilterContext'

// Mock the API call
jest.mock('@/api/requests/geographies/getGeographies')
const mockGetGeographies = getGeographies as jest.MockedFunction<typeof getGeographies>

// Mock the utility function
jest.mock('@/app/utils/global-filter-content-parser')
const mockExtractGeographyId = extractGeographyIdFromGeographyFilter as jest.MockedFunction<
  typeof extractGeographyIdFromGeographyFilter
>

describe('GlobalFilterContext', () => {
  const mockTimePeriods: TimePeriod[] = [
    { id: '1', value: { label: '2024-Q1', date_from: '2024-01-01', date_to: '2024-03-31' }, type: 'time_period' },
    { id: '2', value: { label: '2024-Q2', date_from: '2024-04-01', date_to: '2024-06-30' }, type: 'time_period' },
  ]

  const mockGeographyFilters: GeographyFilters = {
    geography_types: [
      { type: 'geography_filter', value: { label: 'Nation', colour: 'Red', geography_type: 'nation' }, id: '1' },
      { type: 'geography_filter', value: { label: 'Region', colour: 'Blue', geography_type: 'region' }, id: '2' },
    ],
  }

  const mockFilters = {
    timePeriods: mockTimePeriods,
    geographyFilters: mockGeographyFilters,
    thresholdFilters: null,
    dataFilters: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockExtractGeographyId.mockReturnValue(['nation', 'region'])
    mockGetGeographies.mockResolvedValue({
      data: [
        {
          geography_type: 'nation',
          geographies: [
            { name: 'England', geography_code: 'E92000001' },
            { name: 'Wales', geography_code: 'W92000004' },
          ],
        },
      ],
    })
  })

  const createWrapper =
    (filters = mockFilters) =>
    ({ children }: { children: ReactNode }) => <GlobalFilterProvider filters={filters}>{children}</GlobalFilterProvider>

  describe('Provider initialization', () => {
    test('should provide initial state correctly', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Initial state from CMS
      expect(result.current.state.timePeriods).toEqual(mockTimePeriods)
      expect(result.current.state.geographyFilters).toEqual(mockGeographyFilters)
      expect(result.current.state.selectedTimePeriod).toBeNull()
      expect(result.current.state.selectedFilters).toEqual([])

      // Initially loading geographys because geographyFilters have been updated
      expect(result.current.state.geographyAreasLoading).toBe(true)

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      //expect there to be no errors
      expect(result.current.state.geographyAreasError).toBeNull()
    })

    test('should provide action functions', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      expect(typeof result.current.actions.setSelectedTimePeriod).toBe('function')
      expect(typeof result.current.actions.updateFilters).toBe('function')
      expect(typeof result.current.actions.addFilter).toBe('function')
      expect(typeof result.current.actions.removeFilter).toBe('function')
      expect(typeof result.current.actions.clearFilters).toBe('function')
    })
  })

  describe('Time Period Actions', () => {
    test('should set selected time period', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.setSelectedTimePeriod(mockTimePeriods[0])
      })

      expect(result.current.state.selectedTimePeriod).toEqual(mockTimePeriods[0])
    })

    test('should clear selected time period', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // First set a time period
      act(() => {
        result.current.actions.setSelectedTimePeriod(mockTimePeriods[0])
      })

      // Then clear it
      act(() => {
        result.current.actions.setSelectedTimePeriod(null)
      })

      expect(result.current.state.selectedTimePeriod).toBeNull()
    })
  })

  describe('Filter Actions', () => {
    const testFilter: FilterOption = { id: 'test.filter1', label: 'Test Filter 1' }
    const testFilter2: FilterOption = { id: 'test.filter2', label: 'Test Filter 2' }

    test('should add a filter', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.addFilter(testFilter)
      })

      expect(result.current.state.selectedFilters).toContain(testFilter)
    })

    test('should not add duplicate filters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.addFilter(testFilter)
        result.current.actions.addFilter(testFilter) // Try to add the same filter
      })

      expect(result.current.state.selectedFilters).toHaveLength(1)
      expect(result.current.state.selectedFilters[0]).toEqual(testFilter)
    })

    test('should remove a filter', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Add filters first
      act(() => {
        result.current.actions.addFilter(testFilter)
        result.current.actions.addFilter(testFilter2)
      })

      // Remove one filter
      act(() => {
        result.current.actions.removeFilter(testFilter.id)
      })

      expect(result.current.state.selectedFilters).not.toContain(testFilter)
      expect(result.current.state.selectedFilters).toContain(testFilter2)
    })

    test('should update filters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      const newFilters = [testFilter, testFilter2]

      act(() => {
        result.current.actions.updateFilters(newFilters)
      })

      expect(result.current.state.selectedFilters).toEqual(newFilters)
    })

    test('should clear all filters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Add some filters first
      act(() => {
        result.current.actions.addFilter(testFilter)
        result.current.actions.addFilter(testFilter2)
      })

      // Clear all filters
      act(() => {
        result.current.actions.clearFilters()
      })

      expect(result.current.state.selectedFilters).toEqual([])
    })
  })

  describe('Geography Areas Fetching', () => {
    test('should fetch geography areas on mount when geography filters exist', async () => {
      const wrapper = createWrapper()
      renderHook(() => useGlobalFilters(), { wrapper })

      await waitFor(() => {
        expect(mockExtractGeographyId).toHaveBeenCalledWith(mockGeographyFilters)
        expect(mockGetGeographies).toHaveBeenCalledWith({ geography_type: 'nation' })
        expect(mockGetGeographies).toHaveBeenCalledWith({ geography_type: 'region' })
      })
    })

    test('should not fetch geography areas when no geography filters exist', () => {
      const filtersWithoutGeography = { ...mockFilters, geographyFilters: null }
      const wrapper = createWrapper(filtersWithoutGeography)
      renderHook(() => useGlobalFilters(), { wrapper })

      expect(mockGetGeographies).not.toHaveBeenCalled()
    })

    test('should handle API errors gracefully', async () => {
      mockGetGeographies.mockRejectedValueOnce(new Error('API Error'))

      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      await waitFor(() => {
        expect(result.current.state.geographyAreasError).toContain('Error fetching geography data')
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })
    })

    test('should set loading state during fetch', () => {
      mockGetGeographies.mockImplementation(() => new Promise(() => {})) // Never resolves

      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Should start loading immediately
      expect(result.current.state.geographyAreasLoading).toBe(true)
    })
  })

  describe('Error Handling', () => {
    test('should throw error when useGlobalFilters is used outside provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useGlobalFilters())
      }).toThrow('useGlobalFilters must be used within a GlobalFilterProvider')

      consoleSpy.mockRestore()
    })
  })
})
