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
  const [activeResultIndex, setActiveResultIndex] = useState(-1)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultLinkRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const showResults = isDropdownOpen && !!searchResults?.length

  const focusResultAtIndex = (index: number) => {
    setActiveResultIndex(index)
    resultLinkRefs.current[index]?.focus()
  }

  type NavigationDirection = 'up' | 'down'

  const getWrappedIndex = ({ currentIndex, direction }: { currentIndex: number; direction: NavigationDirection }) => {
    if (!searchResults?.length) {
      return -1
    }

    const resultCount = searchResults.length

    if (direction === 'down') {
      const nextIndex = currentIndex + 1
      return nextIndex >= resultCount ? 0 : nextIndex
    }

    const previousIndex = currentIndex - 1
    return previousIndex < 0 ? resultCount - 1 : previousIndex
  }

  type NavigateSource = { from: 'input' } | { from: 'result'; index: number }

  const navigateResults = (direction: NavigationDirection, source: NavigateSource) => {
    if (!searchResults?.length) {
      return
    }

    if (source.from === 'input') {
      if (activeResultIndex === -1) {
        focusResultAtIndex(direction === 'down' ? 0 : searchResults.length - 1)
        return
      }

      focusResultAtIndex(getWrappedIndex({ currentIndex: activeResultIndex, direction }))
      return
    }

    focusResultAtIndex(getWrappedIndex({ currentIndex: source.index, direction }))
  }

  useEffect(() => {
    if (!debouncedSearchValue) {
      return
    }

    let cancelled = false

    const fetchResults = async () => {
      const pages = await searchPages({ limit: limit.toString(), search: debouncedSearchValue })
      if (cancelled) return
      setSearchResults(pages?.data?.items ?? [])
    }

    void fetchResults()

    return () => {
      cancelled = true
    }
  }, [debouncedSearchValue, limit])

  useEffect(() => {
    resultLinkRefs.current = resultLinkRefs.current.slice(0, searchResults?.length || 0)
  }, [searchResults])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setActiveResultIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <form method="GET" aria-label={label}>
      <div className="govuk-form-group relative m-0" ref={searchContainerRef}>
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
            role="combobox"
            aria-controls="ukhsa-search-results"
            aria-expanded={showResults}
            aria-haspopup="listbox"
            aria-activedescendant={
              showResults && activeResultIndex >= 0 ? `search-result-${activeResultIndex}` : undefined
            }
            aria-autocomplete="list"
            placeholder={placeholder}
            value={searchInputValue}
            onFocus={() => {
              setIsDropdownOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsDropdownOpen(false)
                setActiveResultIndex(-1)
              }

              if (!showResults || !searchResults?.length) {
                return
              }

              if (event.key === 'ArrowDown') {
                event.preventDefault()
                navigateResults('down', { from: 'input' })
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault()
                navigateResults('up', { from: 'input' })
              }
            }}
            onChange={(event) => {
              const value = event.currentTarget.value
              const hasValue = value.trim().length > 0

              setSearchInputValue(value)
              setIsDropdownOpen(hasValue)
              setActiveResultIndex(-1)
              if (!hasValue) {
                setSearchResults([])
              }
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
        <div
          hidden={!showResults}
          className="absolute z-[1000] max-h-[200px] w-full overflow-y-auto bg-white shadow-[0px_15px_15px_0px_rgba(0,0,0,0.35)]"
        >
          <ul id="ukhsa-search-results" aria-label="Search results">
            {showResults &&
              searchResults?.map(({ title, meta: { html_url } }, index) => (
                <li
                  id={`search-result-${index}`}
                  key={`${html_url ?? 'no-url'}-${title}-${index}`}
                  className="govuk-!-margin-left-2 govuk-!-margin-right-2 border-b shadow-[0_1px_0_#929191]"
                  aria-label={`Search result ${index + 1}: ${title}`}
                >
                  <Link
                    ref={(node) => {
                      resultLinkRefs.current[index] = node
                    }}
                    className="govuk-link group block focus:border-b-0 focus:outline-none"
                    href={html_url || ''}
                    onFocus={() => {
                      setActiveResultIndex(index)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        event.preventDefault()
                        setIsDropdownOpen(false)
                        setActiveResultIndex(-1)
                        searchInputRef.current?.focus()
                      }

                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        navigateResults('down', { from: 'result', index })
                      }

                      if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        navigateResults('up', { from: 'result', index })
                      }
                    }}
                  >
                    <div className="size-full border-2 border-transparent p-3 group-focus:border-black group-focus:bg-yellow">
                      {title}
                    </div>
                  </Link>
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
