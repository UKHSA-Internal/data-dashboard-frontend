import { DataFilter, ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchema, GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

import { FilterOption, FilterType } from '../context/globalFilterContext'

// Helper function to extract filter type
export const getFilterType = (filterId: string): FilterType | null => {
  const filterParts = filterId.split('.')
  const filterType = filterParts[0]

  if (['geography', 'data_filter', 'threshold', 'map'].includes(filterType)) {
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
  const filterExists = filters.some(
    (existingFilter: GeographiesSchemaObject) => existingFilter.geography_code === newFilter.geography_code
  )
  if (filterExists) {
    // If filter exists, remove it (filter it out)
    return filters.filter(
      (existingFilter: GeographiesSchemaObject) => existingFilter.geography_code !== newFilter.geography_code
    )
  } else {
    // If filter doesn't exist, add it
    return [...filters, newFilter]
  }
}

export const addFilterToSelectedVaccinationFilters = (filters: DataFilter[], newFilter: DataFilter): DataFilter[] => {
  if (!filters.some((existingFilter: DataFilter) => existingFilter.id === newFilter.id)) {
    return [...filters, newFilter]
  }
  return filters
}

export const addFilterToSelectedThresholdFilters = (
  filters: ThresholdFilter[],
  newFilter: ThresholdFilter
): ThresholdFilter[] => {
  if (!filters.some((existingFilter: ThresholdFilter) => existingFilter.id === newFilter.id)) {
    return [...filters, newFilter]
  }
  return filters
}

export const updateFilterToSelectedVaccinationFilters = (
  filters: DataFilter[],
  newFilter: DataFilter
): DataFilter[] => {
  if (!filters.some((existingFilter: DataFilter) => existingFilter.id === newFilter.id)) {
    return [...filters, newFilter]
  }
  return filters.filter((filter) => filter.id !== newFilter.id)
}
