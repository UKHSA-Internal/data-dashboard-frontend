'use client'
import { useEffect, useState } from 'react'
/**
 * Hook for getting the current timeseriesFilter value from session storage
 * Returns the filter string or undefined if no filter exists
 * @param chartId - The id of the chart
 * @returns The timeseriesFilter value for the specified chart
 */
export function useTimeseriesFilterValue(chartId: string): string | undefined {
  const [filter, setFilter] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Load filter from session storage
    const storedFilters = sessionStorage.getItem('timeseriesFilters')
    if (storedFilters) {
      const parsedFilters = storedFilters.split(';')
      const currentFilter = parsedFilters.find((filter) => filter.startsWith(`${chartId}|`))
      setFilter(currentFilter)
    }
  }, [chartId])
  return filter
}
/**
 * Hook for setting a timeseriesFilter in session storage
 * @returns A function to set a filter value
 */
export function useTimeseriesFilterUpdater() {
  /**
   * Set a new filter value for a specific chart
   * @param newFilter - Format: "chartId|filterValue" (e.g., "covid-cases|1-month")
   */
  const setFilter = (newFilter: string) => {
    if (typeof window === 'undefined') return
    const [filterName, filterValue] = newFilter.split('|')

    // Get existing filters
    const storedFilters = sessionStorage.getItem('timeseriesFilters')
    let filters = storedFilters ? storedFilters.split(';') : []

    // Remove existing filters with the same name
    filters = filters.filter((filter) => !filter.startsWith(`${filterName}|`))

    // Only add the new filter if the value is not 'all'
    if (filterValue !== 'all') {
      filters.push(newFilter)
    }

    // Filter out any empty strings before joining
    const validFilters = filters.filter((filter) => filter.length > 0)

    // Save to session storage
    if (validFilters.length > 0) {
      sessionStorage.setItem('timeseriesFilters', validFilters.join(';'))
    } else {
      sessionStorage.removeItem('timeseriesFilters')
    }
  }

  /**
   * Get all current filters from session storage
   * @returns Array of filter strings or empty array if none exist
   */
  const getAllFilters = (): string[] => {
    if (typeof window === 'undefined') return []

    const storedFilters = sessionStorage.getItem('timeseriesFilters')
    return storedFilters ? storedFilters.split(';') : []
  }

  /**
   * Clear all filters from session storage
   */
  const clearAllFilters = () => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('timeseriesFilters')
  }
  return {
    setFilter,
    getAllFilters,
    clearAllFilters,
  }
}
