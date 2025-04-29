'use client'

import { useEffect, useState } from 'react'

import { Timespan } from '@/app/types/chart'

// Hook for reading all chart filters
export const useReadChartFilters = () => {
  const [filters, setFilters] = useState<Record<string, string>>({})

  useEffect(() => {
    const allFilters: Record<string, string> = {}
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('chart-filter-')) {
        const chartId = key.replace('chart-filter-', '')
        allFilters[chartId] = sessionStorage.getItem(key) || 'all'
      }
    }
    setFilters(allFilters)
  }, [])

  return filters
}

// Hook for setting a single chart's filter
export const useWriteChartFilter = (chartId: string, timespan: Timespan) => {
  const storageKey = `chart-filter-${chartId}`

  // Get initial value from sessionStorage or default based on timespan
  const getInitialValue = () => {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) return stored

    // Default to "1 Year" if timespan >= 2 years, otherwise "All"
    return timespan.years >= 2 ? '1-year' : 'all'
  }

  const [selectedFilter, setSelectedFilter] = useState(getInitialValue)

  // Update both state and sessionStorage when filter changes
  const updateFilter = (newValue: string) => {
    setSelectedFilter(newValue)
    sessionStorage.setItem(storageKey, newValue)
  }

  return [selectedFilter, updateFilter] as const
}
