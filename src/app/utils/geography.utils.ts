import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

export type GeographyParent = { geography_name: string; geography_code: string; geography_type: string }
export type GeographyColour = string

export const getGeographyColourSelection = (geographyType: string, geographies: GeographiesSchemaObject[]): GeographyColour => {
  const selected = geographies.geography_types.filter(type => type.value.geography_type === geographyType)
  if (selected.length > 0) {
    return selected[0].value.colour
  }
  return "COLOUR_1_DARK_BLUE"
}

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
