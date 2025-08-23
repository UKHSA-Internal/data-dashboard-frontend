import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

export type GeographyParent = { geography_name: string; geography_code: string; geography_type: string }

export const getParentGeography = (geography: GeographiesSchemaObject): GeographyParent | null => {
  const getExpectedParentType = (currentType: string): string | null => {
    switch (currentType) {
      case 'Upper Tier Local Authority':
      case 'Lower Tier Local Authority':
        return 'Region'
      case 'Region':
        return 'Nation'
      case 'Nation':
        return 'United Kingdom'
      default:
        return null
    }
  }

  const expectedParentType = getExpectedParentType(geography.geography_type!)

  if (!expectedParentType || !geography.relationships) {
    return null
  }

  // Find the parent geography in the relationships array
  const parentGeography = geography.relationships.find(
    (relationship) =>
      relationship?.geography_type === expectedParentType && relationship?.name && relationship?.geography_code
  )

  if (!parentGeography) {
    return null
  }

  return {
    geography_name: parentGeography.name!,
    geography_code: parentGeography.geography_code!,
    geography_type: parentGeography.geography_type!,
  }
}
