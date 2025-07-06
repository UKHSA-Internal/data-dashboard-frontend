'use client'

import * as React from 'react'

import { useTranslation } from '@/app/i18n/client'

import { TopicBodyContext } from '../Context/TopicBodyContext'
import CrossIcon from '../Icons/CrossIcon'

export function SelectedFilters() {
  const { t } = useTranslation('common')
  const context = React.useContext(TopicBodyContext)

  if (!context) {
    throw new Error('SelectedFilters must be used within TopicBodyContextProvider')
  }

  const [selectedFilters, { removeFilter }] = context

  return (
    <div className="flex flex-wrap">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">{t('globalFilter.globalFilterTitle')}</h2>
      {selectedFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => removeFilter(filter)}
          className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative border-DEFAULT border-black bg-white text-black no-underline ukhsa-focus"
        >
          {filter}
          <span className="govuk-!-margin-left-2 inline-block">
            <CrossIcon />
          </span>
        </button>
      ))}
    </div>
  )
}
