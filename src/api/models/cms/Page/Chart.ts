import type { ChartTypes } from '../../ChartTypes'
import type { Geography } from '../../Geography'
import type { GeographyType } from '../../GeographyType'
import type { Metrics } from '../../Metrics'
import type { Topics } from '../../Topics'

type ChartValue = {
  topic: Topics
  metric: Metrics
  chart_type: ChartTypes
  date_from: null
  date_to: null
  stratum: string
  geography: Geography
  geography_type: GeographyType
}

export type Chart = {
  type: string
  value: ChartValue
  id: string
}
