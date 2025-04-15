'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { toSlug } from '@/app/utils/app.utils'

export const getSelectOptions = (years: number): Array<string> => {
  if (years < 1) return ['All']

  if (years >= 1 && years < 2) return ['1 Month', '3 Months', '6 Months', 'All']

  if (years >= 2 && years < 3) return ['1 Month', '3 Months', '6 Months', '1 Year', 'All']

  if (years >= 3 && years < 4) return ['3 Months', '6 Months', '1 Year', '2 Years', 'All']

  if (years >= 4 && years < 5) return ['6 Months', '1 Year', '2 Years', '3 Years', 'All']

  if (years >= 5 && years < 6) return ['6 Months', '1 Year', '2 Years', '3 Years', '4 Years', 'All']

  if (years >= 6 && years < 10) return ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', 'All']

  if (years >= 10 && years < 15) return ['1 Year', '2 Years', '3 Years', '5 Years', '7 Years', 'All']

  if (years >= 15 && years < 20) return ['1 Year', '2 Years', '5 Years', '10 Years', 'All']

  if (years >= 20 && years < 25) return ['1 Year', '2 Years', '5 Years', '10 Years', '15 Years', 'All']

  if (years >= 25 && years < 30) return ['1 Year', '2 Years', '10 Years', '15 Years', '20 Years', 'All']

  if (years >= 30 && years < 35) return ['1 Year', '2 Years', '10 Years', '15 Years', '20 Years', 'All']

  return ['All']
}

interface ChartSelectProps {
  timespan: { years: number; months: number }
  chartId: string
}

const ChartSelect = ({ timespan, chartId }: ChartSelectProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state with current filters
  const [selectedFiltersList, setSelectedFiltersList] = useState<string[]>(
    () => searchParams.get('timeseriesFilter')?.split(';') || []
  )

  // Update state with URL updates
  useEffect(() => {
    setSelectedFiltersList(searchParams.get('timeseriesFilter')?.split(';') || [])
  }, [searchParams])

  const setFilterParams = (newFilter: string) => {
    let filters = getFilters()
    const [filterName, filterValue] = newFilter.split('|')

    // Remove existing filters with the same name and add new one if not 'all'
    filters = filters.filter((filter) => !filter.startsWith(filterName))
    if (filterValue !== 'all') {
      filters.push(newFilter)
    }

    setSelectedFiltersList(filters)

    const currentParams = new URLSearchParams(searchParams.toString())

    // Update or remove timeseriesFilter based on remaining filters
    const validFilters = filters.filter((filter) => filter.length > 0)
    if (validFilters.length > 0) {
      currentParams.set('timeseriesFilter', validFilters.join(';'))
    } else {
      currentParams.delete('timeseriesFilter')
    }

    return `?${currentParams.toString()}`
  }

  // Get list of timeseries filters for different charts
  const getFilters = () => {
    return searchParams.get('timeseriesFilter')?.split(';') ?? []
  }

  // Handle update of select component
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(setFilterParams(event.target.value), { scroll: false })
  }

  // Turn slug back into string for matching against select component
  const formatTimeString = (timeString: string) => {
    const [amount, unit] = timeString.split('-')
    const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1)

    // Remove the 's' at the end if the amount is '1'
    const formattedUnit = amount === '1' ? capitalizedUnit.slice(0, -1) : capitalizedUnit

    return `${amount} ${formattedUnit}`
  }

  const getCurrentFilterValue = () => {
    const currentFilter = selectedFiltersList.find((filter) => filter.startsWith(`${chartId}|`))

    if (currentFilter) {
      const [, filterValue] = currentFilter.split('|')
      return formatTimeString(filterValue)
    }

    // Default to "1 Year" if timespan is 2 years or more, otherwise "All"
    return timespan.years >= 2 ? '1 Year' : 'All'
  }

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={chartId}>
        Filter data by
      </label>
      <select className="govuk-select" id={chartId} onChange={handleChange}>
        {getSelectOptions(timespan.years).map((selectOption) => (
          <option
            key={selectOption}
            selected={selectOption === getCurrentFilterValue()}
            value={`${chartId}|${toSlug(selectOption)}`}
          >
            {selectOption}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChartSelect
