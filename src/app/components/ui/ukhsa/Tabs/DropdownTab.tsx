'use client'
import kebabCase from 'lodash/kebabCase'
import React, { ChangeEvent } from 'react'

import { TabsContext } from './Tabs'

interface DropdownProps {
  className: string
  chartTitle: string
}

interface DropdownOptionsProps {
  value: string
  displayText: string
}

const DropdownTab = ({ className, chartTitle }: DropdownProps) => {
  const chartIdentifier = kebabCase(chartTitle)
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('DropdownTab must be used within the <Tabs/> component')

  const [, setSelectedTab] = context

  const dropdownOptions: DropdownOptionsProps[] = [
    { value: 'chart', displayText: 'Chart' },
    { value: 'table', displayText: 'Tabular Data' },
    { value: 'download', displayText: 'Download' },
    { value: 'about', displayText: 'About' },
  ]

  const onChangeFunction = async (optionSelected: ChangeEvent<HTMLSelectElement>) => {
    optionSelected.preventDefault()
    setSelectedTab(`${chartIdentifier}-${optionSelected.target.value}`)
  }

  return (
    <select
      id={`#dropdown-${chartIdentifier}`}
      defaultValue={`#chart-${chartIdentifier}`}
      onChange={onChangeFunction}
      className={className}
      aria-label={`Choose display option for ${chartTitle}`}
    >
      {dropdownOptions.map(({ value, displayText }: DropdownOptionsProps, index) => (
        <option key={`option-${index}`} value={value}>
          {displayText}
        </option>
      ))}
    </select>
  )
}

export default DropdownTab
