import { ReactNode } from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  id: string
}

export async function ChartRowCardHeader({ children, id, title }: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = getAreaSelector()

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="default-govuk-header mb-2 font-bold">
        {title} {areaName && `(${areaName})`}
      </h3>
      {children}
    </header>
  )
}
