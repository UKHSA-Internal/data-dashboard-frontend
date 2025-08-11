'use client'

import clsx from 'clsx'
import { useState } from 'react'
import dataMockJson from 'src/app/components/ui/ukhsa/VaccinationDropdown/data.json'

import { Vaccination } from '@/api/models/cms/Page/GlobalFilter'

const dataMock = dataMockJson as Vaccination[]

interface VaccinationDropdownProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (selectedVaccination: Vaccination['id'] | null) => void
}

export const VaccinationDropdown = ({
  className = '',
  placeholder = 'Select a vaccination',
  disabled = false,
  onChange,
}: VaccinationDropdownProps) => {
  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination['id'] | null>(null)

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVaccineId = event.target.value

    if (!selectedVaccineId) {
      setSelectedVaccination(null)
      onChange?.(null)
      return
    }

    const selectedVaccinationValue = dataMock.find((vaccine) => vaccine.id === selectedVaccineId)
    if (selectedVaccinationValue) {
      setSelectedVaccination(selectedVaccinationValue['id'])
      onChange?.(selectedVaccinationValue['id'])
    }
  }

  // useEffect(() => {
  //   if (selectedVaccination && !dataMock.find((v) => v.id === selectedVaccination)) {
  //     setSelectedVaccination(null)
  //     onChange?.(null)
  //   }
  // }, [selectedVaccination])

  if (dataMock.length === 0) {
    return null
  }

  return (
    <div className={clsx('govuk-form-group', className)}>
      <label className="govuk-label govuk-label--s" htmlFor="vaccination-select">
        Vaccine Selection
      </label>
      <select
        id="vaccination-select"
        className="govuk-select"
        value={selectedVaccination ? selectedVaccination : ''}
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
