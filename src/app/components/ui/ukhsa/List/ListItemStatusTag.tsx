import clsx from 'clsx'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
import { useTranslation } from '@/app/i18n'

interface ListItemStatusTagProps {
  level: HealthAlertStatus | 'No alerts'
  region: string
  type: HealthAlertTypes
}

const ListItemStatusTag = async ({ level, region, type }: ListItemStatusTagProps) => {
  const { t } = await useTranslation('weatherHealthAlerts')

  let ariaLabel = t('statusLabelInitial', { level, type, region })

  if (level === 'Amber') ariaLabel = t('statusLabelAmber', { level, type, region })

  if (level === 'No alerts') ariaLabel = t('statusLabelNone', { level, type, region })

  return (
    <div
      className={clsx('govuk-!-margin-right-0 govuk-phase-banner__content__tag m-auto capitalize', {
        'govuk-tag govuk-tag--green': level === 'Green',
        'govuk-tag govuk-tag--yellow': level === 'Yellow',
        'govuk-tag govuk-tag--orange': level === 'Amber',
        'govuk-tag govuk-tag--red': level === 'Red',
      })}
      aria-label={ariaLabel}
    >
      {level}
    </div>
  )
}

export default ListItemStatusTag
