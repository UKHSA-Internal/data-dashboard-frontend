'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { useTranslation } from '@/app/i18n/client'

const DEBOUNCE_MILLISECONDS = 300

interface MetricsSearchProps {
  value: string
}

export function MetricsSearch({ value }: MetricsSearchProps) {
  const router = useRouter()

  const { t } = useTranslation('metrics')

  const [searchInputValue, setSearchInputValue] = useState(value)
  const [debouncedSearchValue] = useDebounceValue(searchInputValue, DEBOUNCE_MILLISECONDS)

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('search', debouncedSearchValue)
    router.replace(url.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- router is omitted as it causes infinite redirects
  }, [debouncedSearchValue])

  return (
    <form method="GET" action={'/metrics-documentation'} aria-label="Metrics search">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="metric-name">
              {t('metricsSearch.searchTitle')}
            </label>
            <input
              className={'govuk-input govuk-!-margin-right-2 govuk-!-margin-bottom-2 w-3/5'}
              id="metric-name"
              name="search"
              type="text"
              value={searchInputValue}
              onChange={(event) => {
                setSearchInputValue(event.currentTarget.value)
              }}
            />
            <noscript>
              <button type="submit" className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-2">
                {t('metricsSearch.noScriptButtonText')}
              </button>
            </noscript>
            <Link
              href="/metrics-documentation"
              className="govuk-link govuk-link--no-visited-state inline"
              onClick={(evt) => {
                evt.preventDefault()
                setSearchInputValue('')
              }}
            >
              {t('metricsSearch.clearText')}
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MetricsSearch
