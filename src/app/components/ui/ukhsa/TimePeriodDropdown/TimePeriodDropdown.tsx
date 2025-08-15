'use client'
import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useGlobalFilters } from '@/app/context/globalFilterContext'

interface TimePeriodDropdownProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (selectedPeriod: TimePeriod | null) => void
}

export const TimePeriodDropdown = ({
  className = '',
  placeholder = 'Select a time period',
  disabled = false,
  onChange,
}: TimePeriodDropdownProps) => {
  const { state, actions } = useGlobalFilters()
  const { timePeriods, selectedTimePeriod } = state
  const { setSelectedTimePeriod } = actions

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value

    if (!selectedLabel) {
      setSelectedTimePeriod(null)
      onChange?.(null)
      return
    }

    const selectedPeriod = timePeriods!.find((period) => period.value.label === selectedLabel)

    if (selectedPeriod) {
      setSelectedTimePeriod(selectedPeriod)
      onChange?.(selectedPeriod)
    }
  }

  // Don't render if no time periods available
  if (timePeriods!.length === 0) {
    return null
  }

  return (
    <div className={`govuk-form-group ${className}`}>
      <label className="govuk-label govuk-label--s" htmlFor="time-period-select">
        Year selection
      </label>
      <select
        id="time-period-select"
        className="govuk-select"
        value={selectedTimePeriod?.value.label || ''}
        onChange={handleSelectionChange}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {timePeriods!.map((period) => (
          <option key={`selected dropdown: ${period.value.label}`} value={period.value.label}>
            {period.value.label}
          </option>
        ))}
      </select>
    </div>
  )
}
