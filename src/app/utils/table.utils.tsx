import type { DataClassification } from '@/api/models/DataClassification'
import { DEFAULT_DATA_CLASSIFICATION } from '@/api/models/DataClassification'
import { getDataClassificationLabel } from '@/app/utils/data-classification.utils'

type Level = DataClassification

export const getColumnHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isNonPublic?: boolean,
  level: Level = DEFAULT_DATA_CLASSIFICATION
) => {
  const label = chartLabel || axisTitle || fallback

  const sensitiveLabel = isNonPublic && (
    <span className="inline-block w-full whitespace-normal break-words text-[#CECECE] sm:w-auto">
      &nbsp;{getDataClassificationLabel(level)}
    </span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}
