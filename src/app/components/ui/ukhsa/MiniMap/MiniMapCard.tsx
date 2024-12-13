'use client'

import Link from 'next/link'

import { HealthAlertTypes } from '@/api/models/Alerts'

import { Card } from '../Card/Card'
import { MiniMap } from './MiniMap'

interface MiniMapCardProps {
  title: string
  subTitle: string
  alertType: HealthAlertTypes
}

export function MiniMapCard({ title, subTitle, alertType }: MiniMapCardProps) {
  return (
    <Card
      asChild
      aria-labelledby={`chart-row-card-heading-x4`}
      className="govuk-link--no-visited-state govuk-!-padding-5 ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
    >
      <Link href={`/weather-health-alerts/${alertType}`}>
        <h3 id="chart-row-card-heading-x4" className="govuk-heading-m mb-1">
          {title}
        </h3>
        <p className="govuk-body-s text-grey-1">{subTitle}</p>
        <MiniMap alertType={alertType} />
      </Link>
    </Card>
  )
}
