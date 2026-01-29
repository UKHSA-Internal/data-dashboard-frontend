'use client'

import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import { DataFilter } from '@/api/models/cms/Page/GlobalFilter'
import { useSelectedFilters, useVaccinationState } from '@/app/hooks/globalFilterHooks'

interface VaccinationDropdownProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (selectedVaccinationId: string | null) => void
}
export const VaccinationDropdown = ({
  className = '',
  placeholder = 'Select a vaccination',
  disabled = false,
  onChange,
}: VaccinationDropdownProps) => {
  const { vaccinationList, selectedVaccination, setSelectedVaccination } = useVaccinationState()
  const { selectedFilters } = useSelectedFilters()

  //to find the matching vaccinations from the selected filters
  const selectedLabels = new Set(selectedFilters!.map((item) => item.label))
  const selectedVaccinationList = vaccinationList!.filter((item) => selectedLabels.has(item.value.label))
  const matchingVaccinations = useMemo(() => {
    if (!vaccinationList) return []
    // If nothing is selected, return full list
    if (!selectedVaccinationList || selectedVaccinationList.length === 0) {
      return vaccinationList
    }
    // Otherwise return only matches
    return selectedVaccinationList
  }, [vaccinationList, selectedFilters])

  const [newVaccinationList, setNewVaccinationList] = useState(matchingVaccinations)

  useEffect(() => {
    setNewVaccinationList(matchingVaccinations)
  }, [matchingVaccinations])

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVaccineId = event.target.value

    if (!selectedVaccineId) {
      setSelectedVaccination(null)
      onChange?.(null)
      return
    }

    const selectedVaccinationValue = vaccinationList!.find((vaccine: DataFilter) => vaccine.id === selectedVaccineId)

    if (selectedVaccinationValue) {
      setSelectedVaccination(selectedVaccinationValue)
      onChange?.(selectedVaccinationValue['id'])
    }
  }
  if (!vaccinationList) {
    return null
  }

  return (
    <div className={clsx('govuk-form-group', className)}>
      <label className="govuk-label govuk-label--s map-label-style" htmlFor="vaccination-select">
        Vaccine Selection
      </label>
      <select
        id="vaccination-select"
        className="govuk-select"
        value={selectedVaccination ? selectedVaccination.id : ''}
        onChange={handleSelectionChange}
        disabled={disabled}
        data-testid="vaccination-select-control"
      >
        <option value="">{placeholder}</option>
        {newVaccinationList!.map((vaccine: DataFilter) => (
          <option key={vaccine.id} value={vaccine.id}>
            {vaccine.value.label}
          </option>
        ))}
      </select>
    </div>
  )
}
