'use client'
import { kebabCase, lowerCase } from 'lodash'
import React from 'react'

import { useTranslation } from '@/app/i18n/client'

import { TabsContext } from './Tabs'

interface DropdownProps {
  className: string
  chartTitle: string
  noAbout: boolean
  noDownload?: boolean
}

const DropdownTab = ({ className, chartTitle, noAbout, noDownload = false }: DropdownProps) => {
  const chartIdentifier = kebabCase(chartTitle)
  const context = React.useContext(TabsContext)
  const { t } = useTranslation('common')
  if (!context) throw new Error('DropdownTab must be used within the <Tabs/> component')

  const [, setSelectedTab] = context

  const dropdownOptions = [
    { value: 'chart', displayText: t('cms.dropdown.chartLabel') },
    { value: 'table', displayText: t('cms.dropdown.tableLabel') },
  ]
  noDownload ? null : dropdownOptions.push({ value: 'download', displayText: t('cms.dropdown.downloadLabel') })
  noAbout ? null : dropdownOptions.push({ value: 'about', displayText: t('cms.dropdown.aboutLabel') })

  return (
    <select
      id={`ukhsa-chart-dropdown-${chartIdentifier}`}
      defaultValue={`chart-${chartIdentifier}`}
      onChange={(optionSelected) => {
        console.log('Option Selected: ', `${chartIdentifier}-${optionSelected.target.value}`)
        optionSelected.preventDefault()
        setSelectedTab(`${chartIdentifier}-${optionSelected.target.value}`)
      }}
      className={className}
      aria-label={t('cms.dropdown.selectLabel', { chartTitle: lowerCase(chartTitle) })}
    >
      {dropdownOptions.map(({ value, displayText }) => (
        <option key={`option-${value}`} value={value}>
          {displayText}
        </option>
      ))}
    </select>
  )
}

export default DropdownTab
