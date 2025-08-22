// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
  // Mock data setup
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

  // Mock geography areas that would be returned by the API
  const mockGeographyAreas = [
    {
      name: 'England',
      geography_code: 'E92000001',
      geography_type: 'nation',
      parent_geography_code: 'UK',
      relationships: [],
    },
    {
      name: 'Wales',
      geography_code: 'W92000004',
      geography_type: 'nation',
      parent_geography_code: 'UK',
      relationships: [],
    },
    {
      name: 'Ireland',
      geography_code: 'I92000005',
      geography_type: 'nation',
      parent_geography_code: 'UK',
      relationships: [],
    },
  ]

  // Create mock threshold filters
  const mockThresholdFilters = {
    thresholds: [
      {
        id: 'threshold1',
        type: 'threshold',
        value: {
          label: 'Low Threshold',
          colour: '#FF0000',
          boundary_minimum_value: 0,
          boundary_maximum_value: 50,
        },
      },
      {
        id: 'threshold2',
        type: 'threshold',
        value: {
          label: 'High Threshold',
          colour: '#00FF00',
          boundary_minimum_value: 51,
          boundary_maximum_value: 100,
        },
      },
    ],
  }

  // Create mock data filters (vaccinations)
  const mockDataFilters = {
    data_filters: [
      {
        id: 'vaccine1',
        type: 'data_filter',
        value: {
          label: 'First Dose',
          colour: '#0000FF',
          parameters: {
            theme: { name: 'Vaccination', id: 'vaccination' },
            sub_theme: { name: 'COVID-19', id: 'covid19' },
            topic: { name: 'Doses', id: 'doses' },
            stratum: { name: 'All', id: 'all' },
            metric: { name: 'First Dose', id: 'first_dose' },
            age: { name: 'All Ages', id: 'all_ages' },
            sex: { name: 'All', id: 'all' },
          },
          accompanying_points: [],
        },
      },
      {
        id: 'vaccine2',
        type: 'data_filter',
        value: {
          label: 'Second Dose',
          colour: '#00FFFF',
          parameters: {
            theme: { name: 'Vaccination', id: 'vaccination' },
            sub_theme: { name: 'COVID-19', id: 'covid19' },
            topic: { name: 'Doses', id: 'doses' },
            stratum: { name: 'All', id: 'all' },
            metric: { name: 'Second Dose', id: 'second_dose' },
            age: { name: 'All Ages', id: 'all_ages' },
            sex: { name: 'All', id: 'all' },
          },
          accompanying_points: [],
        },
      },
    ],
  }

  const mockFilters = {
    timePeriods: mockTimePeriods,
    geographyFilters: mockGeographyFilters,
    thresholdFilters: mockThresholdFilters,
    dataFilters: mockDataFilters,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockExtractGeographyId.mockReturnValue(['nation', 'region'])
    mockGetGeographies.mockResolvedValue({
      data: [
        {
          geography_type: 'nation',
          geographies: mockGeographyAreas,
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
      expect(result.current.state.thresholdFilters).toEqual(mockThresholdFilters)
      expect(result.current.state.dataFilters).toEqual(mockDataFilters)

      // Initial selected values
      expect(result.current.state.selectedTimePeriod).toBeNull()
      expect(result.current.state.selectedVaccination).toBeNull()
      expect(result.current.state.selectedFilters).toEqual([])
      expect(result.current.state.selectedGeographyFilters).toEqual([])
      expect(result.current.state.selectedThresholdFilters).toEqual([])
      expect(result.current.state.selectedVaccinationFilters).toEqual([])

      // Initially loading geographies because geographyFilters have been updated
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
      expect(typeof result.current.actions.setSelectedVaccination).toBe('function')
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

  describe('Vaccination Actions', () => {
    test('should set selected vaccination', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.setSelectedVaccination(mockDataFilters.data_filters[0])
      })

      expect(result.current.state.selectedVaccination).toEqual(mockDataFilters.data_filters[0])
    })

    test('should clear selected vaccination', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // First set a vaccination
      act(() => {
        result.current.actions.setSelectedVaccination(mockDataFilters.data_filters[0])
      })

      // Then clear it
      act(() => {
        result.current.actions.setSelectedVaccination(null)
      })

      expect(result.current.state.selectedVaccination).toBeNull()
    })
  })

  describe('Filter Actions', () => {
    // Test filter option definitions for different filter types
    const geographyFilter: FilterOption = {
      id: 'geography.nation.E92000001',
      label: 'England',
    }

    const dataFilter: FilterOption = {
      id: 'data_filter.vaccine1',
      label: 'COVID-19',
    }

    const thresholdFilter: FilterOption = {
      id: 'threshold.threshold1',
      label: 'Low Threshold',
    }

    test('should add a geography filter and update selectedGeographyFilters', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('nation', mockGeographyAreas)

      act(() => {
        result.current.actions.addFilter(geographyFilter)
      })

      // Check that the filter was added to selectedFilters
      expect(result.current.state.selectedFilters).toContain(geographyFilter)

      // Check that the geography was added to selectedGeographyFilters
      expect(result.current.state.selectedGeographyFilters).toHaveLength(1)
      expect(result.current.state.selectedGeographyFilters[0].geography_code).toBe('E92000001')
    })

    test('should add a data filter and update selectedVaccinationFilters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.addFilter(dataFilter)
      })

      // Check that the filter was added to selectedFilters
      expect(result.current.state.selectedFilters).toContain(dataFilter)

      // Check that the data filter was added to selectedVaccinationFilters
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(1)
      expect(result.current.state.selectedVaccinationFilters[0].id).toBe('vaccine1')
    })

    test('should add a threshold filter and update selectedThresholdFilters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.addFilter(thresholdFilter)
      })

      // Check that the filter was added to selectedFilters
      expect(result.current.state.selectedFilters).toContain(thresholdFilter)

      // Check that the threshold filter was added to selectedThresholdFilters
      expect(result.current.state.selectedThresholdFilters).toHaveLength(1)
      expect(result.current.state.selectedThresholdFilters[0].id).toBe('threshold1')
    })

    test('should not add duplicate filters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      act(() => {
        result.current.actions.addFilter(dataFilter)
        result.current.actions.addFilter(dataFilter) // Try to add the same filter
      })

      expect(result.current.state.selectedFilters).toHaveLength(1)
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(1)
    })

    test('should remove a geography filter and update selectedGeographyFilters', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('nation', mockGeographyAreas)

      // Add filters first
      act(() => {
        result.current.actions.addFilter(geographyFilter)
        result.current.actions.addFilter(dataFilter)
      })

      // Remove the geography filter
      act(() => {
        result.current.actions.removeFilter(geographyFilter.id)
      })

      expect(result.current.state.selectedFilters).not.toContain(geographyFilter)
      expect(result.current.state.selectedFilters).toContain(dataFilter)
      expect(result.current.state.selectedGeographyFilters).toHaveLength(0)
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(1)
    })

    test('should remove a data filter and update selectedVaccinationFilters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Add filters first
      act(() => {
        result.current.actions.addFilter(dataFilter)
        result.current.actions.addFilter(thresholdFilter)
      })

      // Remove the data filter
      act(() => {
        result.current.actions.removeFilter(dataFilter.id)
      })

      expect(result.current.state.selectedFilters).not.toContain(dataFilter)
      expect(result.current.state.selectedFilters).toContain(thresholdFilter)
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(0)
      expect(result.current.state.selectedThresholdFilters).toHaveLength(1)
    })

    test('should remove a threshold filter and update selectedThresholdFilters', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Add filters first
      act(() => {
        result.current.actions.addFilter(thresholdFilter)
        result.current.actions.addFilter(dataFilter)
      })

      // Remove the threshold filter
      act(() => {
        result.current.actions.removeFilter(thresholdFilter.id)
      })

      expect(result.current.state.selectedFilters).not.toContain(thresholdFilter)
      expect(result.current.state.selectedFilters).toContain(dataFilter)
      expect(result.current.state.selectedThresholdFilters).toHaveLength(0)
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(1)
    })

    test('should update filters and related specialized filter arrays', () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      const newFilters = [dataFilter]

      act(() => {
        result.current.actions.updateFilters(newFilters)
      })

      expect(result.current.state.selectedFilters).toEqual(newFilters)
      expect(result.current.state.selectedVaccinationFilters).toHaveLength(1)
      expect(result.current.state.selectedVaccinationFilters[0].id).toBe('vaccine1')
    })

    test('should clear all filters and specialized filter arrays', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('nation', mockGeographyAreas)

      // Add some filters first
      act(() => {
        result.current.actions.addFilter(geographyFilter)
        result.current.actions.addFilter(dataFilter)
        result.current.actions.addFilter(thresholdFilter)
      })

      // Clear all filters
      act(() => {
        result.current.actions.clearFilters()
      })

      expect(result.current.state.selectedFilters).toEqual([])
      expect(result.current.state.selectedGeographyFilters).toEqual([])
      expect(result.current.state.selectedVaccinationFilters).toEqual([])
      expect(result.current.state.selectedThresholdFilters).toEqual([])
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

  describe('addFilterFromMap Action', () => {
    // Test filter options for geography filters with specific ID format
    const mapFilter1: FilterOption = {
      id: 'geography.Upper Tier Local Authority.E92000001',
      label: 'England',
    }

    const mapFilter2: FilterOption = {
      id: 'geography.Upper Tier Local Authority.W92000004',
      label: 'Wales',
    }

    const mapFilter3: FilterOption = {
      id: 'geography.Upper Tier Local Authority.I92000005',
      label: 'UTLA 3',
    }

    test('should add a geography filter from map without mapSelectedId', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('Upper Tier Local Authority', mockGeographyAreas)

      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1)
      })

      // Check that the filter was added to selectedFilters
      expect(result.current.state.selectedFilters).toContain(mapFilter1)

      // Check that the geography was added to selectedGeographyFilters
      expect(result.current.state.selectedGeographyFilters).toHaveLength(1)
      expect(result.current.state.selectedGeographyFilters[0].geography_code).toBe('E92000001')
      expect(result.current.state.selectedGeographyFilters[0].name).toBe('England')
    })

    test('should add a geography filter from map with mapSelectedId when no previous filter exists', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('Upper Tier Local Authority', mockGeographyAreas)

      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1, 'E92000001')
      })

      // Check that the filter was added to selectedFilters
      expect(result.current.state.selectedFilters).toContain(mapFilter1)

      // Check that the geography was added to selectedGeographyFilters
      expect(result.current.state.selectedGeographyFilters).toHaveLength(1)
      expect(result.current.state.selectedGeographyFilters[0].geography_code).toBe('E92000001')
    })

    test('should replace existing geography filter when mapSelectedId matches existing filter', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('Upper Tier Local Authority', mockGeographyAreas)

      // Add initial filter
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1)
      })

      // Verify initial state
      expect(result.current.state.selectedFilters).toHaveLength(1)
      expect(result.current.state.selectedGeographyFilters).toHaveLength(1)
      expect(result.current.state.selectedFilters[0].id).toBe('geography.Upper Tier Local Authority.E92000001')

      // Add Wales filter with England's mapSelectedId (should replace England)
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter2, 'E92000001')
      })

      // Check that England filter was removed and Wales was added
      expect(result.current.state.selectedFilters).toHaveLength(1)
      expect(result.current.state.selectedFilters[0].id).toBe('geography.Upper Tier Local Authority.W92000004')
      expect(result.current.state.selectedFilters[0].label).toBe('Wales')

      // Check geography filters were updated correctly
      expect(result.current.state.selectedGeographyFilters).toHaveLength(1)
      expect(result.current.state.selectedGeographyFilters[0].geography_code).toBe('W92000004')
      expect(result.current.state.selectedGeographyFilters[0].name).toBe('Wales')
    })

    test('should remove existing geography filter by mapSelectedId and add new filter', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('Upper Tier Local Authority', mockGeographyAreas)

      // Add England filter first
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1)
      })

      // Add Wales filter first (no mapSelectedId)
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter2)
      })

      // Verify we have both filters
      expect(result.current.state.selectedFilters).toHaveLength(2)
      expect(result.current.state.selectedGeographyFilters).toHaveLength(2)

      // Now add a new England filter with Wales' mapSelectedId (should remove Wales, keep new England)
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter3, 'W92000004')
      })

      // Should have 2 filters: original England + new England (Wales removed)
      expect(result.current.state.selectedFilters).toHaveLength(2)
      expect(result.current.state.selectedGeographyFilters).toHaveLength(2)

      // Check that Wales was removed from geography filters
      const walesGeoFilter = result.current.state.selectedGeographyFilters.find(
        (geo) => geo.geography_code === 'W92000004'
      )
      expect(walesGeoFilter).toBeUndefined()
    })

    test('should handle non-existent geography in geographyAreas', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Don't set up geography areas or set up with different type
      result.current.state.geographyAreas.set('region', []) // Empty region data

      const initialFiltersCount = result.current.state.selectedFilters.length
      const initialGeographyCount = result.current.state.selectedGeographyFilters.length

      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1) // nation type, but no nation data
      })

      // Filter should be added to selectedFilters
      expect(result.current.state.selectedFilters).toHaveLength(initialFiltersCount + 1)
      expect(result.current.state.selectedFilters).toContain(mapFilter1)

      // But geography should not be added to selectedGeographyFilters since it doesn't exist
      expect(result.current.state.selectedGeographyFilters).toHaveLength(initialGeographyCount)
    })

    test('should handle mapSelectedId removal when corresponding geography filter does not exist', async () => {
      const wrapper = createWrapper()
      const { result } = renderHook(() => useGlobalFilters(), { wrapper })

      // Wait for geography areas to be loaded
      await waitFor(() => {
        expect(result.current.state.geographyAreasLoading).toBe(false)
      })

      // Set up geography areas in the Map
      result.current.state.geographyAreas.set('nation', mockGeographyAreas)

      // Add a filter normally first
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter1)
      })

      const initialState = {
        filters: [...result.current.state.selectedFilters],
        geoFilters: [...result.current.state.selectedGeographyFilters],
      }

      // Try to add Wales with a non-existent mapSelectedId
      act(() => {
        result.current.actions.addFilterFromMap(mapFilter2, 'NONEXISTENT123')
      })

      // Wales should be added
      expect(result.current.state.selectedFilters).toHaveLength(initialState.filters.length + 1)
      expect(result.current.state.selectedFilters).toContain(mapFilter2)

      // Original England filter should still be there
      expect(result.current.state.selectedFilters).toContain(mapFilter1)
    })
  })
})
