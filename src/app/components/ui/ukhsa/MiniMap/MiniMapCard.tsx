'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Card } from '../Card/Card'
import { MiniMap } from './MiniMap'

export function MiniMapCard() {
  const router = useRouter()
  return (
    <Card
      asChild
      aria-labelledby={`chart-row-card-heading-x4`}
      className="govuk-link--no-visited-state govuk-!-padding-5 ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
    >
      <Link
        href="/weather-health-alerts/heat"
        scroll={false}
        onClick={(evt) => {
          evt.preventDefault()
          router.push('/?v=map&type=heat')
        }}
      >
        <h3 id="chart-row-card-heading-x4" className="govuk-heading-m mb-1">
          Heat health alerts
        </h3>
        <p className="govuk-body-s text-grey-1">Across England</p>
        <MiniMap />
      </Link>
    </Card>
  )
}
