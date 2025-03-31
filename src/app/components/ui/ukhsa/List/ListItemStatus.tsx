import Link from 'next/link'
import { ReactNode } from 'react'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'

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
  return (
    <div className="relative grid grid-cols-[1fr_125px] items-center gap-2 sm:grid-cols-[50px_1fr_125px]">
      {children}
    </div>
  )
}

interface ListItemStatusIconProps {
  level: HealthAlertStatus | 'No alerts'
  type: HealthAlertTypes
}

export const ListItemStatusIcon = ({ level, type }: ListItemStatusIconProps) => {
  let icon

  if (type === 'heat') {
    switch (level) {
      case 'Yellow':
        icon = <HeatHealthAlertYellowIcon />
        break
      case 'Amber':
        icon = <HeatHealthAlertAmberIcon />
        break
      case 'Red':
        icon = <HeatHealthAlertRedIcon />
        break
      default:
        icon = <HeatHealthAlertGreenIcon />
    }
  }
  if (type === 'cold') {
    switch (level) {
      case 'Yellow':
        icon = <ColdHealthAlertYellowIcon />
        break
      case 'Amber':
        icon = <ColdHealthAlertAmberIcon />
        break
      case 'Red':
        icon = <ColdHealthAlertRedIcon />
        break
      default:
        icon = <ColdHealthAlertGreenIcon />
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
