// globalFilterHooks.spec.ts
import { ReactNode } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GlobalFilterProvider } from '@/app/context/globalFilterContext'
import { renderHook } from '@/config/test-utils'

import {
  useDataFilters,
  useGeographyFilters,
  useSelectedFilters,
  useThresholdFilters,
  useTimePeriods,
} from './globalFilterHooks'

// Mock the API call
jest.mock('@/api/requests/geographies/getGeographies', () => ({
  getGeographies: jest.fn(),
}))

// Mock the utility function
jest.mock('@/app/utils/global-filter-content-parser', () => ({
  extractGeographyIdFromGeographyFilter: jest.fn(() => []),
}))

describe('globalFilterHooks', () => {
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

  const mockThresholdFilters: ThresholdFilters = {
    label: '',
    thresholds: [
      {
        id: '1',
        value: { label: 'Low', boundary_minimum_value: 0, boundary_maximum_value: 10, colour: 'red' },
        type: 'threshold',
      },
      {
        id: '2',
        value: { label: 'High', boundary_minimum_value: 11, boundary_maximum_value: 100, colour: 'blue' },
        type: 'threshold',
      },
    ],
  }

  const mockDataFilters: DataFilters = {
    label: 'Select vaccination',
    data_filters: [
      {
        type: 'data_filter',
        value: {
          label: 'MMR1 (2 years)',
          colour: 'COLOUR_1_DARK_BLUE',
          parameters: {
            theme: {
              label: '',
              value: 'immunisations',
            },
            sub_theme: {
              label: '',
              value: 'childhood-vaccines',
            },
            topic: {
              label: '',
              value: 'MMR1',
            },
            stratum: {
              label: '2 years',
              value: '24m',
            },
            metric: {
              label: '',
              value: 'MMR1_coverage_coverageByYear',
            },
            age: {
              label: '',
              value: 'all',
            },
            sex: {
              label: '',
              value: 'all',
            },
          },
          accompanying_points: [
            {
              type: 'accompanying_point',
              value: {
                label_prefix: 'Country level of coverage',
                label_suffix: '%',
                parameters: [
                  {
                    type: 'geography_type',
                    value: {
                      label: '',
                      value: 'Nation',
                    },
                    id: '8ed98517-38ba-4b7b-91d8-05f4864be648',
                  },
                  {
                    type: 'geography',
                    value: {
                      label: '',
                      value: 'England',
                    },
                    id: 'deb5c0e4-2512-409d-9342-a3f2169041a4',
                  },
                ],
              },
              id: 'ab8e4f2f-d62b-411c-adff-8a9bb0aa8ac7',
            },
          ],
        },
        id: '119e270f-2759-44a0-969a-1651407a109a',
      },
      {
        type: 'data_filter',
        value: {
          label: 'MMR1 (5 years)',
          colour: 'COLOUR_2_TURQUOISE',
          parameters: {
            theme: {
              label: '',
              value: 'immunisations',
            },
            sub_theme: {
              label: '',
              value: 'childhood-vaccines',
            },
            topic: {
              label: '',
              value: 'MMR1',
            },
            stratum: {
              label: '5 years',
              value: '5y',
            },
            metric: {
              label: '',
              value: 'MMR1_coverage_coverageByYear',
            },
            age: {
              label: '',
              value: 'all',
            },
            sex: {
              label: '',
              value: 'all',
            },
          },
          accompanying_points: [
            {
              type: 'accompanying_point',
              value: {
                label_prefix: 'Country level of coverage',
                label_suffix: '%',
                parameters: [
                  {
                    type: 'geography_type',
                    value: {
                      label: '',
                      value: 'Nation',
                    },
                    id: '3ddf0ee5-6ce7-4fc8-82c8-b3d489d5d167',
                  },
                  {
                    type: 'geography',
                    value: {
                      label: '',
                      value: 'England',
                    },
                    id: '50456b18-438d-4571-86bb-3bff9387f568',
                  },
                ],
              },
              id: '2bc2d44e-7425-4ce8-a703-e6269936ec39',
            },
          ],
        },
        id: '01627419-571a-4ea7-ba9a-c77cf354d582',
      },
    ],
    categories_to_group_by: [
      {
        type: 'category',
        value: {
          data_category: 'stratum',
        },
        id: '85acdaf0-540c-49e2-9210-7e6370c574eb',
      },
      {
        type: 'category',
        value: {
          data_category: 'topic',
        },
        id: '76fcdb38-db17-4580-8bf0-48bca2881b4a',
      },
    ],
  }

  const mockFilters = {
    timePeriods: mockTimePeriods,
    geographyFilters: mockGeographyFilters,
    thresholdFilters: mockThresholdFilters,
    dataFilters: mockDataFilters,
  }

  const wrapper = ({ children }: { children: ReactNode }) => (
    <GlobalFilterProvider filters={mockFilters}>{children}</GlobalFilterProvider>
  )

  describe('useTimePeriods', () => {
    test('should return time periods from context', () => {
      const { result } = renderHook(() => useTimePeriods(), { wrapper })

      expect(result.current).toEqual(mockTimePeriods)
    })

    test('should return null when no time periods are provided', () => {
      const emptyWrapper = ({ children }: { children: ReactNode }) => (
        <GlobalFilterProvider filters={{ ...mockFilters, timePeriods: null }}>{children}</GlobalFilterProvider>
      )

      const { result } = renderHook(() => useTimePeriods(), { wrapper: emptyWrapper })

      expect(result.current).toBeNull()
    })
  })

  describe('useGeographyFilters', () => {
    test('should return geography filters from context', () => {
      const { result } = renderHook(() => useGeographyFilters(), { wrapper })

      expect(result.current).toEqual(mockGeographyFilters)
    })

    test('should return null when no geography filters are provided', () => {
      const emptyWrapper = ({ children }: { children: ReactNode }) => (
        <GlobalFilterProvider filters={{ ...mockFilters, geographyFilters: null }}>{children}</GlobalFilterProvider>
      )

      const { result } = renderHook(() => useGeographyFilters(), { wrapper: emptyWrapper })

      expect(result.current).toBeNull()
    })
  })

  describe('useThresholdFilters', () => {
    test('should return threshold filters from context', () => {
      const { result } = renderHook(() => useThresholdFilters(), { wrapper })

      expect(result.current).toEqual(mockThresholdFilters)
    })

    test('should return null when no threshold filters are provided', () => {
      const emptyWrapper = ({ children }: { children: ReactNode }) => (
        <GlobalFilterProvider filters={{ ...mockFilters, thresholdFilters: null }}>{children}</GlobalFilterProvider>
      )

      const { result } = renderHook(() => useThresholdFilters(), { wrapper: emptyWrapper })

      expect(result.current).toBeNull()
    })
  })

  describe('useDataFilters', () => {
    test('should return data filters from context', () => {
      const { result } = renderHook(() => useDataFilters(), { wrapper })

      expect(result.current).toEqual(mockDataFilters)
    })

    test('should return null when no data filters are provided', () => {
      const emptyWrapper = ({ children }: { children: ReactNode }) => (
        <GlobalFilterProvider filters={{ ...mockFilters, dataFilters: null }}>{children}</GlobalFilterProvider>
      )

      const { result } = renderHook(() => useDataFilters(), { wrapper: emptyWrapper })

      expect(result.current).toBeNull()
    })
  })

  describe('useSelectedFilters', () => {
    test('should return selected filters and actions from context', () => {
      const { result } = renderHook(() => useSelectedFilters(), { wrapper })

      expect(result.current.selectedFilters).toEqual([])
      expect(typeof result.current.updateFilters).toBe('function')
      expect(typeof result.current.addFilter).toBe('function')
      expect(typeof result.current.removeFilter).toBe('function')
      expect(typeof result.current.clearFilters).toBe('function')
    })
  })

  describe('error handling', () => {
    test('should throw error when hooks are used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useTimePeriods())
      }).toThrow('useGlobalFilters must be used within a GlobalFilterProvider')

      expect(() => {
        renderHook(() => useSelectedFilters())
      }).toThrow('useGlobalFilters must be used within a GlobalFilterProvider')

      consoleSpy.mockRestore()
    })
  })
})
