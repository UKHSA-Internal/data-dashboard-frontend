'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface TimeseriesFilterContextValue {
  currentFilter: string
  setCurrentFilter: (filter: string) => void
}

const TimeseriesFilterContext = createContext<TimeseriesFilterContextValue | null>(null)

export function TimeseriesFilterProvider({ children }: { children: ReactNode }) {
  const [currentFilter, setCurrentFilter] = useState<string>('all')

  const contextValue: TimeseriesFilterContextValue = {
    currentFilter,
    setCurrentFilter,
  }

  return <TimeseriesFilterContext.Provider value={contextValue}>{children}</TimeseriesFilterContext.Provider>
}

export function useTimeseriesFilter(): TimeseriesFilterContextValue {
  const context = useContext(TimeseriesFilterContext)

  if (context === null) {
    throw new Error('useTimeseriesFilter must be used within a TimeseriesFilterProvider')
  }

  return context
}

export function useTimeseriesFilterValue(chartId: string): string | undefined {
  const [filter, setFilter] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Guard against SSR where window is undefined
    if (typeof window === 'undefined') {
      return
    }

    const storedFilters = window.sessionStorage.getItem('timeseriesFilters')
    if (!storedFilters) {
      setFilter(undefined)
      return
    }

    const matchedFilter = storedFilters.split(';').find((entry) => entry.startsWith(`${chartId}|`))
    setFilter(matchedFilter ?? undefined)
  }, [chartId])

  return filter
}
