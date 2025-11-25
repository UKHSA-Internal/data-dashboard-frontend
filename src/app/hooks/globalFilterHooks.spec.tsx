// globalFilterHooks.spec.ts
import { ReactNode } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GlobalFilterProvider } from '@/app/features/global-filter/context/globalFilterContext'
import { act, renderHook, waitFor } from '@/config/test-utils'

import {
  useDataFilters,
  useErrorData,
  useGeographyFilters,
  useGeographyState,
  useMapData,
  useSelectedFilters,
  useThresholdFilters,
  useTimePeriods,
  useVaccinationState,
} from './globalFilterHooks'

jest.mock('@/api/requests/geographies/getGeographies', () => ({
  getGeographies: jest.fn(),
}))

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

  const mockCoverageTemplateData = {
    title_prefix: 'Vaccination coverage statistics',
    legend_title: 'Coverage (%)',
    target_threshold: 95,
    target_threshold_label: '95% target',
    about: 'This <b>chart</b> shows vaccination coverage statistics.',
  }

  const mockCoverageTimeSeriesData = {
    title_prefix: 'Annual vaccination coverage',
    legend_title: 'Level of coverage (%)',
    about: 'This <b>chart</b> shows vaccination coverage statistics.',
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
    coverageTemplateData: mockCoverageTemplateData,
    timeseriesTemplateData: mockCoverageTimeSeriesData,
    timePeriodTitle: 'Year selection',
    chartRequestErrors: [],
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

  describe('useErrorData Hook', () => {
    test('should return correct structure with all expected properties', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      expect(result.current).toHaveProperty('chartRequestErrors')
      expect(result.current).toHaveProperty('setChartRequestErrors')
      expect(result.current).toHaveProperty('clearChartRequestErrors')
      expect(result.current).toHaveProperty('removeChartRequestError')
    })

    test('should return empty array as initial chartRequestErrors', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })

    test('should return functions that are callable', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      expect(typeof result.current.setChartRequestErrors).toBe('function')
      expect(typeof result.current.clearChartRequestErrors).toBe('function')
      expect(typeof result.current.removeChartRequestError).toBe('function')
    })
  })

  describe('setChartRequestErrors functionality', () => {
    test('should add new error through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const newError = { id: 'test-error', error: 'Test error message' }

      act(() => {
        result.current.setChartRequestErrors(newError)
      })

      expect(result.current.chartRequestErrors).toEqual([newError])
    })

    test('should replace existing error with same id through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const originalError = { id: 'duplicate-id', error: 'Original message' }
      const updatedError = { id: 'duplicate-id', error: 'Updated message' }

      act(() => {
        result.current.setChartRequestErrors(originalError)
      })

      expect(result.current.chartRequestErrors).toEqual([originalError])

      act(() => {
        result.current.setChartRequestErrors(updatedError)
      })

      expect(result.current.chartRequestErrors).toEqual([updatedError])
      expect(result.current.chartRequestErrors).toHaveLength(1)
    })

    test('should add multiple different errors through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const error1 = { id: 'error-1', error: 'First error' }
      const error2 = { id: 'error-2', error: 'Second error' }

      act(() => {
        result.current.setChartRequestErrors(error1)
      })

      act(() => {
        result.current.setChartRequestErrors(error2)
      })

      expect(result.current.chartRequestErrors).toEqual([error1, error2])
    })
  })

  describe('clearChartRequestErrors functionality', () => {
    test('should clear all errors through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const error1 = { id: 'error-1', error: 'Error 1' }
      const error2 = { id: 'error-2', error: 'Error 2' }

      // Add errors first
      act(() => {
        result.current.setChartRequestErrors(error1)
      })

      act(() => {
        result.current.setChartRequestErrors(error2)
      })

      expect(result.current.chartRequestErrors).toHaveLength(2)

      // Clear through hook
      act(() => {
        result.current.clearChartRequestErrors()
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })

    test('should handle clearing when already empty through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      expect(result.current.chartRequestErrors).toEqual([])

      act(() => {
        result.current.clearChartRequestErrors()
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })
  })

  describe('removeChartRequestError functionality', () => {
    test('should remove specific error by id through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const error1 = { id: 'keep-me', error: 'Keep this error' }
      const error2 = { id: 'remove-me', error: 'Remove this error' }
      const error3 = { id: 'keep-me-too', error: 'Keep this error too' }

      // Add multiple errors
      act(() => {
        result.current.setChartRequestErrors(error1)
      })

      act(() => {
        result.current.setChartRequestErrors(error2)
      })

      act(() => {
        result.current.setChartRequestErrors(error3)
      })

      expect(result.current.chartRequestErrors).toEqual([error1, error2, error3])

      // Remove specific error through hook
      act(() => {
        result.current.removeChartRequestError('remove-me')
      })

      expect(result.current.chartRequestErrors).toEqual([error1, error3])
    })

    test('should handle removal of non-existent error id through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const existingError = { id: 'existing', error: 'Existing error' }

      act(() => {
        result.current.setChartRequestErrors(existingError)
      })

      const originalErrors = result.current.chartRequestErrors

      // Try to remove non-existent error
      act(() => {
        result.current.removeChartRequestError('non-existent')
      })

      expect(result.current.chartRequestErrors).toEqual(originalErrors)
    })

    test('should handle removal from empty array through hook', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      expect(result.current.chartRequestErrors).toEqual([])

      act(() => {
        result.current.removeChartRequestError('any-id')
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })
  })

  describe('hook integration with context', () => {
    test('should maintain state consistency across multiple hook instances', () => {
      // Both hooks need to be rendered within the same wrapper call to share the same provider instance
      const { result } = renderHook(
        () => ({
          hook1: useErrorData(),
          hook2: useErrorData(),
        }),
        { wrapper }
      )

      const testError = { id: 'shared-error', error: 'Shared across instances' }

      // Add error through first hook instance
      act(() => {
        result.current.hook1.setChartRequestErrors(testError)
      })

      // Both instances should see the same state
      expect(result.current.hook1.chartRequestErrors).toEqual([testError])
      expect(result.current.hook2.chartRequestErrors).toEqual([testError])

      // Clear through second hook instance
      act(() => {
        result.current.hook2.clearChartRequestErrors()
      })

      // Both instances should see the cleared state
      expect(result.current.hook1.chartRequestErrors).toEqual([])
      expect(result.current.hook2.chartRequestErrors).toEqual([])
    })

    test('should throw error when used outside GlobalFilterProvider', () => {
      // Suppress console.error for this test as we expect an error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useErrorData())
      }).toThrow('useGlobalFilters must be used within a GlobalFilterProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('real-world usage scenarios', () => {
    test('should handle chart error workflow with realistic error messages', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const chartError = {
        id: 'subplot-N92000002',
        error:
          'Failed to retrieve coverage data for: Northern Ireland with selected vaccinations: 6-in-1 (1 year), PCV (1 year) for the date range: 2024-04-01 to 2025-03-31',
      }

      // Add error (simulating chart load failure)
      act(() => {
        result.current.setChartRequestErrors(chartError)
      })

      expect(result.current.chartRequestErrors).toEqual([chartError])

      // Remove error (simulating successful chart reload)
      act(() => {
        result.current.removeChartRequestError('subplot-N92000002')
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })

    test('should handle multiple geography errors and selective removal', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const errors = [
        { id: 'subplot-N92000002', error: 'Error for Northern Ireland subplot' },
        { id: 'timeseries-N92000002', error: 'Error for Northern Ireland timeseries' },
        { id: 'subplot-E92000001', error: 'Error for England subplot' },
      ]

      // Add all errors
      errors.forEach((error) => {
        act(() => {
          result.current.setChartRequestErrors(error)
        })
      })

      expect(result.current.chartRequestErrors).toEqual(errors)

      // Remove all Northern Ireland related errors (simulating geography filter removal)
      act(() => {
        result.current.removeChartRequestError('subplot-N92000002')
      })

      act(() => {
        result.current.removeChartRequestError('timeseries-N92000002')
      })

      expect(result.current.chartRequestErrors).toEqual([
        { id: 'subplot-E92000001', error: 'Error for England subplot' },
      ])
    })

    test('should handle error updates for same chart type and geography', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const initialError = {
        id: 'subplot-E92000001',
        error: 'Initial error for England coverage data',
      }

      const updatedError = {
        id: 'subplot-E92000001',
        error: 'Updated error with different vaccination filters for England coverage data',
      }

      // Add initial error
      act(() => {
        result.current.setChartRequestErrors(initialError)
      })

      expect(result.current.chartRequestErrors).toEqual([initialError])

      // Update error (simulating different filter selections causing new error)
      act(() => {
        result.current.setChartRequestErrors(updatedError)
      })

      expect(result.current.chartRequestErrors).toEqual([updatedError])
      expect(result.current.chartRequestErrors).toHaveLength(1)
    })
  })

  describe('type safety and data structure', () => {
    test('should maintain correct data structure for chartRequestErrors', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const error = { id: 'test-id', error: 'test message' }

      act(() => {
        result.current.setChartRequestErrors(error)
      })

      const errors = result.current.chartRequestErrors
      expect(Array.isArray(errors)).toBe(true)
      expect(errors).toHaveLength(1)
      expect(errors![0]).toHaveProperty('id', 'test-id')
      expect(errors![0]).toHaveProperty('error', 'test message')
    })

    test('should handle edge cases with empty strings', () => {
      const { result } = renderHook(() => useErrorData(), {
        wrapper,
      })

      const edgeCaseError = { id: '', error: '' }

      act(() => {
        result.current.setChartRequestErrors(edgeCaseError)
      })

      expect(result.current.chartRequestErrors).toEqual([edgeCaseError])

      act(() => {
        result.current.removeChartRequestError('')
      })

      expect(result.current.chartRequestErrors).toEqual([])
    })
  })

  describe('useGeographyState Hook', () => {
    test('should return geography state from context', async () => {
      const { result } = renderHook(() => useGeographyState(), { wrapper })

      expect(result.current).toHaveProperty('geographyAreas')
      expect(result.current).toHaveProperty('geographyAreasLoading')
      expect(result.current).toHaveProperty('geographyAreasError')
      expect(result.current.geographyAreas).toBeInstanceOf(Map)

      await waitFor(() => {
        expect(result.current.geographyAreasLoading).toBe(false)
      })

      expect(result.current.geographyAreasError).toBeNull()
    })
  })

  describe('useVaccinationState Hook', () => {
    test('should return vaccination state from context', () => {
      const { result } = renderHook(() => useVaccinationState(), { wrapper })

      expect(result.current).toHaveProperty('vaccinationList')
      expect(result.current).toHaveProperty('selectedVaccination')
      expect(result.current).toHaveProperty('setSelectedVaccination')
      expect(result.current.vaccinationList).toEqual(mockDataFilters.data_filters)
      expect(result.current.selectedVaccination).toBeNull()
      expect(typeof result.current.setSelectedVaccination).toBe('function')
    })

    test('should return null vaccination list when no data filters are provided', () => {
      const emptyWrapper = ({ children }: { children: ReactNode }) => (
        <GlobalFilterProvider filters={{ ...mockFilters, dataFilters: null }}>{children}</GlobalFilterProvider>
      )

      const { result } = renderHook(() => useVaccinationState(), { wrapper: emptyWrapper })

      expect(result.current.vaccinationList).toBeNull()
    })
  })

  describe('useMapData Hook', () => {
    test('should return map data state from context', () => {
      const { result } = renderHook(() => useMapData(), { wrapper })

      expect(result.current).toHaveProperty('mapData')
      expect(result.current).toHaveProperty('mapDataLoading')
      expect(result.current).toHaveProperty('mapDataError')
      expect(result.current.mapData).toBeNull()
      expect(result.current.mapDataLoading).toBe(false)
      expect(result.current.mapDataError).toBeNull()
    })
  })
})
