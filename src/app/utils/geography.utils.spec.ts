import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

import { getParentGeography } from './geography.utils'

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
