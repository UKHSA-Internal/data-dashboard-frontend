'use client'
import React from 'react'

import { FlatOption, MultiselectDropdown } from '@/app/components/ui/ukhsa/MultiselectDropdown/MultiselectDropdown'
import { useGeographyState, useThresholdFilters } from '@/app/hooks/globalFilterHooks'

/* eslint-disable @typescript-eslint/no-explicit-any*/

//TODO: Headers and content to come from CMS

function DisplayGeographyDropdowns() {
  const { geographyAreas, geographyAreasError, geographyAreasLoading } = useGeographyState()

  if (geographyAreasLoading) {
    return <div>Loading...</div>
  }

  if (geographyAreasError) {
    return <div>Error: {geographyAreasError}</div>
  }

  if (!geographyAreas || geographyAreas.size === 0) {
    return <div>No geography areas available</div>
  }

  const geographyDropdowns: JSX.Element[] = []

  // Use for...of to iterate over Map entries
  for (const [key, geographyArea] of geographyAreas) {
    const data = geographyArea.map((item: any) => {
      return { id: `${key}.${item.geography_code}`, label: item.name }
    })

    geographyDropdowns.push(
      <div key={key} className={`w-1/${geographyAreas.size} z-100 px-2`}>
        <MultiselectDropdown name={key} data={data} />
      </div>
    )
  }

  return <>{geographyDropdowns}</>
}

function DisplayCoverageDropdown() {
  const thresholdFilters = useThresholdFilters()
  if (!thresholdFilters) {
    return null
  }
  const data: FlatOption[] = []
  thresholdFilters.thresholds.map((filter: any) => {
    data.push({ id: filter.id, label: filter.value.label })
  })
  return (
    <div className="w-1/2 px-2">
      <MultiselectDropdown name="Select level of coverage %" data={data} />
    </div>
  )
}

export function FilterDropdowns() {
  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 z-100 bg-grey-2">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">Area</h2>
      <div className="-mx-2 flex flex-wrap">
        <DisplayGeographyDropdowns />
      </div>

      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-2 w-full">Vaccination and Coverage</h2>
      <div className="-mx-2 flex flex-wrap">
        <div className="w-1/2 px-2">
          <MultiselectDropdown name="Select vaccination" nestedMultiselect />
        </div>
        <DisplayCoverageDropdown />
      </div>
    </div>
  )
}

export default FilterDropdowns
