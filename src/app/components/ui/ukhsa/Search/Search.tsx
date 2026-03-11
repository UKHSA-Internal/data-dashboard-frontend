'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { getPages } from '@/api/requests/cms/getPages'

const DEBOUNCE_MILLISECONDS = 300

interface SearchProps {
  clearText: string
  href: string
  inlineResults: boolean
  noScriptButtonText: string
  searchLabel: string
  searchTitle: string
}

export function Search({ clearText, href, inlineResults, noScriptButtonText, searchLabel, searchTitle }: SearchProps) {
  const router = useRouter()
  const value = useSearchParams().get('value') || ''
  const limit = 5

  // CSS used to hide the search bar for non-JS users
  const hideSearch = `input#metric-name { display: none; }`

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
    <form method="GET" action={href} aria-label={searchLabel}>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="metric-name" hidden>
          {searchTitle}
        </label>
        <input
          className="govuk-input"
          id="metric-name"
          name="search"
          type="text"
          placeholder={searchTitle}
          value={searchInputValue}
          onChange={(event) => {
            setSearchInputValue(event.currentTarget.value)
          }}
        />
        <div className="absolute z-[1000] max-h-[200px] overflow-y-auto bg-white shadow-[0px_15px_15px_0px_rgba(0,0,0,0.35)] sm:w-5/12">
          <ul>
            {searchResults?.map(({ title, html_url }, i) => (
              <li
                key={`result-${i}`}
                value="{i}"
                className="govuk-!-padding-3 govuk-!-margin-left-2 govuk-!-margin-right-2 border-b shadow-[0_1px_0_#929191]"
              >
                <Link href={html_url || ''}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <noscript>
          <style>{hideSearch}</style>
          <button
            type="submit"
            className="govuk-button govuk-!-margin-bottom-2 govuk-!-margin-right-2 govuk-link govuk-link--inverse"
          >
            {noScriptButtonText}
          </button>
        </noscript>
        <div className="govuk-grid-one-quarter govuk-!-padding-top-2">
          <Link
            href="/metrics-documentation"
            className="govuk-link govuk-link--inverse"
            onClick={(evt) => {
              evt.preventDefault()
              setSearchInputValue('')
            }}
            hidden
          >
            {clearText}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Search
