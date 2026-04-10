type Level = 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret'

const levelContent: Record<Level, string> = {
  official: 'Official',
  official_sensitive: 'Official-Sensitive',
  protective_marking_not_set: 'Protective marking not set',
  secret: 'Secret',
  top_secret: 'Top Secret',
}

const levelContentCaps: Record<Level, string> = {
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
  level: Level = 'official_sensitive',
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
  pageClassification: Level = 'official_sensitive',
  authEnabled: boolean | undefined
): string => {
  if (authEnabled && isPublic === false) {
    return pageClassification in levelContentCaps ? `(${levelContentCaps[pageClassification]})` : '(OFFICIAL SENSITIVE)'
  }
  return ''
}
