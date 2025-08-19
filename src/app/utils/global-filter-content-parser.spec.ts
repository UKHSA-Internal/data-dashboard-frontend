// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CardTypes } from '@/api/models/cms/Page/Body'
import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

import { extractDataFromGlobalFilter, extractGeographyIdFromGeographyFilter } from './global-filter-content-parser'

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
