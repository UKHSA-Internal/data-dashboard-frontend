import { ReactNode } from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description: string
  id: string
}

export async function ChartRowCardHeader({ children, id, title, description }: ChartRowCardHeaderProps) {
  const [, areaName] = getAreaSelector()

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="govuk-body-m mb-2 text-dark-grey">
        {title} {areaName && `(${areaName})`}
      </h3>
      <p className="govuk-heading-s govuk-!-margin-bottom-2 pt-0">{description}</p>
      {children}
    </header>
  )
}
