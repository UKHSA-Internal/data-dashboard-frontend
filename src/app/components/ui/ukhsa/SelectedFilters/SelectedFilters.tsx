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

  const [selectedFilters, { removeFilter, clearFilters }] = context

  return (
    <div className="relative flex flex-wrap">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">{`${t('globalFilter.globalFilterTitle')} (${selectedFilters.length})`}</h2>
      <button
        onClick={() => clearFilters()}
        className="govuk-body-xs govuk-!-margin-[-2px] govuk-link absolute right-0 text-blue underline"
      >
        Clear filter selection
        <span className="govuk-!-margin-left-2 inline-block">
          <CrossIcon colour="var(--colour-blue)" />
        </span>
      </button>

      {selectedFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => removeFilter(filter)}
          // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
          className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative border-[1px] border-black bg-white text-black no-underline ukhsa-focus"
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
