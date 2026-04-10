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
  official_sensitive: 'OFFICIAL SENSITIVE',
  protective_marking_not_set: 'PROTECTIVE MARKING NOT SET',
  secret: 'SECRET',
  top_secret: 'TOP SECRET',
}

export const getColumnHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isPublic?: boolean,
  level: DataClassification = 'official_sensitive',
  authEnabled?: boolean
) => {
  const label = chartLabel || axisTitle || fallback

  const sensitiveLabel = authEnabled && isPublic === false && (
    <span className="whitespace-nowrap uppercase text-[#CECECE]">&nbsp;{levelContent[level]}</span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}

export const getDataClassification = (
  isPublic: boolean | undefined,
  pageClassification: DataClassification = 'official_sensitive',
  authEnabled: boolean | undefined
): string => {
  if (authEnabled && isPublic === false) {
    return `(${levelContentCaps[pageClassification]})`
  }
  return ''
}
