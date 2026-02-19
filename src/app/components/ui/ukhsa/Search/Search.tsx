'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const DEBOUNCE_MILLISECONDS = 300

interface SearchProps {
  href: string
  searchTitle: string
  noScriptButtonText: string
  clearText: string
}

export function Search({ href, searchTitle, noScriptButtonText, clearText }: SearchProps) {
  const router = useRouter()
  const value = useSearchParams().get('value') || ''

  const [searchInputValue, setSearchInputValue] = useState(value)
  const [debouncedSearchValue] = useDebounceValue(searchInputValue, DEBOUNCE_MILLISECONDS)

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('search', debouncedSearchValue)
    router.replace(url.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- router is omitted as it causes infinite redirects
  }, [debouncedSearchValue])

  return (
    <form method="GET" action={href} aria-label="Metrics search">
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
              value={searchInputValue}
              onChange={(event) => {
                setSearchInputValue(event.currentTarget.value)
              }}
            />
            <noscript>
              <button type="submit" className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-2">
                {noScriptButtonText}
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
              {clearText}
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Search
