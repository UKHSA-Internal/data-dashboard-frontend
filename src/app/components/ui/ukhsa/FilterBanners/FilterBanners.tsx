'use client'

import React from 'react'

import { useMapData, useSelectedFilters } from '@/app/hooks/globalFilterHooks'

import { FilterBanner } from '../FilterBanner/FilterBanner'

export default function FilterBanners() {
  const { selectedFilters, selectedGeographyFilters } = useSelectedFilters()
  let showGeographyLimitBanner: boolean = false
  const { mapData } = useMapData()

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
  // Conditions
  const showFilterBanner = Object.values(filterGroups).some((group) => group!.length > 3)
  const showNoDataBanner = mapData === null && Object.values(filterGroups).some((group) => group!.length > 0)
  const locationName = Object.values(filterGroups)
    .flatMap((group) => group!.map((filter) => filter.label))
    .join(', ')

  const labels = Object.values(filterGroups).flatMap((group) => group!.map((filter) => filter.label))
  const countryList = ['Northern Ireland', 'Scotland', 'Wales']
  const unavailableCountries = countryList.filter((country) => labels.includes(country))

  // Build message
  let message = '&nbsp;&nbsp;<b>Important information:</b><ul class="list-disc">'
  if (showGeographyLimitBanner) {
    message += '<li>You can only select <b>four locations</b> to display at a time.</li>'
  }
  if (showNoDataBanner) {
    message += `<li>There is no data to display for <b>${locationName}</b>.</li>`
  }
  if (unavailableCountries.length > 0) {
    message += `<li>Regional and Local authority level of coverage data is not available for <b>${unavailableCountries.join(', ')}</b>. All data displayed is at the country level.</li>`
  }
  message += '</ul>'

  // No banners? Return nothing
  if (!showGeographyLimitBanner && !showFilterBanner && !showNoDataBanner && unavailableCountries.length === 0) {
    return null
  }

  return <FilterBanner message={message} showIcon={true} />
}
