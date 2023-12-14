'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const DEBOUNCE_MILLISECONDS = 300

interface MetricsSearchProps {
  value: string
}

const MetricsSearch: FC<MetricsSearchProps> = ({ value }) => {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState(value)
  const debouncedSearch = useDebounce(searchParams, DEBOUNCE_MILLISECONDS)

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchParams(event.currentTarget.value)
  }

  useEffect(() => {
    router.push(`/metrics?search=${debouncedSearch}`)
  }, [debouncedSearch, router])

  return (
    <form method="GET" action={'/metrics'}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="metric-name">
              Metric name
            </label>
            <input
              className="govuk-input mr-2 w-4/5"
              id="metric-name"
              name="search"
              type="text"
              placeholder={value}
              onChange={handleSearchChange}
            />
            <a href="/metrics" className="govuk-link inline">
              Clear
            </a>

            <noscript>
              <button type="submit" className="govuk-button">
                Search
              </button>
            </noscript>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MetricsSearch
