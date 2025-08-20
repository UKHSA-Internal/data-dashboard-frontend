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
} from './global-filter-content-parser'

describe('extractDataFromGlobalFilter', () => {
  describe('when content is not a global_filter_card', () => {
    it('should return default empty filters for non-global_filter_card type', () => {
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
    it('should extract geography filters from rows', () => {
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

    it('should extract threshold filters from rows', () => {
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

    it('should extract data filters from rows', () => {
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

    it('should extract multiple filter types from multiple rows', () => {
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

    it('should extract time periods when time_range is provided', () => {
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

    it('should handle rows without filters property', () => {
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

    it('should handle unknown filter types gracefully', () => {
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

    it('should handle global_filter_card without rows or time_range', () => {
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
})

describe('extractGeographyIdFromGeographyFilter', () => {
  it('should return empty array when geographyFilter is null', () => {
    const result = extractGeographyIdFromGeographyFilter(null)
    expect(result).toEqual([])
  })

  it('should return empty array when geographyFilter is undefined', () => {
    const result = extractGeographyIdFromGeographyFilter(undefined)
    expect(result).toEqual([])
  })

  it('should extract geography types from valid geography filter', () => {
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

  it('should return empty array when geography_types is empty', () => {
    const geographyFilter: GeographyFilters = {
      geography_types: [],
    }

    const result = extractGeographyIdFromGeographyFilter(geographyFilter)

    expect(result).toEqual([])
  })

  it('should handle single geography type', () => {
    const geographyFilter: GeographyFilters = {
      geography_types: [{ value: { geography_type: 'country' } }],
    }

    const result = extractGeographyIdFromGeographyFilter(geographyFilter)

    expect(result).toEqual(['country'])
  })
})

describe('getAccompanyingPoints', () => {
  describe('when given valid accompanying points data', () => {
    it('should transform a single accompanying point with one parameter', () => {
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

    it('should transform accompanying point with multiple parameters', () => {
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

    it('should transform multiple accompanying points', () => {
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

    it('should handle empty label prefix and suffix', () => {
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

    it('should handle complex parameter types and values', () => {
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
    it('should return empty array when given empty array', () => {
      const inputData: AccompanyingPointArray = []
      const result = getAccompanyingPoints(inputData)
      expect(result).toEqual([])
    })

    it('should handle accompanying point with empty parameters array', () => {
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

    it('should preserve original array order', () => {
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

    it('should handle parameters with duplicate types (last one wins)', () => {
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
