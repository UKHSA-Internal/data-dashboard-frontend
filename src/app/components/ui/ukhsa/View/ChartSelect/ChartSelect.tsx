'use client'

import { useWriteChartFilter } from '@/app/hooks/useChartFilter'
import { formatTimeString, getSelectOptions } from '@/app/utils/chart.utils'

interface ChartSelectProps {
  timespan: { years: number; months: number }
  chartId: string
}

const ChartSelect = ({ timespan, chartId }: ChartSelectProps) => {
  const [selectedFilter, setSelectedFilter] = useWriteChartFilter(chartId, timespan)

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    console.log('Selected value:', selectedValue)
    setSelectedFilter(selectedValue)
  }

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={chartId}>
        Filter data by
      </label>
      <select
        className="govuk-select"
        id={chartId}
        value={selectedFilter}
        onChange={handleFilterChange}
        aria-label="Select time period"
      >
        {/* // TODO: default option should come from pre-commit change */}
        {getSelectOptions(timespan.years).map((option) => (
          <option key={option} value={option}>
            {formatTimeString(option)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChartSelect
