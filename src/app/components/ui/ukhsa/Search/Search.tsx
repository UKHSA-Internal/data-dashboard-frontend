'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { searchPages } from '@/api/requests/cms/searchPages'

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const getSearchResults = async ({ search }: { search: string }) => {
    const pages = await searchPages({ limit: limit.toString(), search })
    setSearchResults(pages?.data?.items)
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      getSearchResults({ search: debouncedSearchValue })
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <form method="GET" aria-label={label}>
      <div className="govuk-form-group relative" ref={searchContainerRef}>
        <label className="govuk-label" htmlFor="search" hidden={true}>
          {placeholder}
        </label>
        <div className="relative">
          <input
            ref={searchInputRef}
            className="govuk-input govuk-!-font-size-16 govuk-!-width-full pr-[2.5rem]"
            id="search"
            name="search"
            type="text"
            placeholder={placeholder}
            value={searchInputValue}
            onFocus={() => {
              setIsDropdownOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsDropdownOpen(false)
              }
            }}
            onChange={(event) => {
              setSearchInputValue(event.currentTarget.value)
              setIsDropdownOpen(true)
            }}
          />
          {searchInputValue && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 mt-[2px] flex h-[36px] items-center justify-center px-3 text-black"
              style={{ fontSize: '1.5rem', lineHeight: 1 }}
              onClick={() => {
                setSearchInputValue('')
                setSearchResults([])
                setIsDropdownOpen(false)
                searchInputRef.current?.focus()
              }}
            >
              &times;
            </button>
          )}
        </div>
        {isDropdownOpen && searchResults && searchResults.length > 0 && (
          <div className="absolute z-[1000] max-h-[200px] w-full overflow-y-auto bg-white shadow-[0px_15px_15px_0px_rgba(0,0,0,0.35)]">
            <ul>
              {searchResults.map(({ title, meta: { html_url } }, i) => (
                <li
                  key={`result-${i}`}
                  value="{i}"
                  className="govuk-!-margin-left-2 govuk-!-margin-right-2 border-b shadow-[0_1px_0_#929191]"
                >
                  <Link className="govuk-link group block focus:border-b-0 focus:outline-none" href={html_url || ''}>
                    <div className="size-full border-2 border-transparent p-3 group-focus:border-black group-focus:bg-yellow">
                      {title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <noscript>
          <style>{'input#search {display: none; }'}</style>
        </noscript>
      </div>
    </form>
  )
}

export default Search
