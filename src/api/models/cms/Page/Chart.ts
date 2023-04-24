import type { Topics } from '../../Topics'

type ChartValue = {
  topic: Topics
  metric: string
  chart_type: string
  date_from: null
  date_to: null
  stratum: string
  geography: string
  geography_type: string
}

export type Chart = {
  type: string
  value: ChartValue
  id: string
}
