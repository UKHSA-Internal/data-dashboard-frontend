// To receive axis title, chart.label, & fallback text
export const getColumnHeader = (chartLabel: string, axisTitle: string, fallback: string, isPublic?: boolean) => {
  const label = chartLabel || axisTitle || fallback

  const sensitiveLabel = isPublic === false && (
    <span className="whitespace-nowrap text-[#CECECE]">&nbsp;OFFICIAL-SENSITIVE</span>
  )

  return (
    <>
      {label} {sensitiveLabel}
    </>
  )
}
