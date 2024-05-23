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
  return <div className="relative grid grid-cols-[1fr_70px] gap-2 sm:grid-cols-[50px_1fr_70px]">{children}</div>
}

interface ListItemStatusIconProps {
  level: 'green' | 'yellow' | 'amber' | 'red' | 'no alerts'
  type: 'heat' | 'cold'
}

export const ListItemStatusIcon = ({ level, type }: ListItemStatusIconProps) => {
  let icon

  if (type === 'heat') {
    switch (level) {
      case 'green':
      case 'no alerts':
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
  if (type === 'cold') {
    switch (level) {
      case 'green':
      case 'no alerts':
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
  level: 'green' | 'yellow' | 'amber' | 'red' | 'no alerts'
  region: string
  type: 'heat' | 'cold'
}

export const ListItemStatusTag = ({ level, region, type }: ListItemStatusTagProps) => {
  let ariaLabel = `There is currently a ${level} ${type} alert status for ${region}`

  if (level === 'amber') ariaLabel = `There is currently an ${level} ${type} alert status for ${region}`

  if (level === 'no alerts') ariaLabel = `There are currently no alerts for ${region}`

  return (
    <div
      className={clsx('govuk-!-margin-right-0 govuk-phase-banner__content__tag m-auto capitalize', {
        'govuk-tag govuk-tag--green': level === 'green',
        'govuk-tag govuk-tag--yellow': level === 'yellow',
        'govuk-tag govuk-tag--orange': level === 'amber',
        'govuk-tag govuk-tag--red': level === 'red',
      })}
      aria-label={ariaLabel}
    >
      {level}
    </div>
  )
}
