'use client'
import { kebabCase, lowerCase } from 'lodash'
import React from 'react'

import { useTranslation } from '@/app/i18n/client'

import { TabsContext } from './Tabs'

interface DropdownProps {
  className: string
  tabGroupTitle: string
  defaultValue: string
  showChart?: boolean
  showMap?: boolean
  showTable?: boolean
  showDownload?: boolean
  showAbout?: boolean
}

const DropdownTab = ({
  className,
  tabGroupTitle,
  defaultValue,
  showChart = true,
  showMap = false,
  showTable = true,
  showDownload = true,
  showAbout = false,
}: DropdownProps) => {
  const chartIdentifier = kebabCase(tabGroupTitle)
  const context = React.useContext(TabsContext)
  const { t } = useTranslation('common')
  if (!context) throw new Error('DropdownTab must be used within the <Tabs/> component')

  const [, setSelectedTab] = context

  const dropdownOptions = []
  showChart ? dropdownOptions.push({ value: 'chart', displayText: t('cms.dropdown.chartLabel') }) : null
  showMap ? dropdownOptions.push({ value: 'map', displayText: t('cms.dropdown.mapLabel') }) : null
  showTable ? dropdownOptions.push({ value: 'table', displayText: t('cms.dropdown.tableLabel') }) : null
  showDownload ? dropdownOptions.push({ value: 'download', displayText: t('cms.dropdown.downloadLabel') }) : null
  showAbout ? dropdownOptions.push({ value: 'about', displayText: t('cms.dropdown.aboutLabel') }) : null

  return (
    <select
      id={`tab-group-dropdown-${chartIdentifier}`}
      defaultValue={defaultValue}
      onChange={(optionSelected) => {
        optionSelected.preventDefault()
        setSelectedTab(`${chartIdentifier}-${optionSelected.target.value}`)
      }}
      className={className}
      aria-label={t('cms.dropdown.selectLabel', { chartTitle: lowerCase(tabGroupTitle) })}
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
