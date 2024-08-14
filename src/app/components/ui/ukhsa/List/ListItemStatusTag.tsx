'use client'

import clsx from 'clsx'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
import { useTranslation } from '@/app/i18n/client'

interface ListItemStatusTagProps {
  level: HealthAlertStatus | 'No alerts'
  region: string
  type: HealthAlertTypes
}

const ListItemStatusTag = ({ level, region, type }: ListItemStatusTagProps) => {
  const { t } = useTranslation('weatherHealthAlerts')

  function getStatusKey(level: HealthAlertStatus | 'No alerts') {
    switch (level) {
      case 'Amber':
        return 'Amber'
      case 'No alerts':
        return 'None'
      default:
        return 'Initial'
    }
  }

  return (
    <div
      className={clsx('govuk-!-margin-right-0 govuk-phase-banner__content__tag m-auto capitalize', {
        'govuk-tag govuk-tag--green': level === 'Green',
        'govuk-tag govuk-tag--yellow': level === 'Yellow',
        'govuk-tag govuk-tag--orange': level === 'Amber',
        'govuk-tag govuk-tag--red': level === 'Red',
      })}
      aria-label={t('statusLabel', { context: getStatusKey(level), level, type, region })}
    >
      {level}
    </div>
  )
}

export default ListItemStatusTag
