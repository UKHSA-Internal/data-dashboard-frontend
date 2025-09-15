import { ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'

export interface MetricValueRange {
  start: string
  end: string
}

export function mapThresholdsToMetricValueRanges(thresholds: ThresholdFilter[]): MetricValueRange[] {
  return thresholds.map((threshold) => ({
    start: threshold.value.boundary_minimum_value.toString(),
    end: threshold.value.boundary_maximum_value.toString(),
  }))
}
