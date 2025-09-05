'use client'
import { useEffect } from 'react'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useGlobalFilters } from '@/app/context/globalFilterContext'
import { useTranslation } from '@/app/i18n/client'

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
  const { t } = useTranslation('common')
  const { state, actions } = useGlobalFilters()
  const { timePeriods, selectedTimePeriod } = state
  const { setSelectedTimePeriod } = actions

  // Set initial value to current year (2024-2025) on first load
  useEffect(() => {
    if (timePeriods && timePeriods.length > 0 && !selectedTimePeriod) {
      const currentYear = new Date().getFullYear()

      // Loop backwards through time periods to find one that includes current year
      for (let i = timePeriods.length - 1; i >= 0; i--) {
        const period = timePeriods[i]
        const dateFrom = new Date(period.value.date_from).getFullYear()
        const dateTo = new Date(period.value.date_to).getFullYear()

        if (dateFrom === currentYear || dateTo === currentYear) {
          setSelectedTimePeriod(period)
          onChange?.(period)
          break
        }
      }
    }
  }, [timePeriods, selectedTimePeriod, setSelectedTimePeriod, onChange])

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
        {t('map.yearSelection')}
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
