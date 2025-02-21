import { ReactNode } from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description: string
  id: string
}

export async function ChartRowCardHeader({ children, id, title, description }: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = getAreaSelector()

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="default-govuk-header mb-2 font-bold">
        {title} {areaName && `(${areaName})`}
      </h3>
      <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
      {children}
    </header>
  )
}
