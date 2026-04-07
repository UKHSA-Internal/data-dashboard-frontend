import { ReactNode } from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getDataClassification } from '@/app/utils/table.utils'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description?: string
  id: string
  isPublic?: boolean
  pageClassification?: string
  authEnabled?: boolean
}

export async function ChartRowCardHeader({
  children,
  id,
  title,
  description,
  isPublic,
  pageClassification = 'official_sensitive',
  authEnabled,
}: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = await getAreaSelector()

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
        {title} {areaName && `(${areaName})`} {getDataClassification(isPublic, pageClassification, authEnabled)}
      </h3>
      {description ? (
        <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
      ) : null}
      {children}
    </header>
  )
}
