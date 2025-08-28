'use client'

import React from 'react'

import { useErrorData, useSelectedFilters } from '@/app/hooks/globalFilterHooks'

import { FilterBanner } from '../FilterBanner/FilterBanner'

export default function FilterBanners() {
  const { selectedFilters, selectedGeographyFilters } = useSelectedFilters()
  const { chartRequestErrors } = useErrorData()
  let showGeographyLimitBanner: boolean = false
  let showErrorBanner: boolean = false

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
  if (chartRequestErrors!.length > 0) {
    showErrorBanner = true
  }

  //show banner if geography length is greater than 3.
  if (selectedGeographyFilters) {
    showGeographyLimitBanner = selectedGeographyFilters.length > 3
  }

  const labels = Object.values(filterGroups).flatMap((group) => group!.map((filter) => filter.label))
  const countryList = ['Northern Ireland', 'Scotland', 'Wales']
  const unavailableCountries = countryList.filter((country) => labels.includes(country))

  // Build message
  let message = '&nbsp;&nbsp;<b>Important information:</b><ul class="list-disc">'
  if (showGeographyLimitBanner) {
    message += '<li>You can only select <b>four locations</b> to display at a time.</li>'
  }
  if (showErrorBanner) {
    chartRequestErrors!.map((error: string) => {
      message += `<li>${error}.</li>`
    })
  }
  if (unavailableCountries.length > 0) {
    message += `<li>Regional and Local authority level of coverage data is not available for <b>${unavailableCountries.join(', ')}</b>. All data displayed is at the country level.</li>`
  }
  message += '</ul>'

  // No banners? Return nothing
  if (!showGeographyLimitBanner && !showErrorBanner && unavailableCountries.length === 0) {
    return null
  }

  return <FilterBanner message={message} showIcon={true} />
}
