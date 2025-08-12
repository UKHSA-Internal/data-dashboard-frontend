'use client'

import * as React from 'react'

import { useTranslation } from '@/app/i18n/client'

import { useTopicBody } from '../Context/TopicBodyContext'
import CrossIcon from '../Icons/CrossIcon'

export function SelectedFilters() {
  const { t } = useTranslation('common')
  const [state, actions] = useTopicBody()

  const { removeFilter, clearFilters } = actions

  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 relative flex flex-wrap bg-grey-4">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">{`${t('globalFilter.globalFilterTitle')} (${state.selectedFilters.length})`}</h2>
      <button
        onClick={() => clearFilters()}
        className="govuk-body-xs govuk-!-margin-[-2px] govuk-link absolute right-0 text-blue underline"
      >
        Clear filter selection
        <span className="govuk-!-margin-left-2 inline-block">
          <CrossIcon colour="var(--colour-blue)" />
        </span>
      </button>

      <div>
        {state.selectedFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => removeFilter(filter.id)}
            // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
            className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative border-[1px] border-black bg-white text-black no-underline ukhsa-focus"
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
