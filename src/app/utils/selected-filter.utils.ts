import { GeographiesSchema, GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { FilterOption, FilterType } from '../context/globalFilterContext'

// Helper function to extract filter type
export const getFilterType = (filterId: string): FilterType | null => {
  const filterParts = filterId.split('.')
  const filterType = filterParts[0]

  if (['geography', 'data_filter', 'threshold'].includes(filterType)) {
    return filterType as FilterType
  }

  return null
}

// Helper function to safely add filter to array if it doesn't exist
export const addFilterToArray = (filters: FilterOption[], newFilter: FilterOption): FilterOption[] => {
  if (!filters.some((existingFilter) => existingFilter.id === newFilter.id)) {
    return [...filters, newFilter]
  }
  return filters
}

export const addFilterToSelectedGeographyFilters = (
  filters: GeographiesSchema,
  newFilter: GeographiesSchemaObject
): GeographiesSchema => {
  if (
    !filters.some(
      (existingFilter: GeographiesSchemaObject) => existingFilter.geography_code === newFilter.geography_code
    )
  ) {
    return [...filters, newFilter]
  }
  return filters
}
