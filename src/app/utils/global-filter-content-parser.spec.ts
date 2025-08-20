// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CardTypes } from '@/api/models/cms/Page/Body'
import {
  AccompanyingPointArray,
  DataFilters,
  GeographyFilters,
  ThresholdFilters,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'

import {
  extractDataFromGlobalFilter,
  extractGeographyIdFromGeographyFilter,
  FlattenedAccompanyingPoint,
  getAccompanyingPoints,
  getGroupedVaccinationOptions,
} from './global-filter-content-parser'

describe('extractDataFromGlobalFilter', () => {
  describe('when content is not a global_filter_card', () => {
    test('should return default empty filters for non-global_filter_card type', () => {
      const content: CardTypes = {
        type: 'some_other_card',
        value: {},
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result).toEqual({
        timePeriods: [],
        geographyFilters: null,
        thresholdFilters: null,
        dataFilters: null,
      })
    })
  })

  describe('when content is a global_filter_card', () => {
    test('should extract geography filters from rows', () => {
      const mockGeographyFilters: GeographyFilters = {
        geography_types: [{ value: { geography_type: 'country' } }, { value: { geography_type: 'region' } }],
      }

      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {
                filters: [
                  {
                    type: 'geography_filters',
                    value: mockGeographyFilters,
                  },
                ],
              },
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result.geographyFilters).toEqual(mockGeographyFilters)
      expect(result.thresholdFilters).toBeNull()
      expect(result.dataFilters).toBeNull()
      expect(result.timePeriods).toEqual([])
    })

    test('should extract threshold filters from rows', () => {
      const mockThresholdFilters: ThresholdFilters = {
        min_value: 10,
        max_value: 100,
      }

      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {
                filters: [
                  {
                    type: 'threshold_filters',
                    value: mockThresholdFilters,
                  },
                ],
              },
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result.thresholdFilters).toEqual(mockThresholdFilters)
      expect(result.geographyFilters).toBeNull()
      expect(result.dataFilters).toBeNull()
      expect(result.timePeriods).toEqual([])
    })

    test('should extract data filters from rows', () => {
      const mockDataFilters: DataFilters = {
        categories: ['category1', 'category2'],
      }

      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {
                filters: [
                  {
                    type: 'data_filters',
                    value: mockDataFilters,
                  },
                ],
              },
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result.dataFilters).toEqual(mockDataFilters)
      expect(result.geographyFilters).toBeNull()
      expect(result.thresholdFilters).toBeNull()
      expect(result.timePeriods).toEqual([])
    })

    test('should extract multiple filter types from multiple rows', () => {
      const mockGeographyFilters: GeographyFilters = {
        geography_types: [{ value: { geography_type: 'country' } }],
      }
      const mockThresholdFilters: ThresholdFilters = {
        min_value: 5,
        max_value: 50,
      }
      const mockDataFilters: DataFilters = {
        categories: ['test'],
      }

      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {
                filters: [
                  { type: 'geography_filters', value: mockGeographyFilters },
                  { type: 'threshold_filters', value: mockThresholdFilters },
                ],
              },
            },
            {
              value: {
                filters: [{ type: 'data_filters', value: mockDataFilters }],
              },
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result.geographyFilters).toEqual(mockGeographyFilters)
      expect(result.thresholdFilters).toEqual(mockThresholdFilters)
      expect(result.dataFilters).toEqual(mockDataFilters)
      expect(result.timePeriods).toEqual([])
    })

    test('should extract time periods when time_range is provided', () => {
      const mockTimePeriods: TimePeriod[] = [
        { start_date: '2023-01-01', end_date: '2023-12-31' },
        { start_date: '2024-01-01', end_date: '2024-12-31' },
      ]

      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          time_range: {
            time_periods: mockTimePeriods,
          },
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result.timePeriods).toEqual(mockTimePeriods)
      expect(result.geographyFilters).toBeNull()
      expect(result.thresholdFilters).toBeNull()
      expect(result.dataFilters).toBeNull()
    })

    test('should handle rows without filters property', () => {
      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {},
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result).toEqual({
        timePeriods: [],
        geographyFilters: null,
        thresholdFilters: null,
        dataFilters: null,
      })
    })

    test('should handle unknown filter types gracefully', () => {
      const content: CardTypes = {
        type: 'global_filter_card',
        value: {
          rows: [
            {
              value: {
                filters: [{ type: 'unknown_filter_type', value: { some: 'data' } }],
              },
            },
          ],
        },
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result).toEqual({
        timePeriods: [],
        geographyFilters: null,
        thresholdFilters: null,
        dataFilters: null,
      })
    })

    test('should handle global_filter_card without rows or time_range', () => {
      const content: CardTypes = {
        type: 'global_filter_card',
        value: {},
      }

      const result = extractDataFromGlobalFilter(content)

      expect(result).toEqual({
        timePeriods: [],
        geographyFilters: null,
        thresholdFilters: null,
        dataFilters: null,
      })
    })
  })

  describe('extractGeographyIdFromGeographyFilter', () => {
    test('should return empty array when geographyFilter is null', () => {
      const result = extractGeographyIdFromGeographyFilter(null)
      expect(result).toEqual([])
    })

    test('should return empty array when geographyFilter is undefined', () => {
      const result = extractGeographyIdFromGeographyFilter(undefined)
      expect(result).toEqual([])
    })

    test('should extract geography types from valid geography filter', () => {
      const geographyFilter: GeographyFilters = {
        geography_types: [
          { value: { geography_type: 'country' } },
          { value: { geography_type: 'region' } },
          { value: { geography_type: 'city' } },
        ],
      }

      const result = extractGeographyIdFromGeographyFilter(geographyFilter)

      expect(result).toEqual(['country', 'region', 'city'])
    })

    test('should return empty array when geography_types is empty', () => {
      const geographyFilter: GeographyFilters = {
        geography_types: [],
      }

      const result = extractGeographyIdFromGeographyFilter(geographyFilter)

      expect(result).toEqual([])
    })

    test('should handle single geography type', () => {
      const geographyFilter: GeographyFilters = {
        geography_types: [{ value: { geography_type: 'country' } }],
      }

      const result = extractGeographyIdFromGeographyFilter(geographyFilter)

      expect(result).toEqual(['country'])
    })
  })

  describe('getAccompanyingPoints', () => {
    describe('when given valid accompanying points data', () => {
      test('should transform a single accompanying point with one parameter', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'change:',
              label_suffix: '%',
              parameters: [
                {
                  type: 'metric',
                  value: {
                    label: 'covid change by percent',
                    value: 'COVID-19_headline_ONSdeaths_7DayPercentChange',
                  },
                  id: 'd8730a1a-78d5-4d0c-93c9-a1aca040472a',
                },
              ],
            },
            id: '707aaf3e-9165-4b0a-b989-6537b8d6af76',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: 'change:',
            label_suffix: '%',
            parameters: {
              metric: 'COVID-19_headline_ONSdeaths_7DayPercentChange',
            },
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })

      test('should transform accompanying point with multiple parameters', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Country level of coverage: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'geography_type',
                  value: {
                    label: 'Nation level',
                    value: 'Nation',
                  },
                  id: 'geo-id-1',
                },
                {
                  type: 'metric',
                  value: {
                    label: 'Coverage metric',
                    value: 'vaccination_coverage_rate',
                  },
                  id: 'metric-id-1',
                },
              ],
            },
            id: 'main-id-1',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: 'Country level of coverage: ',
            label_suffix: '%',
            parameters: {
              geography_type: 'Nation',
              metric: 'vaccination_coverage_rate',
            },
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })

      test('should transform multiple accompanying points', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Country level of coverage: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'geography_type',
                  value: {
                    label: 'Nation',
                    value: 'Nation',
                  },
                  id: 'id-1',
                },
              ],
            },
            id: 'point-1',
          },
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Region level of coverage: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'geography_type',
                  value: {
                    label: 'Regional',
                    value: 'Region',
                  },
                  id: 'id-2',
                },
              ],
            },
            id: 'point-2',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: 'Country level of coverage: ',
            label_suffix: '%',
            parameters: {
              geography_type: 'Nation',
            },
          },
          {
            label_prefix: 'Region level of coverage: ',
            label_suffix: '%',
            parameters: {
              geography_type: 'Region',
            },
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })

      test('should handle empty label prefix and suffix', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: '',
              label_suffix: '',
              parameters: [
                {
                  type: 'metric',
                  value: {
                    label: 'Test metric',
                    value: 'test_value',
                  },
                  id: 'test-id',
                },
              ],
            },
            id: 'empty-labels-point',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: '',
            label_suffix: '',
            parameters: {
              metric: 'test_value',
            },
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })

      test('should handle complex parameter types and values', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Data for: ',
              label_suffix: ' units',
              parameters: [
                {
                  type: 'complex_metric_type',
                  value: {
                    label: 'Complex metric with underscores',
                    value: 'COVID-19_vaccine_uptake_first_dose_percentage_by_age_group',
                  },
                  id: 'complex-id',
                },
                {
                  type: 'time_period',
                  value: {
                    label: 'Last 7 days',
                    value: '2024-01-01_to_2024-01-07',
                  },
                  id: 'time-id',
                },
              ],
            },
            id: 'complex-point',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: 'Data for: ',
            label_suffix: ' units',
            parameters: {
              complex_metric_type: 'COVID-19_vaccine_uptake_first_dose_percentage_by_age_group',
              time_period: '2024-01-01_to_2024-01-07',
            },
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })
    })

    describe('when given edge cases', () => {
      test('should return empty array when given empty array', () => {
        const inputData: AccompanyingPointArray = []
        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual([])
      })

      test('should handle accompanying point with empty parameters array', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'No params: ',
              label_suffix: '%',
              parameters: [],
            },
            id: 'no-params-point',
          },
        ]

        const expected: FlattenedAccompanyingPoint[] = [
          {
            label_prefix: 'No params: ',
            label_suffix: '%',
            parameters: {},
          },
        ]

        const result = getAccompanyingPoints(inputData)
        expect(result).toEqual(expected)
      })

      test('should preserve original array order', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'First: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'order_test',
                  value: { label: 'First', value: 'first' },
                  id: 'first-id',
                },
              ],
            },
            id: 'first-point',
          },
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Second: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'order_test',
                  value: { label: 'Second', value: 'second' },
                  id: 'second-id',
                },
              ],
            },
            id: 'second-point',
          },
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Third: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'order_test',
                  value: { label: 'Third', value: 'third' },
                  id: 'third-id',
                },
              ],
            },
            id: 'third-point',
          },
        ]

        const result = getAccompanyingPoints(inputData)

        expect(result[0].label_prefix).toBe('First: ')
        expect(result[1].label_prefix).toBe('Second: ')
        expect(result[2].label_prefix).toBe('Third: ')
        expect(result[0].parameters.order_test).toBe('first')
        expect(result[1].parameters.order_test).toBe('second')
        expect(result[2].parameters.order_test).toBe('third')
      })

      test('should handle parameters with duplicate types (last one wins)', () => {
        const inputData: AccompanyingPointArray = [
          {
            type: 'accompanying_point',
            value: {
              label_prefix: 'Duplicate test: ',
              label_suffix: '%',
              parameters: [
                {
                  type: 'duplicate_type',
                  value: {
                    label: 'First occurrence',
                    value: 'first_value',
                  },
                  id: 'dup-1',
                },
                {
                  type: 'duplicate_type',
                  value: {
                    label: 'Second occurrence',
                    value: 'second_value',
                  },
                  id: 'dup-2',
                },
              ],
            },
            id: 'duplicate-point',
          },
        ]

        const result = getAccompanyingPoints(inputData)

        expect(result[0].parameters.duplicate_type).toBe('second_value')
        expect(Object.keys(result[0].parameters)).toHaveLength(1)
      })
    })
  })

  describe('getGroupedVaccinationOptions', () => {
    const createMockDataFilter = (
      id: string,
      label: string,
      stratumLabel: string,
      stratumValue: string,
      topicValue: string
    ): DataFilter => ({
      type: 'data_filter',
      id,
      value: {
        label,
        parameters: {
          stratum: {
            label: stratumLabel,
            value: stratumValue,
          },
          topic: {
            value: topicValue,
          },
        },
      },
    })

    const createMockCategories = (primary: string, secondary: string): Category[] => [
      { value: { data_category: primary } },
      { value: { data_category: secondary } },
    ]

    test('should return null when vaccinationFilters is null or undefined', () => {
      expect(getGroupedVaccinationOptions(null as null)).toBeNull()
      expect(getGroupedVaccinationOptions(undefined as null)).toBeNull()
    })

    test('should throw an error when primary group category is missing', () => {
      const mockData: DataFilters = {
        data_filters: [],
        categories_to_group_by: [{ value: { data_category: 'topic' } }],
      }

      expect(() => getGroupedVaccinationOptions(mockData)).toThrow(
        'Both primary and secondary group categories must be provided'
      )
    })

    test('should throw an error when secondary group category is missing', () => {
      const mockData: DataFilters = {
        data_filters: [],
        categories_to_group_by: [{ value: { data_category: 'stratum' } }],
      }

      expect(() => getGroupedVaccinationOptions(mockData)).toThrow(
        'Both primary and secondary group categories must be provided'
      )
    })

    test('should throw an error when categories_to_group_by is empty', () => {
      const mockData: DataFilters = {
        data_filters: [],
        categories_to_group_by: [],
      }

      expect(() => getGroupedVaccinationOptions(mockData)).toThrow(
        'Both primary and secondary group categories must be provided'
      )
    })

    test('should group vaccination options by stratum correctly', () => {
      const mockData: DataFilters = {
        data_filters: [
          createMockDataFilter('1', '6-in-1 (1 year)', '1 year', '12m', '6-in-1'),
          createMockDataFilter('2', 'PCV (1 year)', '1 year', '12m', 'pneumococcal'),
          createMockDataFilter('3', '6-in-1 (2 years)', '2 years', '24m', '6-in-1'),
          createMockDataFilter('4', 'MMR1 (2 years)', '2 years', '24m', 'MMR1'),
        ],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result).toHaveLength(2)

      const oneYearGroup = result?.find((group) => group.title === '1 year')
      const twoYearGroup = result?.find((group) => group.title === '2 years')

      expect(oneYearGroup).toBeDefined()
      expect(oneYearGroup?.children).toHaveLength(2)
      expect(oneYearGroup?.children).toEqual([
        { label: '6-in-1 (1 year)', id: 'data_filter-1' },
        { label: 'PCV (1 year)', id: 'data_filter-2' },
      ])

      expect(twoYearGroup).toBeDefined()
      expect(twoYearGroup?.children).toHaveLength(2)
      expect(twoYearGroup?.children).toEqual([
        { label: '6-in-1 (2 years)', id: 'data_filter-3' },
        { label: 'MMR1 (2 years)', id: 'data_filter-4' },
      ])
    })

    test('should handle single group with multiple children', () => {
      const mockData: DataFilters = {
        data_filters: [
          createMockDataFilter('1', 'Vaccine A', '1 year', '12m', 'vaccine-a'),
          createMockDataFilter('2', 'Vaccine B', '1 year', '12m', 'vaccine-b'),
          createMockDataFilter('3', 'Vaccine C', '1 year', '12m', 'vaccine-c'),
        ],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result).toHaveLength(1)
      expect(result?.[0].title).toBe('1 year')
      expect(result?.[0].children).toHaveLength(3)
      expect(result?.[0].children).toEqual([
        { label: 'Vaccine A', id: 'data_filter-1' },
        { label: 'Vaccine B', id: 'data_filter-2' },
        { label: 'Vaccine C', id: 'data_filter-3' },
      ])
    })

    test('should use parameter value when label is missing', () => {
      const mockData: DataFilters = {
        data_filters: [
          {
            type: 'data_filter',
            id: '1',
            value: {
              label: '6-in-1 vaccine',
              parameters: {
                stratum: {
                  value: '12m', // No label provided
                },
                topic: {
                  value: '6-in-1',
                },
              },
            },
          },
        ],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result).toHaveLength(1)
      expect(result?.[0].title).toBe('12m') // Should use value when label is missing
    })

    test('should handle Unknown group when both label and value are missing', () => {
      const mockData: DataFilters = {
        data_filters: [
          {
            type: 'data_filter',
            id: '1',
            value: {
              label: 'Test Vaccine',
              parameters: {
                stratum: {
                  value: '', // Empty value
                },
                topic: {
                  value: 'test-topic',
                },
              },
            },
          },
        ],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result).toHaveLength(1)
      expect(result?.[0].title).toBe('Unknown')
    })

    test('should return empty array when data_filters is empty', () => {
      const mockData: DataFilters = {
        data_filters: [],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result).toEqual([])
    })

    test('should generate correct IDs using type and id', () => {
      const mockData: DataFilters = {
        data_filters: [
          {
            type: 'custom_filter',
            id: 'unique-123',
            value: {
              label: 'Test Vaccine',
              parameters: {
                stratum: { label: '1 year', value: '12m' },
                topic: { value: 'test' },
              },
            },
          },
        ],
        categories_to_group_by: createMockCategories('stratum', 'topic'),
      }

      const result = getGroupedVaccinationOptions(mockData)

      expect(result?.[0].children[0].id).toBe('custom_filter-unique-123')
    })
  })
})
