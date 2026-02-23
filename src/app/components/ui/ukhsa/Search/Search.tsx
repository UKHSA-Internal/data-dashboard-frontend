'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { getPages } from '@/api/requests/cms/getPages'

const DEBOUNCE_MILLISECONDS = 300

interface SearchProps {
  href: string
  searchTitle: string
  noScriptButtonText: string
  clearText: string
  inlineResults: boolean
}

export function Search({ href, searchTitle, noScriptButtonText, clearText, inlineResults }: SearchProps) {
  const router = useRouter()
  const value = useSearchParams().get('value') || ''
  const limit = 5

  interface searchResult {
    title: string
    html_url: string | null
  }

  const [searchInputValue, setSearchInputValue] = useState(value)
  const [debouncedSearchValue] = useDebounceValue(searchInputValue, DEBOUNCE_MILLISECONDS)
  const [searchResults, setSearchResults] = useState<searchResult[]>([])

  const getSearchResults = async ({ search }: { search: string }) => {
    const rawResults = await getPages({ limit: limit.toString(), search })
    setSearchResults(
      rawResults?.data?.items?.map(({ title, meta: { html_url } }) => {
        return { title, html_url }
      }) || []
    )
  }

  useEffect(() => {
    if (inlineResults) {
      if (debouncedSearchValue) getSearchResults({ search: debouncedSearchValue })
    } else {
      const url = new URL(window.location.href)
      url.searchParams.set('search', debouncedSearchValue)
      router.replace(url.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- router is omitted as it causes infinite redirects
  }, [debouncedSearchValue])

  return (
    <form method="GET" action={href} aria-label={searchTitle}>
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
            <div className="absolute max-h-[100px] overflow-y-auto bg-white">
              <ul className="govuk-list">
                {searchResults?.map(({ title, html_url }, i) => (
                  <li
                    key={`result-${i}`}
                    value="{i}"
                    className="govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 border-b-2 border-black"
                  >
                    <Link href={html_url || ''}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
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
