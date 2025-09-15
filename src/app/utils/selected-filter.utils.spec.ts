import { describe, expect, it } from '@jest/globals'

import { DataFilter, ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchema, GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

import {
  addFilterToSelectedGeographyFilters,
  addFilterToSelectedThresholdFilters,
  addFilterToSelectedVaccinationFilters,
  getFilterType,
  updateFilterToSelectedVaccinationFilters,
} from './selected-filter.utils'

const createMockGeography = (code: string, name: string = 'Test Geography'): GeographiesSchemaObject => ({
  name,
  geography_code: code,
  relationships: [
    {
      name: 'Parent Region',
      geography_code: 'PARENT1',
      geography_type: 'region',
    },
  ],
})

const createMockParameter = (name: string) => ({
  value: `${name.toLowerCase().replace(/\s+/g, '_')}_id`,
  label: `Description for ${name}`,
})

const createMockDataFilter = (id: string, label: string = 'Test Data Filter'): DataFilter => ({
  type: 'data_filter',
  id,
  value: {
    label,
    colour: '#FF0000',
    parameters: {
      theme: createMockParameter('Theme'),
      sub_theme: createMockParameter('Sub Theme'),
      topic: createMockParameter('Topic'),
      stratum: createMockParameter('Stratum'),
      metric: createMockParameter('Metric'),
      age: createMockParameter('Age'),
      sex: createMockParameter('Sex'),
    },
    accompanying_points: [
      {
        type: 'accompanying_point',
        value: {
          label_prefix: 'Prefix',
          label_suffix: 'Suffix',
          parameters: [
            {
              type: 'theme',
              value: createMockParameter('Theme Parameter'),
              id: 'theme_param_id',
            },
          ],
        },
        id: `${id}-accompanyingpoint`,
      },
    ],
  },
})

// Factory function to create mock ThresholdFilter
const createMockThresholdFilter = (id: string, label: string = 'Test Threshold'): ThresholdFilter => ({
  type: 'threshold',
  id,
  value: {
    label,
    colour: '#00FF00',
    boundary_minimum_value: 0,
    boundary_maximum_value: 100,
  },
})

describe('selected-filter.utils', () => {
  describe('getFilterType', () => {
    it('should return "geography" for geography filter IDs', () => {
      expect(getFilterType('geography.london')).toBe('geography')
      expect(getFilterType('geography.manchester.city')).toBe('geography')
    })

    it('should return "data_filter" for data filter IDs', () => {
      expect(getFilterType('data_filter.vaccination')).toBe('data_filter')
      expect(getFilterType('data_filter.age_group.18_25')).toBe('data_filter')
    })

    it('should return "threshold" for threshold filter IDs', () => {
      expect(getFilterType('threshold.minimum')).toBe('threshold')
      expect(getFilterType('threshold.maximum.value')).toBe('threshold')
    })

    it('should return null for invalid filter types', () => {
      expect(getFilterType('invalid.filter')).toBeNull()
      expect(getFilterType('random.type')).toBeNull()
    })

    it('should handle edge cases', () => {
      expect(getFilterType('geography')).toBe('geography')
      expect(getFilterType('data_filter')).toBe('data_filter')
      expect(getFilterType('threshold')).toBe('threshold')
      expect(getFilterType('')).toBeNull()
    })
  })

  describe('addFilterToSelectedGeographyFilters', () => {
    it('should add a new geography when it does not exist in the array', () => {
      // Arrange
      const existingGeographies: GeographiesSchema = [
        createMockGeography('LON', 'London'),
        createMockGeography('MAN', 'Manchester'),
      ]
      const newGeography = createMockGeography('BIR', 'Birmingham')

      // Act
      const result = addFilterToSelectedGeographyFilters(existingGeographies, newGeography)

      // Assert
      expect(result).toHaveLength(3)
      expect(result).toContainEqual(newGeography)
      expect(result[2]).toEqual(newGeography)
      // Verify we created a new array and didn't modify the original
      expect(result).not.toBe(existingGeographies)
    })

    it('should not add a geography that already exists based on geography_code', () => {
      // Arrange
      const existingGeographies: GeographiesSchema = [
        createMockGeography('LON', 'London'),
        createMockGeography('MAN', 'Manchester'),
      ]
      const duplicateGeography = createMockGeography('LON', 'London Modified') // Same code, different name

      // Act
      const result = addFilterToSelectedGeographyFilters(existingGeographies, duplicateGeography)

      // Assert
      expect(result).toHaveLength(2)
      expect(result).toEqual(existingGeographies)
      // Verify we returned the original array reference
      expect(result).toBe(existingGeographies)
    })

    it('should handle adding to an empty array', () => {
      // Arrange
      const emptyGeographies: GeographiesSchema = []
      const newGeography = createMockGeography('LON', 'London')

      // Act
      const result = addFilterToSelectedGeographyFilters(emptyGeographies, newGeography)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(newGeography)
    })

    it('should handle comparison between undefined geography codes', () => {
      // Arrange
      const existingGeographies: GeographiesSchema = [
        createMockGeography('LON', 'London'), // Geography without a code
      ]
      const similarGeography = { name: 'Unknown Area Modified', relationships: null } // No code again

      // Act
      const result = addFilterToSelectedGeographyFilters(existingGeographies, similarGeography)

      // Assert
      expect(result).toHaveLength(2) // Should add it since we can't determine if it's a duplicate
      expect(result[1]).toEqual(similarGeography)
    })
  })
  describe('Vaccination Filter Utilities', () => {
    describe('addFilterToSelectedVaccinationFilters', () => {
      it('should add a new data filter when it does not exist in the array', () => {
        // Arrange
        const existingFilters: DataFilter[] = [
          createMockDataFilter('filter1', 'Filter 1'),
          createMockDataFilter('filter2', 'Filter 2'),
        ]
        const newFilter = createMockDataFilter('filter3', 'Filter 3')

        // Act
        const result = addFilterToSelectedVaccinationFilters(existingFilters, newFilter)

        // Assert
        expect(result).toHaveLength(3)
        expect(result).toContainEqual(newFilter)
        expect(result[2]).toEqual(newFilter)
        // Verify we created a new array and didn't modify the original
        expect(result).not.toBe(existingFilters)
      })

      it('should not add a data filter that already exists based on id', () => {
        // Arrange
        const existingFilters: DataFilter[] = [
          createMockDataFilter('filter1', 'Filter 1'),
          createMockDataFilter('filter2', 'Filter 2'),
        ]
        const duplicateFilter = createMockDataFilter('filter1', 'Modified Filter 1') // Same id, different label

        // Act
        const result = addFilterToSelectedVaccinationFilters(existingFilters, duplicateFilter)

        // Assert
        expect(result).toHaveLength(2)
        expect(result).toEqual(existingFilters)
        // Verify we returned the original array reference
        expect(result).toBe(existingFilters)
      })

      it('should handle adding to an empty array', () => {
        // Arrange
        const emptyFilters: DataFilter[] = []
        const newFilter = createMockDataFilter('filter1', 'Filter 1')

        // Act
        const result = addFilterToSelectedVaccinationFilters(emptyFilters, newFilter)

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(newFilter)
      })
    })

    describe('addFilterToSelectedThresholdFilters', () => {
      it('should add a new threshold filter when it does not exist in the array', () => {
        // Arrange
        const existingFilters: ThresholdFilter[] = [
          createMockThresholdFilter('threshold1', 'Threshold 1'),
          createMockThresholdFilter('threshold2', 'Threshold 2'),
        ]
        const newFilter = createMockThresholdFilter('threshold3', 'Threshold 3')

        // Act
        const result = addFilterToSelectedThresholdFilters(existingFilters, newFilter)

        // Assert
        expect(result).toHaveLength(3)
        expect(result).toContainEqual(newFilter)
        expect(result[2]).toEqual(newFilter)
        // Verify we created a new array and didn't modify the original
        expect(result).not.toBe(existingFilters)
      })

      it('should not add a threshold filter that already exists based on id', () => {
        // Arrange
        const existingFilters: ThresholdFilter[] = [
          createMockThresholdFilter('threshold1', 'Threshold 1'),
          createMockThresholdFilter('threshold2', 'Threshold 2'),
        ]
        const duplicateFilter = createMockThresholdFilter('threshold1', 'Modified Threshold 1') // Same id, different label

        // Act
        const result = addFilterToSelectedThresholdFilters(existingFilters, duplicateFilter)

        // Assert
        expect(result).toHaveLength(2)
        expect(result).toEqual(existingFilters)
        // Verify we returned the original array reference
        expect(result).toBe(existingFilters)
      })

      it('should handle adding to an empty array', () => {
        // Arrange
        const emptyFilters: ThresholdFilter[] = []
        const newFilter = createMockThresholdFilter('threshold1', 'Threshold 1')

        // Act
        const result = addFilterToSelectedThresholdFilters(emptyFilters, newFilter)

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(newFilter)
      })

      it('should handle filters with different boundary values but same id', () => {
        // Arrange
        const existingFilters: ThresholdFilter[] = [createMockThresholdFilter('threshold1')]

        // Create a filter with the same ID but different boundary values
        const duplicateWithDifferentValues: ThresholdFilter = {
          type: 'threshold',
          id: 'threshold1',
          value: {
            label: 'Different Threshold',
            colour: '#0000FF',
            boundary_minimum_value: 50,
            boundary_maximum_value: 150,
          },
        }

        // Act
        const result = addFilterToSelectedThresholdFilters(existingFilters, duplicateWithDifferentValues)

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(existingFilters[0]) // Should keep the original
        expect(result).toBe(existingFilters) // Should return the original array
      })
    })
  })
  describe('updateFilterToSelectedVaccinationFilters', () => {
    it('should add a new filter when it does not exist in the array', () => {
      // Arrange
      const existingFilters: DataFilter[] = [
        createMockDataFilter('filter1', 'Filter 1'),
        createMockDataFilter('filter2', 'Filter 2'),
      ]
      const newFilter = createMockDataFilter('filter3', 'Filter 3')

      // Act
      const result = updateFilterToSelectedVaccinationFilters(existingFilters, newFilter)

      // Assert
      expect(result).toHaveLength(3)
      expect(result).toContainEqual(newFilter)
      expect(result[2]).toEqual(newFilter)
      // Verify we created a new array
      expect(result).not.toBe(existingFilters)
    })

    it('should remove an existing filter (toggle behavior)', () => {
      // Arrange
      const existingFilters: DataFilter[] = [
        createMockDataFilter('filter1', 'Filter 1'),
        createMockDataFilter('filter2', 'Filter 2'),
        createMockDataFilter('filter3', 'Filter 3'),
      ]
      const filterToToggle = createMockDataFilter('filter2', 'Different Label') // Same id as an existing filter

      // Act
      const result = updateFilterToSelectedVaccinationFilters(existingFilters, filterToToggle)

      // Assert
      expect(result).toHaveLength(2)
      expect(result.find((filter) => filter.id === 'filter2')).toBeUndefined() // Filter with id 'filter2' should be gone
      expect(result.map((filter) => filter.id)).toEqual(['filter1', 'filter3']) // Only these two filters should remain
      // Verify we created a new array
      expect(result).not.toBe(existingFilters)
    })

    it('should handle empty array by adding the filter', () => {
      // Arrange
      const emptyFilters: DataFilter[] = []
      const newFilter = createMockDataFilter('filter1', 'Filter 1')

      // Act
      const result = updateFilterToSelectedVaccinationFilters(emptyFilters, newFilter)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(newFilter)
    })

    it('should return empty array when toggling the only filter in array', () => {
      // Arrange
      const singleFilter: DataFilter[] = [createMockDataFilter('filter1', 'Filter 1')]
      const filterToToggle = createMockDataFilter('filter1', 'Filter 1 Modified') // Same id

      // Act
      const result = updateFilterToSelectedVaccinationFilters(singleFilter, filterToToggle)

      // Assert
      expect(result).toHaveLength(0)
      expect(result).toEqual([])
      // Verify we created a new array
      expect(result).not.toBe(singleFilter)
    })

    it('should remove a filter even if other properties are different', () => {
      // Arrange
      const existingFilters: DataFilter[] = [createMockDataFilter('filter1', 'Filter 1')]

      // Create a significantly modified version of the same filter (only ID matches)
      const modifiedFilter: DataFilter = {
        type: 'data_filter',
        id: 'filter1', // Same ID is what matters
        value: {
          label: 'Completely Different Label',
          colour: '#00FF00', // Different color
          parameters: {
            theme: createMockParameter('Different Theme'),
            sub_theme: createMockParameter('Different Sub Theme'),
            topic: createMockParameter('Different Topic'),
            stratum: createMockParameter('Different Stratum'),
            metric: createMockParameter('Different Metric'),
            age: createMockParameter('Different Age'),
            sex: createMockParameter('Different Sex'),
          },
          accompanying_points: [], // Empty accompanying points
        },
      }

      // Act
      const result = updateFilterToSelectedVaccinationFilters(existingFilters, modifiedFilter)

      // Assert
      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })

    it('should handle multiple identical IDs correctly', () => {
      // This is an edge case test - if somehow the array has duplicate IDs
      // Arrange
      const duplicateIdFilters: DataFilter[] = [
        createMockDataFilter('filter1', 'Filter 1 - First'),
        createMockDataFilter('filter2', 'Filter 2'),
        createMockDataFilter('filter1', 'Filter 1 - Second'), // Duplicate ID
      ]
      const filterToToggle = createMockDataFilter('filter1', 'Any Label')

      // Act
      const result = updateFilterToSelectedVaccinationFilters(duplicateIdFilters, filterToToggle)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('filter2') // Only filter2 should remain
      expect(result.filter((filter) => filter.id === 'filter1')).toHaveLength(0) // All filter1 should be gone
    })
  })
})
