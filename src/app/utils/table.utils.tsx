// To receive axis title, chart.label, & fallback text

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
  level: Level = 'official_sensitive'
) => {
  const label = chartLabel || axisTitle || fallback

  const sensitiveLabel = isPublic === false && (
    <span className="whitespace-nowrap uppercase text-[#CECECE]">&nbsp;{levelContent[level]}</span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}
