'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const DEBOUNCE_MILLISECONDS = 300

interface MetricsSearchProps {
  value: string
}

export function MetricsSearch({ value }: MetricsSearchProps) {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState(value)

  const debouncedSearch = useDebounce(searchParams, DEBOUNCE_MILLISECONDS)

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchParams(event.currentTarget.value)
  }

  useEffect(() => {
    if (value !== '' || debouncedSearch !== '') {
      router.push(`/metrics-documentation?search=${debouncedSearch}`)
    }
  }, [value, debouncedSearch, router])

  return (
    <form method="GET" action={'/metrics'}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="metric-name">
              Metric name
            </label>
            <input
              className={'govuk-input govuk-!-margin-right-2 govuk-!-margin-bottom-2 w-3/5'}
              id="metric-name"
              name="search"
              type="text"
              placeholder={value}
              onChange={handleSearchChange}
            />
            <noscript>
              <button type="submit" className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-2">
                Search
              </button>
            </noscript>
            <Link href="/metrics-documentation" className="govuk-link govuk-link--no-visited-state inline">
              Clear
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MetricsSearch
