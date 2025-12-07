'use client'

import { useEffect, useRef } from 'react'

import { useTimeseriesFilter } from '@/app/hooks/useTimeseriesFilter'
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
}

const ChartSelect = ({ timespan }: ChartSelectProps) => {
  const { currentFilter, setCurrentFilter } = useTimeseriesFilter()
  const previousYearsRef = useRef<number | null>(null)

  // Set initial filter value based on timespan
  useEffect(() => {
    const isInitialMount = previousYearsRef.current === null
    const timespanChanged = previousYearsRef.current !== timespan.years

    // Only set initial value on mount or when timespan changes
    if (isInitialMount || timespanChanged) {
      // If timespan is more than 1 year, default to '1-year', otherwise default to 'all'
      if (timespan.years > 1) {
        setCurrentFilter('1-year')
      } else {
        setCurrentFilter('all')
      }
      previousYearsRef.current = timespan.years
    }
  }, [timespan.years, setCurrentFilter])

  // Handle update of select component
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilterValue = event.target.value
    setCurrentFilter(newFilterValue)
  }

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor="timeseries-filter">
        Filter data by
      </label>
      <select className="govuk-select" id="timeseries-filter" onChange={handleChange} value={currentFilter}>
        {getSelectOptions(timespan.years).map((selectOption) => (
          <option key={selectOption} value={toSlug(selectOption)}>
            {selectOption}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChartSelect
