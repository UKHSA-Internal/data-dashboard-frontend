'use client'
import React from 'react'

import { MultiselectDropdown } from '@/app/components/ui/ukhsa/MultiselectDropdown/MultiselectDropdown'
import { useGeographyState } from '@/app/hooks/globalFilterHooks'

//TODO: Headers and content to come from CMS

function DisplayGeographyDropdowns() {
  const { geographyAreas, geographyAreasError, geographyAreasLoading } = useGeographyState()
  console.log('geographyAreas: ', geographyAreas)
  if (geographyAreasLoading) {
    return <div>Loading...</div>
  }
  if (geographyAreasError) {
    return <div>Error: {geographyAreasError}</div>
  }
  return (
    <>
      <div className="w-1/3 px-2 z-100">
        <MultiselectDropdown name="Country" />
      </div>
      <div className="w-1/3 px-2">
        <MultiselectDropdown name="Region" />
      </div>
      <div className="w-1/3 px-2">
        <MultiselectDropdown name="Local Authority" />
      </div>
    </>
  )
}

export function FilterDropdowns() {
  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 bg-grey-2 z-100">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">Area</h2>
      <div className="-mx-2 flex flex-wrap">
        <DisplayGeographyDropdowns />
      </div>

      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-2 w-full">Vaccination and Coverage</h2>
      <div className="-mx-2 flex flex-wrap">
        <div className="w-1/2 px-2">
          <MultiselectDropdown name="Select vaccination" nestedMultiselect />
        </div>
        <div className="w-1/2 px-2">
          <MultiselectDropdown name="Select level of coverage %" nestedMultiselect />
        </div>
      </div>
    </div>
  )
}

export default FilterDropdowns
