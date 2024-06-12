import clsx from 'clsx'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

import { ListItemStatusIcon } from '../List/ListItemStatus'

interface AlertBannerProps {
  level: HealthAlertStatus
  type: HealthAlertTypes
  dateFrom: string
  dateTo: string
}

export const AlertBanner = ({ level, type, dateFrom, dateTo }: AlertBannerProps) => {
  const alertType = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div
      className={clsx(
        `govuk-inset-text govuk-!-padding-top-2 govuk-!-padding-bottom-2 govuk-!-margin-top-0 govuk-!-margin-bottom-4 grid gap-3 sm:grid-cols-[50px_1fr]`,
        {
          'border-green bg-green-opaque': level === 'Green',
          'border-yellow bg-yellow-opaque': level === 'Yellow',
          'border-orange bg-orange-opaque': level === 'Amber',
          'border-red bg-red-opaque': level === 'Red',
        }
      )}
      aria-label="Alert banner"
    >
      <ListItemStatusIcon level={level} type={type} />
      <div>
        <h2 className="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-margin-top-0">{`${level} ${alertType}-health alert has been issued`}</h2>
        <span className="govuk-body-s">{`Alert is in effect from ${dateFrom} to ${dateTo}`}</span>
      </div>
    </div>
  )
}
