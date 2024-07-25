import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
  return <div className="relative grid grid-cols-[1fr_70px] gap-2 sm:grid-cols-[50px_1fr_70px]">{children}</div>
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

interface ListItemStatusTagProps {
  level: HealthAlertStatus | 'No alerts'
  region: string
  type: HealthAlertTypes
}

export const ListItemStatusTag = ({ level, region, type }: ListItemStatusTagProps) => {
  const { t } = useTranslation('weatherHealthAlerts')

  // let ariaLabel = `There is currently a ${level} ${type} alert status for ${region}`
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
