'use client'

import clsx from 'clsx'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
import { useTranslation } from '@/app/i18n/client'
import { getTailwindBackgroundFromColour, getTextColourCssFromColour } from '@/app/utils/map.utils'

interface ListItemStatusTagProps {
  level: HealthAlertStatus
  region: string
  type: HealthAlertTypes
}

const ListItemStatusTag = ({ level, region, type }: ListItemStatusTagProps) => {
  const { t } = useTranslation('weatherHealthAlerts')

  function getStatusKey(level: HealthAlertStatus) {
    switch (level) {
      case 'Amber':
        return 'Amber'
      case 'Green':
        return 'None'
      default:
        return 'Initial'
    }
  }

  return (
    <div
      className={clsx(
        `govuk-tag h-6 items-center text-center capitalize`,
        getTextColourCssFromColour(level),
        getTailwindBackgroundFromColour(level)
      )}
      aria-label={t('statusLabel', { context: getStatusKey(level), level, type, region })}
    >
      {level == 'Green' ? t('map.no-alert') : t('map.alert', { level: level.toLowerCase() })}
    </div>
  )
}

export default ListItemStatusTag
