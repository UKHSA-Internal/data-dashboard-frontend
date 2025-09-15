'use client'

import * as React from 'react'

import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { useTranslation } from '@/app/i18n/client'

import CrossIcon from '../Icons/CrossIcon'

export default function SelectedFilters() {
  const { t } = useTranslation('common')

  const { selectedFilters, removeFilter, clearFilters } = useSelectedFilters()

  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 relative flex flex-wrap bg-grey-4">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-0 w-full">{`${t('globalFilter.globalFilterTitle')} (${selectedFilters!.length})`}</h2>
      <button
        onClick={() => clearFilters()}
        className="govuk-body-xs govuk-!-margin-[-2px] govuk-link absolute right-3 text-blue underline"
      >
        {t('globalFilter.clearFilterSelection')}
        <span className="govuk-!-margin-left-2 inline-block">
          <CrossIcon colour="var(--colour-blue)" />
        </span>
      </button>

      <div>
        {selectedFilters!.map((filter) => (
          <button
            key={filter.id}
            onClick={() => removeFilter(filter.id)}
            // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
            className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-top-2 relative border-[1px] border-black bg-white text-black no-underline ukhsa-focus"
          >
            {filter.label}
            <span className="govuk-!-margin-left-2 inline-block">
              <CrossIcon />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
