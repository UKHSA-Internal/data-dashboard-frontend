import { ReactNode } from 'react'

import { DataClassification } from '@/api/models/DataClassification'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getDataClassification } from '@/app/utils/table.utils'

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description?: string
  id: string
  isPublic?: boolean
  dataClassification?: DataClassification
  authEnabled?: boolean
}

export async function ChartRowCardHeader({
  children,
  id,
  title,
  description,
  isPublic = true,
  dataClassification = undefined,
  authEnabled,
}: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = await getAreaSelector()
  const dataClassificationLabel = getDataClassification(isPublic, authEnabled, dataClassification)  

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
        {title} {areaName && `(${areaName})`} {dataClassificationLabel}
      </h3>
      {description ? (
        <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
      ) : null}
      {children}
    </header>
  )
}
