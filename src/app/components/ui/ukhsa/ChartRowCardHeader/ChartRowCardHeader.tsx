import { ReactNode } from 'react'

import type { DataClassification } from '@/api/models/DataClassification'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getDataClassificationForHeader } from '@/app/utils/data-classification.utils'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description?: string
  id: string
  isNonPublic?: boolean
  dataClassification?: DataClassification
}

export async function ChartRowCardHeader({
  children,
  id,
  title,
  description,
  isNonPublic,
  dataClassification,
}: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = await getAreaSelector()
  const dataClassificationForHeading = getDataClassificationForHeader(isNonPublic, dataClassification)

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
        {title}
        {areaName && ` (${areaName})`}
        {dataClassificationForHeading ? ` (${dataClassificationForHeading})` : ''}
      </h3>
      {description ? (
        <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
      ) : null}
      {children}
    </header>
  )
}
