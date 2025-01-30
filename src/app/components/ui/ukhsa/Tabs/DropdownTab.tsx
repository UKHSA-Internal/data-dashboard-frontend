'use client'
import { ChangeEvent } from 'react'

interface DropdownProps {
  className: string
  chartIdentifier: string
}

interface DropdownOptionsProps {
  value: string
  displayText: string
}

const DropdownTab = ({ className, chartIdentifier }: DropdownProps) => {
  const dropdownOptions: DropdownOptionsProps[] = [
    { value: 'chart', displayText: 'Chart' },
    { value: 'table', displayText: 'Tabular Data' },
    { value: 'download', displayText: 'Download' },
    { value: 'about', displayText: 'About' },
  ]

  const displayCorrespondingContent = async (selectedValue: string) => {
    // create a new array with from the original dropDown options. this prevents the splice from altering the original array data.
    const options = dropdownOptions.slice()
    // find the index of the selectedValue and remove the selectedValue object from the array.
    const optionIndex = options.findIndex((option) => option.value === selectedValue)
    options.splice(optionIndex, 1)

    options.map((option) => {
      var nonSelectedContent = document.getElementById(`${option.value}-${chartIdentifier}-content`)
      if (nonSelectedContent) {
        nonSelectedContent.setAttribute('data-state', 'inactive')
      }
    })

    const selectedContent = document.getElementById(`${selectedValue}-${chartIdentifier}-content`)
    if (selectedContent) {
      selectedContent.setAttribute('data-state', 'active')
    }
  }

  const onChangeFunction = async (optionSelected: ChangeEvent<HTMLSelectElement>) => {
    optionSelected.preventDefault
    await displayCorrespondingContent(optionSelected.target.value)
  }

  return (
    <select
      id={`#dropdown-${chartIdentifier}`}
      defaultValue={`#chart-${chartIdentifier}`}
      onChange={onChangeFunction}
      className={className}
      role="tab"
    >
      {dropdownOptions.map(({ value, displayText }: DropdownOptionsProps) => (
        <option value={value}>{displayText}</option>
      ))}
    </select>
  )
}

export default DropdownTab
