type Level = 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret'

const levelContent: Record<Level, string> = {
  official: 'Official',
  official_sensitive: 'Official-Sensitive',
  protective_marking_not_set: 'Protective marking not set',
  secret: 'Secret',
  top_secret: 'Top Secret',
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
    <span className="block break-words text-[#CECECE] sm:inline sm:whitespace-nowrap">&nbsp;{levelContent[level]}</span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}
