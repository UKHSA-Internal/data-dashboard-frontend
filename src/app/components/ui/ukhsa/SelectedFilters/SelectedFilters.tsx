'use client'

import clsx from 'clsx'
import * as React from 'react'

import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { useTranslation } from '@/app/i18n/client'

import CrossIcon from '../Icons/CrossIcon'

// Combined component for clear button and filter list
const FilterContent = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslation('common')
  const { selectedFilters, removeFilter, clearFilters } = useSelectedFilters()

  return (
    <>
      <button
        onClick={() => clearFilters()}
        className={clsx(
          `govuk-body-xs govuk-link govuk-!-margin-bottom-0`,
          isMobile ? 'absolute right-3 top-[12px]' : '',
          'text-blue underline'
        )}
      >
        {t('globalFilter.clearFilterSelection')}
        <span className="govuk-!-margin-left-2 inline-block">
          <CrossIcon colour="var(--colour-blue)" />
        </span>
      </button>
      <div data-testid="selected-filters-list">
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
    </>
  )
}

export default function SelectedFilters() {
  const { t } = useTranslation('common')
  const { selectedFilters } = useSelectedFilters()

  return (
    <div className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 relative flex flex-wrap bg-grey-4">
      <details className="govuk-details govuk-!-margin-bottom-0 w-full md:hidden">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">Show selected filters ({selectedFilters!.length})</span>
        </summary>
        <div className="govuk-details__text py-2">
          <FilterContent isMobile={false} />
        </div>
      </details>

      <div className="hidden md:block">
        <h2 className="govuk-heading-s govuk-!-margin-bottom-0 hidden w-full md:block">
          {`${t('globalFilter.globalFilterTitle')} (${selectedFilters!.length})`}
        </h2>
        <FilterContent isMobile={true} />
      </div>
    </div>
  )
}
