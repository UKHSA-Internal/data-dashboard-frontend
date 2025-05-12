'use client'

import { useRouter } from 'next/navigation'

import { useTimeseriesFilterUpdater } from '@/app/hooks/useTimeseriesFilter'
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

  const { setFilter, getAllFilters } = useTimeseriesFilterUpdater()

  const setFilterParams = (newFilter: string) => {
    let filters = getAllFilters()

    const [filterName] = newFilter.split('|')

    // Remove existing filters with the same name
    filters = filters.filter((filter) => !filter.startsWith(filterName))

    filters.push(newFilter)

    const filtersToUpdate = new URLSearchParams('')

    filtersToUpdate.set('timeseriesFilter', filters.join(';'))

    setFilter(filters.toString())
    return `?${filtersToUpdate.toString()}`
  }

  // Handle update of select component
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(setFilterParams(event.target.value), { scroll: false })
  }

  // Turn slug back into string for matching against select component
  const formatTimeString = (timeString: string) => {
    if (timeString === 'all') return 'All'

    const [amount, unit] = timeString.split('-')
    const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1)

    // Remove the 's' at the end if the amount is '1'
    const formattedUnit = amount === '1' ? capitalizedUnit.slice(0, -1) : capitalizedUnit

    return `${amount} ${formattedUnit}`
  }

  // Sort out default value for select component (if filter in URL params)
  const getCurrentFilterValue = () => {
    const currentFilter = getAllFilters().find((filter) => filter.startsWith(`${chartId}|`))

    if (currentFilter) {
      const [, filterValue] = currentFilter.split('|')
      return formatTimeString(filterValue)
    }

    return 'All'
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
