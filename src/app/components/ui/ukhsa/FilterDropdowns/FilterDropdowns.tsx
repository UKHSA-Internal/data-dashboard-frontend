// 'use client'

import React from 'react'

import { MultiselectDropdown } from '@/app/components/ui/ukhsa'
// import { useTranslation } from '@/app/i18n/client'

export function FilterDropdowns() {
  // const { t } = useTranslation('common')

  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 bg-grey-2">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">Area</h2>
      <div className="-mx-2 flex flex-wrap">
        <div className="w-1/3 px-2">
          <MultiselectDropdown name="Country" />
        </div>
        <div className="w-1/3 px-2">
          <MultiselectDropdown name="Region" />
        </div>
        <div className="w-1/3 px-2">
          <MultiselectDropdown name="Local Authority" />
        </div>
      </div>
    </div>
  )
}

export default FilterDropdowns
