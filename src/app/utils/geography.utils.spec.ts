import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

import { flattenGeographyObject, getParentGeography } from './geography.utils'

describe('geography.utils', () => {
  describe('getParentGeography', () => {
    test('returns United Kingdom as parent for Nation geography type', () => {
      const nationGeography: GeographiesSchemaObject = {
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
        relationships: [
          {
            name: 'United Kingdom',
            geography_code: 'K02000001',
            geography_type: 'United Kingdom',
          },
        ],
      }

      const result = getParentGeography(nationGeography)

      expect(result).toEqual({
        name: 'United Kingdom',
        geography_code: 'K02000001',
        geography_type: 'United Kingdom',
      })
    })

    test('returns Nation as parent for Region geography type', () => {
      const regionGeography: GeographiesSchemaObject = {
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
        relationships: [
          {
            name: 'England',
            geography_code: 'E92000001',
            geography_type: 'Nation',
          },
        ],
      }

      const result = getParentGeography(regionGeography)

      expect(result).toEqual({
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      })
    })

    test('returns Region as parent for Upper Tier Local Authority geography type', () => {
      const upperTierGeography: GeographiesSchemaObject = {
        name: 'Greater Manchester',
        geography_code: 'E11000001',
        geography_type: 'Upper Tier Local Authority',
        relationships: [
          {
            name: 'North West',
            geography_code: 'E12000002',
            geography_type: 'Region',
          },
        ],
      }

      const result = getParentGeography(upperTierGeography)

      expect(result).toEqual({
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      })
    })

    test('returns Region as parent for Lower Tier Local Authority geography type', () => {
      const lowerTierGeography: GeographiesSchemaObject = {
        name: 'Manchester',
        geography_code: 'E08000003',
        geography_type: 'Lower Tier Local Authority',
        relationships: [
          {
            name: 'North West',
            geography_code: 'E12000002',
            geography_type: 'Region',
          },
        ],
      }

      const result = getParentGeography(lowerTierGeography)

      expect(result).toEqual({
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      })
    })

    test('finds correct parent type when multiple relationships exist with different geography types', () => {
      const geographyWithMultipleRelations: GeographiesSchemaObject = {
        name: 'Manchester',
        geography_code: 'E08000003',
        geography_type: 'Lower Tier Local Authority',
        relationships: [
          {
            name: 'Greater Manchester',
            geography_code: 'E11000001',
            geography_type: 'Upper Tier Local Authority',
          },
          {
            name: 'North West',
            geography_code: 'E12000002',
            geography_type: 'Region',
          },
          {
            name: 'England',
            geography_code: 'E92000001',
            geography_type: 'Nation',
          },
        ],
      }

      const result = getParentGeography(geographyWithMultipleRelations)

      expect(result).toEqual({
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      })
    })

    test('returns first matching parent when multiple relationships exist with same parent geography type', () => {
      const geographyWithDuplicateTypes: GeographiesSchemaObject = {
        name: 'Test Region',
        geography_code: 'T12000001',
        geography_type: 'Region',
        relationships: [
          {
            name: 'England',
            geography_code: 'E92000001',
            geography_type: 'Nation',
          },
          {
            name: 'Scotland',
            geography_code: 'S92000003',
            geography_type: 'Nation',
          },
        ],
      }

      const result = getParentGeography(geographyWithDuplicateTypes)

      expect(result).toEqual({
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      })
    })

    test('returns null when relationships property is null', () => {
      const geographyWithNullRelations: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: null,
      }

      const result = getParentGeography(geographyWithNullRelations)

      expect(result).toBeNull()
    })

    test('returns null when relationships property is undefined', () => {
      const geographyWithUndefinedRelations: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: null,
      }

      const result = getParentGeography(geographyWithUndefinedRelations)

      expect(result).toBeNull()
    })

    test('returns null when relationships array is empty', () => {
      const geographyWithEmptyRelations: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: [],
      }

      const result = getParentGeography(geographyWithEmptyRelations)

      expect(result).toBeNull()
    })

    test('returns null when geography_type is not recognized in hierarchy mapping', () => {
      const unknownGeographyType: GeographiesSchemaObject = {
        name: 'Unknown Area',
        geography_code: 'U12000001',
        geography_type: 'Unknown Type',
        relationships: [
          {
            name: 'Some Parent',
            geography_code: 'P12000001',
            geography_type: 'Some Parent Type',
          },
        ],
      }

      const result = getParentGeography(unknownGeographyType)

      expect(result).toBeNull()
    })

    test('returns null when expected parent type is not found in relationships array', () => {
      const geographyWithWrongParents: GeographiesSchemaObject = {
        name: 'Test Nation',
        geography_code: 'T92000001',
        geography_type: 'Nation',
        relationships: [
          {
            name: 'Some Region',
            geography_code: 'R12000001',
            geography_type: 'Region',
          },
        ],
      }

      const result = getParentGeography(geographyWithWrongParents)

      expect(result).toBeNull()
    })

    test('returns null for United Kingdom geography type as it has no parent in hierarchy', () => {
      const ukGeography: GeographiesSchemaObject = {
        name: 'United Kingdom',
        geography_code: 'K02000001',
        geography_type: 'United Kingdom',
        relationships: [],
      }

      const result = getParentGeography(ukGeography)

      expect(result).toBeNull()
    })

    test('returns null when parent relationship has null name property', () => {
      const geographyWithNullParentName: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: [
          {
            name: null,
            geography_code: 'K02000001',
            geography_type: 'United Kingdom',
          },
        ],
      }

      const result = getParentGeography(geographyWithNullParentName)

      expect(result).toBeNull()
    })

    test('returns null when parent relationship has null geography_code property', () => {
      const geographyWithNullParentCode: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: [
          {
            name: 'United Kingdom',
            geography_code: null,
            geography_type: 'United Kingdom',
          },
        ],
      }

      const result = getParentGeography(geographyWithNullParentCode)

      expect(result).toBeNull()
    })

    test('skips null relationship objects and finds valid parent in remaining relationships', () => {
      const geographyWithNullRelationshipObject: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: [
          {
            name: 'United Kingdom',
            geography_code: 'K02000001',
            geography_type: 'United Kingdom',
          },
          undefined,
        ],
      }

      const result = getParentGeography(geographyWithNullRelationshipObject)

      expect(result).toEqual({
        name: 'United Kingdom',
        geography_code: 'K02000001',
        geography_type: 'United Kingdom',
      })
    })

    test('skips undefined relationship objects and finds valid parent in remaining relationships', () => {
      const geographyWithUndefinedRelationshipObject: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12000001',
        geography_type: 'Nation',
        relationships: [
          undefined,
          {
            name: 'United Kingdom',
            geography_code: 'K02000001',
            geography_type: 'United Kingdom',
          },
        ],
      }

      const result = getParentGeography(geographyWithUndefinedRelationshipObject)

      expect(result).toEqual({
        name: 'United Kingdom',
        geography_code: 'K02000001',
        geography_type: 'United Kingdom',
      })
    })
  })

  describe('flattenGeographyObject', () => {
    const mockUpperTierGeography: GeographiesSchemaObject = {
      name: 'Greater Manchester',
      geography_code: 'E11000001',
      geography_type: 'Upper Tier Local Authority',
      relationships: [
        {
          name: 'North West',
          geography_code: 'E12000002',
          geography_type: 'Region',
        },
        {
          name: 'England',
          geography_code: 'E92000001',
          geography_type: 'Nation',
        },
      ],
    }

    const mockNationGeography: GeographiesSchemaObject = {
      name: 'England',
      geography_code: 'E92000001',
      geography_type: 'Nation',
      relationships: [
        {
          name: 'United Kingdom',
          geography_code: 'K02000001',
          geography_type: 'United Kingdom',
        },
      ],
    }

    const mockGeographyWithUKRelationship: GeographiesSchemaObject = {
      name: 'Birmingham',
      geography_code: 'E08000025',
      geography_type: 'Lower Tier Local Authority',
      relationships: [
        {
          name: 'West Midlands',
          geography_code: 'E12000005',
          geography_type: 'Region',
        },
        {
          name: 'England',
          geography_code: 'E92000001',
          geography_type: 'Nation',
        },
        {
          name: 'United Kingdom',
          geography_code: 'K02000001',
          geography_type: 'United Kingdom',
        },
      ],
    }

    test('should flatten main geography and relationships into separate objects', () => {
      const result = flattenGeographyObject(mockUpperTierGeography)

      expect(result).toHaveLength(3)

      // Check that main geography is included
      expect(result.some((geo) => geo.geography_code === 'E11000001')).toBe(true)

      // Check that relationships are included
      expect(result.some((geo) => geo.geography_code === 'E12000002')).toBe(true)
      expect(result.some((geo) => geo.geography_code === 'E92000001')).toBe(true)
    })

    test('should return geographies in reverse order for non-Nation geography types', () => {
      const result = flattenGeographyObject(mockUpperTierGeography)

      // Should be reversed: England, North West, Greater Manchester
      expect(result[0]).toEqual({
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      })
      expect(result[1]).toEqual({
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      })
      expect(result[2]).toEqual({
        name: 'Greater Manchester',
        geography_code: 'E11000001',
        geography_type: 'Upper Tier Local Authority',
      })
    })

    test('should return geographies in reverse order for Nation geography type', () => {
      const result = flattenGeographyObject(mockNationGeography)

      // Should be reversed: United Kingdom, England
      expect(result[0]).toEqual({
        name: 'United Kingdom',
        geography_code: 'K02000001',
        geography_type: 'United Kingdom',
      })
      expect(result[1]).toEqual({
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      })
    })

    test('should filter out United Kingdom geography for non-Nation types', () => {
      const result = flattenGeographyObject(mockGeographyWithUKRelationship)

      // Should not contain United Kingdom geography
      expect(result.some((geo) => geo.geography_type === 'United Kingdom')).toBe(false)

      // Should contain other geographies
      expect(result.some((geo) => geo.geography_code === 'E08000025')).toBe(true) // Birmingham
      expect(result.some((geo) => geo.geography_code === 'E92000001')).toBe(true) // England
    })

    test('should not filter out United Kingdom geography for Nation types', () => {
      const result = flattenGeographyObject(mockNationGeography)

      // Should contain United Kingdom geography
      expect(result.some((geo) => geo.geography_type === 'United Kingdom')).toBe(true)
    })

    test('should handle geography object with no relationships', () => {
      const geographyWithoutRelationships: GeographiesSchemaObject = {
        name: 'Standalone Geography',
        geography_code: 'X12345678',
        geography_type: 'Custom Type',
        relationships: null,
      }

      const result = flattenGeographyObject(geographyWithoutRelationships)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        name: 'Standalone Geography',
        geography_code: 'X12345678',
        geography_type: 'Custom Type',
      })
    })

    test('should handle geography object with empty relationships array', () => {
      const geographyWithEmptyRelationships: GeographiesSchemaObject = {
        name: 'Geography With Empty Relationships',
        geography_code: 'X87654321',
        geography_type: 'Test Type',
        relationships: [],
      }

      const result = flattenGeographyObject(geographyWithEmptyRelationships)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        name: 'Geography With Empty Relationships',
        geography_code: 'X87654321',
        geography_type: 'Test Type',
      })
    })

    test('should handle relationships with undefined values gracefully', () => {
      const geographyWithUndefinedValues: GeographiesSchemaObject = {
        name: 'Test Geography',
        geography_code: 'T12345678',
        geography_type: 'Test Type',
        relationships: [
          {
            name: undefined,
            geography_code: undefined,
            geography_type: undefined,
          },
          {
            name: 'Valid Relationship',
            geography_code: 'V12345678',
            geography_type: 'Valid Type',
          },
        ],
      }

      const result = flattenGeographyObject(geographyWithUndefinedValues)

      expect(result).toHaveLength(3)

      // Should handle undefined values
      expect(result.some((geo) => geo.name === undefined)).toBe(true)
      expect(result.some((geo) => geo.geography_code === undefined)).toBe(true)
      expect(result.some((geo) => geo.geography_type === undefined)).toBe(true)

      // Should still include valid relationship
      expect(result.some((geo) => geo.name === 'Valid Relationship')).toBe(true)
    })

    test('should correctly map all properties from main geography', () => {
      const result = flattenGeographyObject(mockUpperTierGeography)

      const mainGeography = result.find((geo) => geo.geography_code === 'E11000001')

      expect(mainGeography).toEqual({
        name: 'Greater Manchester',
        geography_code: 'E11000001',
        geography_type: 'Upper Tier Local Authority',
      })
    })

    test('should correctly map all properties from relationship geographies', () => {
      const result = flattenGeographyObject(mockUpperTierGeography)

      const regionGeography = result.find((geo) => geo.geography_code === 'E12000002')
      const nationGeography = result.find((geo) => geo.geography_code === 'E92000001')

      expect(regionGeography).toEqual({
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      })

      expect(nationGeography).toEqual({
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      })
    })

    test('should handle different geography types correctly', () => {
      const lowerTierGeography: GeographiesSchemaObject = {
        name: 'Manchester',
        geography_code: 'E08000003',
        geography_type: 'Upper Tier Local Authority',
        relationships: [
          {
            name: 'North West',
            geography_code: 'E11000001',
            geography_type: 'Region',
          },
        ],
      }

      const result = flattenGeographyObject(lowerTierGeography)

      // Should filter UK and reverse for non-Nation type
      expect(result[0]).toEqual({
        name: 'North West',
        geography_code: 'E11000001',
        geography_type: 'Region',
      })
      expect(result[1]).toEqual({
        name: 'Manchester',
        geography_code: 'E08000003',
        geography_type: 'Upper Tier Local Authority',
      })
    })

    test('should maintain correct structure for FlattenedGeography objects', () => {
      const result = flattenGeographyObject(mockUpperTierGeography)

      result.forEach((geography) => {
        expect(geography).toHaveProperty('name')
        expect(geography).toHaveProperty('geography_code')
        expect(geography).toHaveProperty('geography_type')
        expect(Object.keys(geography)).toHaveLength(3)
      })
    })
  })
})
