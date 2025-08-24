import { GeographyFilters } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

export type FlattenedGeography = {
  name: string | undefined | null
  geography_code: string | undefined | null
  geography_type: string | undefined | null
}
export type GeographyColour = string

export const getGeographyColourSelection = (geographyType: string, geographies: GeographyFilters): GeographyColour => {
  const selected = geographies.geography_types.filter((type) => type.value.geography_type === geographyType)
  if (selected.length > 0) {
    return selected[0].value.colour
  }
  return 'COLOUR_9_DEEP_PLUM'
}

export const getParentGeography = (geography: GeographiesSchemaObject): FlattenedGeography | null => {
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
    name: parentGeography.name!,
    geography_code: parentGeography.geography_code!,
    geography_type: parentGeography.geography_type!,
  }
}

export const flattenGeographyObject = (geographyObject: GeographiesSchemaObject): FlattenedGeography[] => {
  const flattenedGeographies: FlattenedGeography[] = []

  // Add the main geography object
  const mainGeography: FlattenedGeography = {
    name: geographyObject.name,
    geography_code: geographyObject.geography_code,
    geography_type: geographyObject.geography_type,
  }

  flattenedGeographies.push(mainGeography)

  // Add each relationship as a separate object
  if (geographyObject.relationships && geographyObject.relationships.length > 0) {
    const relationshipGeographies = geographyObject.relationships.map((relationship) => ({
      name: relationship?.name,
      geography_code: relationship?.geography_code,
      geography_type: relationship?.geography_type,
    }))

    flattenedGeographies.push(...relationshipGeographies)
  }

  // If the geography is not nation then this will remove the United Kindom relation and reverse the array so that the plots are generated in the correct order.
  if (mainGeography.geography_type != 'Nation') {
    return flattenedGeographies.filter((geography) => geography.geography_type != 'United Kingdom').reverse()
  }

  return flattenedGeographies.reverse()
}
