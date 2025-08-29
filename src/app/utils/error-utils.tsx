import { DataFilter, ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'

interface ErrorMessageParams {
  chartType: string
  geographyName: string
  selectedThresholds?: ThresholdFilter[]
  selectedVaccinations: DataFilter[]
  dateFrom: string
  dateTo: string
}

export default function createChartErrorMessage({
  chartType,
  geographyName,
  selectedThresholds,
  selectedVaccinations,
  dateFrom,
  dateTo,
}: ErrorMessageParams): string {
  const vaccinationLabels = selectedVaccinations.length
    ? selectedVaccinations.map((vaccination) => vaccination.value.label).join(', ')
    : null

  const thresholdLabels = selectedThresholds?.length
    ? selectedThresholds.map((threshold) => threshold.value.label).join(', ')
    : null

  // Build the conditional parts
  const parts = []

  const requestType = chartType === 'subplot' ? 'coverage' : 'time series'

  if (vaccinationLabels) {
    parts.push(`selected vaccinations: ${vaccinationLabels}`)
  }

  if (thresholdLabels) {
    parts.push(`threshold values: ${thresholdLabels}`)
  }

  // Join parts with appropriate conjunction
  const withClause = parts.length > 0 ? ` with ${parts.join(' and ')}` : ''

  return `Failed to retrieve ${requestType} data for: ${geographyName}${withClause} for the date range: ${dateFrom} to ${dateTo}`
}
