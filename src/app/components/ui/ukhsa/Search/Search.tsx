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

  // CSS used to hide the search bar for non-JS users
  interface SearchResult {
    readonly title: string
    readonly meta: {
      readonly html_url: string | null
    }
  }

  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchValue] = useDebounceValue(searchInputValue, DEBOUNCE_MILLISECONDS)
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>([])

  const getSearchResults = async ({ query }: { query: string }) => {
    const pages = await getPages({ limit: limit.toString(), search: query })
    setSearchResults(pages?.data?.items)
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      getSearchResults({ query: debouncedSearchValue })
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchValue])

  return (
    <form method="GET" aria-label={label}>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="search" hidden={true}>
          {placeholder}
        </label>
        <input
          className="govuk-input"
          id="search"
          name="search"
          type="text"
          placeholder={placeholder}
          value={searchInputValue}
          onChange={(event) => {
            setSearchInputValue(event.currentTarget.value)
          }}
        />
        <div className="absolute z-[1000] max-h-[200px] overflow-y-auto bg-white shadow-[0px_15px_15px_0px_rgba(0,0,0,0.35)] sm:w-5/12">
          <ul>
            {searchResults?.map(({ title, meta: { html_url } }, i) => (
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
          <style>{'input#search {display: none; }'}</style>
        </noscript>
      </div>
    </form>
  )
}

export default Search
