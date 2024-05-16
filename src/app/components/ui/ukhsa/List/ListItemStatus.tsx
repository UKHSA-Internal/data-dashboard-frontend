import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ColdHealthAlertAmberIcon } from '../Icons/ColdHealthAlertsAmber'
import { ColdHealthAlertGreenIcon } from '../Icons/ColdHealthAlertsGreen'
import { ColdHealthAlertRedIcon } from '../Icons/ColdHealthAlertsRed'
import { ColdHealthAlertYellowIcon } from '../Icons/ColdHealthAlertsYellow'
import { HeatHealthAlertAmberIcon } from '../Icons/HeatHealthAlertsAmber'
import { HeatHealthAlertGreenIcon } from '../Icons/HeatHealthAlertsGreen'
import { HeatHealthAlertRedIcon } from '../Icons/HeatHealthAlertsRed'
import { HeatHealthAlertYellowIcon } from '../Icons/HeatHealthAlertsYellow'

interface ListItemStatusProps {
  children: ReactNode
}

export const ListItemStatus = ({ children }: ListItemStatusProps) => {
  return <div className="relative grid grid-cols-[1fr_100px] gap-2 sm:grid-cols-[50px_1fr_100px]">{children}</div>
}

interface ListItemStatusIconProps {
  alertLevel: 'green' | 'yellow' | 'amber' | 'red'
  weather: 'heat' | 'cold'
}

export const ListItemStatusIcon = ({ alertLevel, weather }: ListItemStatusIconProps) => {
  let icon

  if (weather == 'heat') {
    switch (alertLevel) {
      case 'green':
        icon = <HeatHealthAlertGreenIcon />
        break
      case 'yellow':
        icon = <HeatHealthAlertYellowIcon />
        break
      case 'amber':
        icon = <HeatHealthAlertAmberIcon />
        break
      case 'red':
        icon = <HeatHealthAlertRedIcon />
        break
    }
  }
  if (weather == 'cold') {
    switch (alertLevel) {
      case 'green':
        icon = <ColdHealthAlertGreenIcon />
        break
      case 'yellow':
        icon = <ColdHealthAlertYellowIcon />
        break
      case 'amber':
        icon = <ColdHealthAlertAmberIcon />
        break
      case 'red':
        icon = <ColdHealthAlertRedIcon />
        break
    }
  }

  return <div className="m-auto hidden sm:block">{icon}</div>
}

export const ListItemStatusContent = ({ children }: ListItemStatusProps) => {
  return <div className="flex flex-col">{children}</div>
}

interface ListItemStatusLinkProps extends ListItemStatusProps {
  href: string
}

export const ListItemStatusLink = ({ children, href }: ListItemStatusLinkProps) => {
  return (
    <h2 className="govuk-heading-s govuk-!-margin-bottom-0">
      <Link className="govuk-link govuk-link--no-visited-state after:absolute after:inset-0 " href={href}>
        {children}
      </Link>
    </h2>
  )
}

export const ListItemStatusTimestamp = ({ children }: ListItemStatusProps) => {
  return (
    <span className="govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-top-1 text-[14px] sm:text-[16px]">
      {children}
    </span>
  )
}

interface ListItemStatusTagProps {
  alertLevel: 'green' | 'yellow' | 'amber' | 'red' | 'no alerts'
}

export const ListItemStatusTag = ({ alertLevel }: ListItemStatusTagProps) => {
  return (
    <div
      className={clsx('govuk-tag govuk-!-margin-right-0 govuk-phase-banner__content__tag m-auto', {
        'govuk-tag--green': alertLevel == 'green',
        'govuk-tag--yellow': alertLevel == 'yellow',
        'govuk-tag--orange': alertLevel == 'amber',
        'govuk-tag--red': alertLevel == 'red',
        'govuk-tag--grey': alertLevel == 'no alerts',
      })}
    >
      {alertLevel.toUpperCase()}
    </div>
  )
}
