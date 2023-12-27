'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const DEBOUNCE_MILLISECONDS = 300

interface MetricsSearchProps {
  value: string
  labels: {
    searchTitle: string
    noScriptButtonText: string
    clearText: string
  }
}

export function MetricsSearch({ value, labels: { searchTitle, noScriptButtonText, clearText } }: MetricsSearchProps) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(value)

  const debouncedSearch = useDebounce(searchValue, DEBOUNCE_MILLISECONDS)

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    if (value !== '' || debouncedSearch !== '') {
      url.searchParams.set('search', debouncedSearch)
    } else {
      url.searchParams.delete('search')
    }
    router.push(url.toString())
  }, [debouncedSearch, router])

  return (
    <form method="GET" action={'/metrics-documentation'}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="metric-name">
              {searchTitle}
            </label>
            <input
              className={'govuk-input govuk-!-margin-right-2 govuk-!-margin-bottom-2 w-3/5'}
              id="metric-name"
              name="search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <noscript>
              <button type="submit" className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-2">
                {noScriptButtonText}
              </button>
            </noscript>
            <Link
              href="/metrics-documentation"
              className="govuk-link govuk-link--no-visited-state inline"
              onClick={() => setSearchValue('')}
            >
              {clearText}
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MetricsSearch
