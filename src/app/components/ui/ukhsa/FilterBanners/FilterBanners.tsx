'use client'

import React from 'react'

import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'

import { FilterBanner } from '../FilterBanner/FilterBanner'

export function FilterBanners() {
  const { selectedFilters, selectedGeographyFilters } = useSelectedFilters()
  let showGeographyLimitBanner: boolean = false

  // Group filters
  const filterGroups = selectedFilters!.reduce(
    (groups, filter) => {
      const prefix = filter.id.split('.')[0]
      if (!groups[prefix]) {
        groups[prefix] = []
      }
      groups[prefix]!.push(filter)
      return groups
    },
    {} as Record<string, typeof selectedFilters>
  )

  if (selectedGeographyFilters) {
    showGeographyLimitBanner = selectedGeographyFilters.length > 3
  }
  // Check if any filter group has more than 3 items
  const showFilterBanner = Object.values(filterGroups).some((group) => group!.length > 3)

  if (showGeographyLimitBanner) {
    return (
      <FilterBanner
        message="&nbsp;&nbsp;<b>Important information :</b> You can only select <b>four locations </b> to display at a time."
        showIcon={true}
      />
    )
  }

  if (!showFilterBanner) {
    return null
  }
  return null
}
