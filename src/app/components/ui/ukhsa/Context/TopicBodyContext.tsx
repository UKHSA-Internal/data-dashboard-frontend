'use client'

import * as React from 'react'
import { useState } from 'react'

export function useTopicBodyFilters(initialFilters: string[] = ['Leicester', 'London', '6-in-1']) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters)

  const updateFilters = (newFilters: string[]) => {
    setSelectedFilters(newFilters)
  }

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filterName: string) => {
    setSelectedFilters(selectedFilters.filter((filter) => filter !== filterName))
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  return [selectedFilters, { updateFilters, addFilter, removeFilter, clearFilters }] as const
}

export const TopicBodyContext = React.createContext<ReturnType<typeof useTopicBodyFilters> | null>(null)

interface TopicBodyContextProviderProps {
  children: React.ReactNode
  initialFilters?: string[]
}

export const TopicBodyContextProvider = ({
  children,
  initialFilters = ['Leicester', 'London', '6-in-1'],
}: TopicBodyContextProviderProps) => {
  const topicBodyState = useTopicBodyFilters(initialFilters)

  return <TopicBodyContext.Provider value={topicBodyState}>{children}</TopicBodyContext.Provider>
}
