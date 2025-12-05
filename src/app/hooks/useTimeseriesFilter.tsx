'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

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

