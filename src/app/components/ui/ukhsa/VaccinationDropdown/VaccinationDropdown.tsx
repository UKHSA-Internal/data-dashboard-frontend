'use client'

import { useState } from 'react'
import dataMock from 'src/app/components/ui/ukhsa/VaccinationDropdown/data.json'

import { Vaccination } from '@/api/models/cms/Page/GlobalFilter'

interface VaccinationDropdownProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (selectedVaccination: Vaccination | null) => void
}

export const VaccinationDropdown = ({
  className = '',
  placeholder = 'Select a vaccination',
  disabled = false,
  onChange,
}: VaccinationDropdownProps) => {
  //   const [state, actions] = useTopicBody()
  //   const { vaccinations } = state

  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination | null>(null)

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVaccineId = event.target.value

    if (!selectedVaccineId) {
      setSelectedVaccination(null)
      onChange?.(null)
      return
    }

    const selectedVaccinationValue = dataMock.find((vaccine) => vaccine.id === selectedVaccineId)
    if (selectedVaccinationValue) {
      setSelectedVaccination(selectedVaccinationValue)
      onChange?.(selectedVaccinationValue)
    }
  }

  if (dataMock.length === 0) {
    return null
  }

  return (
    <div className={`govuk-form-group ${className}`}>
      <label className="govuk-label govuk-label--s" htmlFor="vaccination-select">
        Vaccine Selection
      </label>
      <select
        id="vaccination-select"
        className="govuk-select"
        value={selectedVaccination?.id || ''}
        onChange={handleSelectionChange}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {dataMock.map((vaccine) => (
          <option key={vaccine.id} value={vaccine.id}>
            {vaccine.label}
          </option>
        ))}
      </select>
    </div>
  )
}
