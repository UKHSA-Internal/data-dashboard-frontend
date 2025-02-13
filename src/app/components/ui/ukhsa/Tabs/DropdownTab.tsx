'use client'
import kebabCase from 'lodash/kebabCase'
import React from 'react'

import { TabsContext } from './Tabs'

interface DropdownProps {
  className: string
  chartTitle: string
}

const DropdownTab = ({ className, chartTitle }: DropdownProps) => {
  const chartIdentifier = kebabCase(chartTitle)
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('DropdownTab must be used within the <Tabs/> component')

  const [, setSelectedTab] = context

  const dropdownOptions = [
    { value: 'chart', displayText: 'Chart' },
    { value: 'table', displayText: 'Tabular Data' },
    { value: 'download', displayText: 'Download' },
    { value: 'about', displayText: 'About' },
  ]

  return (
    <select
      id={`ukhsa-chart-dropdown-${chartIdentifier}`}
      defaultValue={`chart-${chartIdentifier}`}
      onChange={(optionSelected) => {
        optionSelected.preventDefault()
        setSelectedTab(`${chartIdentifier}-${optionSelected.target.value}`)
      }}
      className={className}
      aria-label={`Choose display option for ${chartTitle}`}
    >
      {dropdownOptions.map(({ value, displayText }, index) => (
        <option key={`option-${index}`} value={value}>
          {displayText}
        </option>
      ))}
    </select>
  )
}

export default DropdownTab
