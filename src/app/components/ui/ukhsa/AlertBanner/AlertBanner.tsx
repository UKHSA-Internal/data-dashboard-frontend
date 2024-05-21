import clsx from 'clsx'

import { ListItemStatusIcon } from '../List/ListItemStatus'

interface AlertBannerProps {
  level: 'green' | 'yellow' | 'amber' | 'red'
  type: 'heat' | 'cold'
}

export const AlertBanner = ({ level, type }: AlertBannerProps) => {
  const alertType = type.charAt(0).toUpperCase() + type.slice(1)

  const title = {
    green: `${alertType} warning`,
    yellow: `${alertType} warning`,
    amber: `Extreme ${alertType} warning`,
    red: `Extreme ${alertType} warning`,
  }

  const message = {
    green: `${alertType} warnings may occur`,
    yellow: `${alertType} warnings are possible`,
    amber: `${alertType} warnings are likely`,
    red: `${alertType} warnings are extremely likely`,
  }

  return (
    <div
      className={clsx(
        `govuk-inset-text govuk-!-padding-top-2 govuk-!-padding-bottom-2 govuk-!-margin-top-0 govuk-!-margin-bottom-4 grid grid-cols-[50px_1fr] gap-3`,
        {
          'border-green bg-green_opaque': level === 'green',
          'border-yellow bg-yellow_opaque': level === 'yellow',
          'border-orange bg-orange_opaque': level === 'amber',
          'border-red bg-red_opaque': level === 'red',
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
