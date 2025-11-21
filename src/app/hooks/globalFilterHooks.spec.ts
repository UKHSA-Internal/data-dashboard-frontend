import {
  DataFilter,
  DataFilters,
  FilterLinkedSubplotData,
  FilterLinkedTimeSeriesData,
  ThresholdFilter,
  ThresholdFilters,
} from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchema } from '@/api/requests/geographies/getGeographies'
import { useGlobalFilters } from '@/app/features/global-filter/context/globalFilterContext'
import { mockGeographyFilters, mockTimePeriods, renderHook } from '@/config/test-utils'

import {
  useCoverageTemplateData,
  useDataFilters,
  useErrorData,
  useGeographyFilters,
  useGeographyState,
  useMapData,
  useSelectedFilters,
  useThresholdFilters,
  useTimePeriods,
  useTimeSeriesData,
  useVaccinationState,
} from './globalFilterHooks'

// Mock useGlobalFilters
jest.mock('@/app/features/global-filter/context/globalFilterContext', () => ({
  ...jest.requireActual('@/app/features/global-filter/context/globalFilterContext'),
  useGlobalFilters: jest.fn(),
}))

const mockUseGlobalFilters = useGlobalFilters as jest.MockedFunction<typeof useGlobalFilters>

const mockThresholdFilters: ThresholdFilters = {
  label: 'Thresholds',
  thresholds: [
    {
      id: 'threshold-1',
      type: 'threshold',
      value: {
        label: 'Target',
        colour: '#00FF00',
        boundary_minimum_value: 90,
        boundary_maximum_value: 100,
      },
    },
  ],
}

const mockDataFilters: DataFilters = {
  label: 'Filters',
  data_filters: [
    {
      id: 'filter-1',
      type: 'data_filter',
      value: {
        label: 'COVID-19 Cases',
        colour: '#FF0000',
        parameters: {
          theme: { label: 'Theme', value: 'infectious_disease' },
          sub_theme: { label: 'Sub Theme', value: 'respiratory' },
          topic: { label: 'COVID-19', value: 'COVID-19' },
          metric: { label: 'Cases', value: 'new_cases_7days_sum' },
          stratum: { label: 'All', value: 'default' },
          sex: { label: 'All', value: 'all' },
          age: { label: 'All Ages', value: 'all' },
        },
        accompanying_points: [],
      },
    },
  ],
  categories_to_group_by: [],
}

const mockTimeseriesTemplateData: FilterLinkedTimeSeriesData = {
  title_prefix: 'Cases',
  legend_title: 'Number of cases',
  about: 'About cases data',
}

const mockCoverageTemplateData: FilterLinkedSubplotData = {
  title_prefix: 'Coverage',
  legend_title: 'Coverage %',
  target_threshold: 95,
  target_threshold_label: 'Target',
  about: 'About coverage data',
}

const mockSelectedFilters = [
  { id: 'filter-1', label: 'Filter 1' },
  { id: 'filter-2', label: 'Filter 2' },
]

const mockSelectedVaccinationFilters: DataFilter[] = [
  {
    id: 'vaccination-1',
    type: 'data_filter',
    value: {
      label: '6-in-1 (12 months)',
      colour: '#FF0000',
      parameters: {
        theme: { label: 'Theme', value: 'immunisation' },
        sub_theme: { label: 'Sub Theme', value: 'childhood_vaccines' },
        topic: { label: '6-in-1', value: '6-in-1' },
        metric: { label: 'Coverage', value: '6-in-1_coverage_coverageByYear' },
        stratum: { label: '12 months', value: '12m' },
        sex: { label: 'All', value: 'all' },
        age: { label: 'All Ages', value: 'all' },
      },
      accompanying_points: [],
    },
  },
]

const mockSelectedGeographyFilters: GeographiesSchema = [
  {
    name: 'England',
    geography_code: 'E92000001',
    geography_type: 'Nation',
    relationships: [],
  },
]

const mockSelectedThresholdFilters: ThresholdFilter[] = [
  {
    id: 'threshold-1',
    type: 'threshold',
    value: {
      label: 'Target',
      colour: '#00FF00',
      boundary_minimum_value: 90,
      boundary_maximum_value: 100,
    },
  },
]

const mockGeographyAreas = new Map<string, GeographiesSchema>()

const mockMapData = {
  data: [],
  last_updated: '2024-03-31',
}

const mockActions = {
  updateFilters: jest.fn(),
  addFilter: jest.fn(),
  addFilterFromMap: jest.fn(),
  removeFilter: jest.fn(),
  clearFilters: jest.fn(),
  setSelectedVaccination: jest.fn(),
  setSelectedTimePeriod: jest.fn(),
  setChartRequestErrors: jest.fn(),
  clearChartRequestErrors: jest.fn(),
  removeChartRequestError: jest.fn(),
}

describe('globalFilterHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  describe('useTimePeriods', () => {
    test('returns timePeriods from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          timePeriods: mockTimePeriods,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useTimePeriods())

      expect(result.current).toEqual(mockTimePeriods)
    })

    test('returns null when timePeriods is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          timePeriods: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useTimePeriods())

      expect(result.current).toBeNull()
    })
  })

  describe('useGeographyFilters', () => {
    test('returns geographyFilters from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          geographyFilters: mockGeographyFilters,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useGeographyFilters())

      expect(result.current).toEqual(mockGeographyFilters)
    })

    test('returns null when geographyFilters is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          geographyFilters: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useGeographyFilters())

      expect(result.current).toBeNull()
    })
  })

  describe('useThresholdFilters', () => {
    test('returns thresholdFilters from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          thresholdFilters: mockThresholdFilters,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useThresholdFilters())

      expect(result.current).toEqual(mockThresholdFilters)
    })

    test('returns null when thresholdFilters is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          thresholdFilters: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useThresholdFilters())

      expect(result.current).toBeNull()
    })
  })

  describe('useDataFilters', () => {
    test('returns dataFilters from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          dataFilters: mockDataFilters,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useDataFilters())

      expect(result.current).toEqual(mockDataFilters)
    })

    test('returns null when dataFilters is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          dataFilters: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useDataFilters())

      expect(result.current).toBeNull()
    })
  })

  describe('useTimeSeriesData', () => {
    test('returns timeseriesTemplateData from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          timeseriesTemplateData: mockTimeseriesTemplateData,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useTimeSeriesData())

      expect(result.current).toEqual(mockTimeseriesTemplateData)
    })

    test('returns null when timeseriesTemplateData is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          timeseriesTemplateData: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useTimeSeriesData())

      expect(result.current).toBeNull()
    })
  })

  describe('useCoverageTemplateData', () => {
    test('returns coverageTemplateData from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          coverageTemplateData: mockCoverageTemplateData,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useCoverageTemplateData())

      expect(result.current).toEqual(mockCoverageTemplateData)
    })

    test('returns null when coverageTemplateData is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          coverageTemplateData: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useCoverageTemplateData())

      expect(result.current).toBeNull()
    })
  })

  describe('useSelectedFilters', () => {
    test('returns selected filters and actions from state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          selectedFilters: mockSelectedFilters,
          selectedVaccinationFilters: mockSelectedVaccinationFilters,
          selectedGeographyFilters: mockSelectedGeographyFilters,
          selectedThresholdFilters: mockSelectedThresholdFilters,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useSelectedFilters())

      expect(result.current.selectedFilters).toEqual(mockSelectedFilters)
      expect(result.current.selectedVaccinationFilters).toEqual(mockSelectedVaccinationFilters)
      expect(result.current.selectedGeographyFilters).toEqual(mockSelectedGeographyFilters)
      expect(result.current.selectedThresholdFilters).toEqual(mockSelectedThresholdFilters)
      expect(result.current.updateFilters).toBe(mockActions.updateFilters)
      expect(result.current.addFilter).toBe(mockActions.addFilter)
      expect(result.current.addFilterFromMap).toBe(mockActions.addFilterFromMap)
      expect(result.current.removeFilter).toBe(mockActions.removeFilter)
      expect(result.current.clearFilters).toBe(mockActions.clearFilters)
    })

    test('returns null values when filters are not selected', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          selectedFilters: [],
          selectedVaccinationFilters: [],
          selectedGeographyFilters: [],
          selectedThresholdFilters: [],
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useSelectedFilters())

      expect(result.current.selectedFilters).toEqual([])
      expect(result.current.selectedVaccinationFilters).toEqual([])
      expect(result.current.selectedGeographyFilters).toEqual([])
      expect(result.current.selectedThresholdFilters).toEqual([])
    })
  })

  describe('useGeographyState', () => {
    test('returns geography state from global filters', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          geographyAreas: mockGeographyAreas,
          geographyAreasLoading: false,
          geographyAreasError: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useGeographyState())

      expect(result.current.geographyAreas).toEqual(mockGeographyAreas)
      expect(result.current.geographyAreasLoading).toBe(false)
      expect(result.current.geographyAreasError).toBeNull()
    })

    test('returns loading state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          geographyAreas: mockGeographyAreas,
          geographyAreasLoading: true,
          geographyAreasError: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useGeographyState())

      expect(result.current.geographyAreasLoading).toBe(true)
    })

    test('returns error state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          geographyAreas: mockGeographyAreas,
          geographyAreasLoading: false,
          geographyAreasError: 'Error fetching geographies',
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useGeographyState())

      expect(result.current.geographyAreasError).toBe('Error fetching geographies')
    })
  })

  describe('useVaccinationState', () => {
    test('returns vaccination state from global filters', () => {
      const mockSelectedVaccination: DataFilter = mockSelectedVaccinationFilters[0]

      mockUseGlobalFilters.mockReturnValue({
        state: {
          dataFilters: mockDataFilters,
          selectedVaccination: mockSelectedVaccination,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useVaccinationState())

      expect(result.current.vaccinationList).toEqual(mockDataFilters.data_filters)
      expect(result.current.selectedVaccination).toEqual(mockSelectedVaccination)
      expect(result.current.setSelectedVaccination).toBe(mockActions.setSelectedVaccination)
    })

    test('returns null vaccinationList when dataFilters is null', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          dataFilters: null,
          selectedVaccination: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useVaccinationState())

      expect(result.current.vaccinationList).toBeNull()
      expect(result.current.selectedVaccination).toBeNull()
    })

    test('returns null vaccinationList when dataFilters.data_filters is undefined', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          dataFilters: { label: 'Filters', data_filters: undefined, categories_to_group_by: [] } as any,
          selectedVaccination: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useVaccinationState())

      expect(result.current.vaccinationList).toBeNull()
    })
  })

  describe('useMapData', () => {
    test('returns map data state from global filters', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          mapData: mockMapData,
          mapDataLoading: false,
          mapDataError: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useMapData())

      expect(result.current.mapData).toEqual(mockMapData)
      expect(result.current.mapDataLoading).toBe(false)
      expect(result.current.mapDataError).toBeNull()
    })

    test('returns loading state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          mapData: null,
          mapDataLoading: true,
          mapDataError: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useMapData())

      expect(result.current.mapDataLoading).toBe(true)
    })

    test('returns error state', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          mapData: null,
          mapDataLoading: false,
          mapDataError: 'Error fetching map data',
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useMapData())

      expect(result.current.mapDataError).toBe('Error fetching map data')
    })
  })

  describe('useErrorData', () => {
    test('returns error data state and actions from global filters', () => {
      const mockChartRequestErrors = [
        { id: 'error-1', error: 'Error message 1' },
        { id: 'error-2', error: 'Error message 2' },
      ]

      mockUseGlobalFilters.mockReturnValue({
        state: {
          chartRequestErrors: mockChartRequestErrors,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useErrorData())

      expect(result.current.chartRequestErrors).toEqual(mockChartRequestErrors)
      expect(result.current.setChartRequestErrors).toBe(mockActions.setChartRequestErrors)
      expect(result.current.clearChartRequestErrors).toBe(mockActions.clearChartRequestErrors)
      expect(result.current.removeChartRequestError).toBe(mockActions.removeChartRequestError)
    })

    test('returns null chartRequestErrors when not set', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          chartRequestErrors: null,
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useErrorData())

      expect(result.current.chartRequestErrors).toBeNull()
    })

    test('returns empty array chartRequestErrors when no errors', () => {
      mockUseGlobalFilters.mockReturnValue({
        state: {
          chartRequestErrors: [],
        } as any,
        actions: mockActions,
      })

      const { result } = renderHook(() => useErrorData())

      expect(result.current.chartRequestErrors).toEqual([])
    })
  })
})
