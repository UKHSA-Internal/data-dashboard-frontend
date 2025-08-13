import { CardTypes } from '@/api/models/cms/Page/Body'
import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
/* eslint-disable @typescript-eslint/no-explicit-any*/
export interface ExtractedFilters {
  timePeriods: TimePeriod[]
  geographyFilters: GeographyFilters | null
  thresholdFilters: ThresholdFilters | null
  dataFilters: DataFilters | null
}

export function extractDataFromGlobalFilter(content: CardTypes): ExtractedFilters {
  let geographyFilters: GeographyFilters | null = null
  let thresholdFilters: ThresholdFilters | null = null
  let dataFilters: DataFilters | null = null
  let timePeriods: TimePeriod[] = []

  // Extracts each of the filter types that are provided in the rows
  if (content.type === 'global_filter_card' && content.value.rows) {
    content.value.rows.forEach((row: any) => {
      row.value.filters?.forEach((filter: any) => {
        switch (filter.type) {
          case 'geography_filters':
            geographyFilters = filter.value as GeographyFilters
            break
          case 'threshold_filters':
            thresholdFilters = filter.value as ThresholdFilters
            break
          case 'data_filters':
            dataFilters = filter.value as DataFilters
            break
        }
      })
    })
  }
  // Time Period Extraction
  if (content.type === 'global_filter_card' && content.value.time_range) {
    timePeriods = content.value.time_range.time_periods
  }

  return {
    timePeriods,
    geographyFilters,
    thresholdFilters,
    dataFilters,
  }
}
