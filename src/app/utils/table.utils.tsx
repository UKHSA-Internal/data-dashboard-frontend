import { DataClassification } from '@/api/models/DataClassification'

const levelContent: Record<DataClassification, string> = {
  official: 'Official',
  official_sensitive: 'Official-Sensitive',
  protective_marking_not_set: 'Protective marking not set',
  secret: 'Secret',
  top_secret: 'Top Secret',
}

const levelContentCaps: Record<DataClassification, string> = {
  official: 'OFFICIAL',
  official_sensitive: 'OFFICIAL-SENSITIVE',
  protective_marking_not_set: 'PROTECTIVE MARKING NOT SET',
  secret: 'SECRET',
  top_secret: 'TOP SECRET',
}

export const getColumnHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isPublic?: boolean,
  level?: DataClassification,
  authEnabled?: boolean
) => {
  const label = chartLabel || axisTitle || fallback

  const sensitiveLabel = authEnabled && isPublic === false && level && (
    <span className="inline-block w-full whitespace-normal break-words text-[#CECECE] sm:w-auto">
      &nbsp;{levelContent[level]}
    </span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}

export const getDataClassificationLabel = (
  isPublic: boolean | undefined,
  authEnabled: boolean | undefined,
  dataClassification: DataClassification | undefined
): string | undefined => {
  if (authEnabled && isPublic === false && dataClassification) {
    return `(${levelContentCaps[dataClassification]})`
  }
  return ''
}
