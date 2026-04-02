'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { getPages } from '@/api/requests/cms/getPages'

const DEBOUNCE_MILLISECONDS = 300

interface SearchProps {
  readonly label: string
  readonly placeholder: string
}

export function Search({ label, placeholder }: SearchProps) {
  const limit = 5

  interface SearchResult {
    readonly title: string
    readonly meta: {
      readonly html_url: string | null
    }
  }

  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchValue] = useDebounceValue(searchInputValue, DEBOUNCE_MILLISECONDS)
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>([])
  const [searchOpen, setSearchOpen] = useState(false)

  const getSearchResults = async ({ query }: { query: string }) => {
    const pages = await getPages({ limit: limit.toString(), search: query })
    setSearchResults(pages?.data?.items)
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      getSearchResults({ query: debouncedSearchValue })
      setSearchOpen(true)
    } else {
      setSearchResults([])
      setSearchOpen(false)
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      // Clear search results when escape key is pressed
      if (event.key === 'Escape') {
        setSearchResults([])
        setSearchOpen(false)
      }
    })
  }, [])

  return (
    <form method="GET" aria-label={label}>
      <div className="govuk-form-group m-0">
        <label className="govuk-label" htmlFor="search" hidden={true}>
          {placeholder}
        </label>
        <input
          className="govuk-input govuk-!-font-size-16"
          id="search"
          name="search"
          type="text"
          aria-controls="ukhsa-search-results"
          aria-activedescendant=""
          placeholder={placeholder}
          value={searchInputValue}
          onChange={(event) => {
            setSearchInputValue(event.currentTarget.value)
          }}
        />
        <div className="absolute z-[1000] max-h-[200px] overflow-y-auto bg-white shadow-[0px_15px_15px_0px_rgba(0,0,0,0.35)] sm:w-5/12">
          <ul role="listbox" aria-expanded={searchOpen} aria-label="search-results" id="ukhsa-search-results">
            {searchResults?.map(({ title, meta: { html_url } }, i) => (
              <li
                key={`result-${i}`}
                value="{i}"
                className="govuk-!-padding-3 govuk-!-margin-left-2 govuk-!-margin-right-2 border-b shadow-[0_1px_0_#929191]"
                role="option"
                aria-label="search-result-${i}"
              >
                <Link href={html_url || ''}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <noscript>
          <style>{'input#search {display: none; }'}</style>
        </noscript>
      </div>
    </form>
  )
}

export default Search
