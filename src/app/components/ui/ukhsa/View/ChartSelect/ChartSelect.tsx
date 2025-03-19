'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { toSlug } from '@/app/utils/app.utils'

const getSelectOptions = (years: number): Array<string> => {
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

  const setFilterParams = (newFilter: string) => {
    let filters = getFilters()

    const [filterName, filterValue] = newFilter.split('|')

    // Remove existing filters with the same name
    filters = filters.filter((filter) => !filter.startsWith(filterName))

    // Only add the new filter if the value is not 'all'
    if (filterValue !== 'all') {
      filters.push(newFilter)
    }

    return `?timeseriesFilter=${filters.join(';')}`
  }

  // Handle update of select component
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Handle change called', setFilterParams(event.target.value))
    router.push(setFilterParams(event.target.value))
  }

  // Get list of timeseries filters for different charts
  const getFilters = () => {
    return searchParams.get('timeseriesFilter')?.split(';') ?? []
  }

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={chartId}>
        Filter data by
      </label>
      <select className="govuk-select" id={chartId} onChange={handleChange}>
        {getSelectOptions(timespan.years).map((selectOption) => (
          <option key={selectOption} selected={selectOption === 'All'} value={`${chartId}|${toSlug(selectOption)}`}>
            {selectOption}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChartSelect
