import clsx from 'clsx'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

import { ListItemStatusIcon } from '../List/ListItemStatus'

interface AlertBannerProps {
  level: HealthAlertStatus
  type: HealthAlertTypes
}

export const AlertBanner = ({ level, type }: AlertBannerProps) => {
  const alertType = type.charAt(0).toUpperCase() + type.slice(1)

  const title = {
    Green: `${alertType} warning`,
    Yellow: `${alertType} warning`,
    Amber: `Extreme ${alertType} warning`,
    Red: `Extreme ${alertType} warning`,
  }

  const message = {
    Green: `${alertType} warnings may occur`,
    Yellow: `${alertType} warnings are possible`,
    Amber: `${alertType} warnings are likely`,
    Red: `${alertType} warnings are extremely likely`,
  }

  return (
    <div
      className={clsx(
        `govuk-inset-text govuk-!-padding-top-2 govuk-!-padding-bottom-2 govuk-!-margin-top-0 govuk-!-margin-bottom-4 grid grid-cols-[50px_1fr] gap-3`,
        {
          'border-green bg-green-opaque': level === 'Green',
          'border-yellow bg-yellow-opaque': level === 'Yellow',
          'border-orange bg-orange-opaque': level === 'Amber',
          'border-red bg-red-opaque': level === 'Red',
        }
      )}
    >
      <ListItemStatusIcon level={level} type={type} />
      <div>
        <h2 className="govuk-heading-s govuk-!-margin-bottom-0 govuk-!-margin-top-0">{title[level]}</h2>
        <span>{message[level]}</span>
      </div>
    </div>
  )
}
