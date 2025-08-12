'use client'

import React from 'react'

import { useTopicBody } from '../Context/TopicBodyContext'
import { FilterBanner } from '../FilterBanner/FilterBanner'

export function FilterBanners() {
  const [state] = useTopicBody()
  const { selectedFilters } = state

  const countryFilters = selectedFilters.filter((filter) => filter.id.startsWith('Country.'))
  const regionFilters = selectedFilters.filter((filter) => filter.id.startsWith('Region.'))
  const localAuthorityFilters = selectedFilters.filter((filter) => filter.id.startsWith('Local Authority.'))

  const showFilterBanner = countryFilters.length > 3 || regionFilters.length > 3 || localAuthorityFilters.length > 3

  if (!showFilterBanner) {
    return null
  }

  return (
    <FilterBanner
      message="&nbsp;&nbsp;<b>Important information :</b> You can only select <b>four locations </b> to display at a time."
      showIcon={true}
    />
  )
}
