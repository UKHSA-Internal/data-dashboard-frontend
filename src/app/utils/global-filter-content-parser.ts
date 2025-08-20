import { CardTypes } from '@/api/models/cms/Page/Body'
import {
  AccompanyingPointArray,
  AccompanyingPointObject,
  DataFilters,
  GeographyFilters,
  ThresholdFilters,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'

import { FlatOption, GroupedOption } from '../components/ui/ukhsa/MultiselectDropdown/MultiselectDropdown'
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

  // Usage: Extracts each of the filter types that are provided in the rows
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

  // Usage: Time Period Extraction
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
/* Usage: This function is used to retrieve each of the geography types that are present in the provided geography filters */
export function extractGeographyIdFromGeographyFilter(geographyFilter: GeographyFilters | null): string[] {
  if (!geographyFilter) return []
  return geographyFilter.geography_types.map((filter) => filter.value.geography_type)
}

export interface FlattenedAccompanyingPoint {
  label_prefix: string
  label_suffix: string
  parameters: Record<string, string>
}

export function getAccompanyingPoints(accompanyingPoints: AccompanyingPointArray): FlattenedAccompanyingPoint[] {
  const flattenedAccompanyingPoints = [] as FlattenedAccompanyingPoint[]
  accompanyingPoints.map((point: AccompanyingPointObject) => {
    const transformedParameters: Record<string, string> = {}

    point.value.parameters.map((param) => {
      // Use the parameter's type as the key and the nested value as the value
      transformedParameters[param.type] = param.value.value
    })
    flattenedAccompanyingPoints.push({
      label_prefix: point.value.label_prefix,
      label_suffix: point.value.label_suffix,
      parameters: transformedParameters,
    })
  })

  return flattenedAccompanyingPoints
}

export function getGroupedVaccinationOptions(vaccinationFilters: DataFilters): GroupedOption[] | null {
  if (!vaccinationFilters) {
    return null
  }
  const { data_filters, categories_to_group_by } = vaccinationFilters
  const primaryGroupCategory = categories_to_group_by[0]?.value.data_category
  const secondaryGroupCategory = categories_to_group_by[1]?.value.data_category

  if (!primaryGroupCategory || !secondaryGroupCategory) {
    throw new Error('Both primary and secondary group categories must be provided')
  }

  const groupedData = new Map<string, FlatOption[]>()

  data_filters.forEach((dataFilter) => {
    const { parameters, label } = dataFilter.value

    // Get the primary group key (e.g., stratum)
    const primaryGroupKey =
      parameters[primaryGroupCategory as keyof typeof parameters]?.label ||
      parameters[primaryGroupCategory as keyof typeof parameters]?.value ||
      'Unknown'

    // Initialize the group if it doesn't exist
    if (!groupedData.has(primaryGroupKey)) {
      groupedData.set(primaryGroupKey, [])
    }

    // Add the item to the appropriate group
    groupedData.get(primaryGroupKey)!.push({
      label: label,
      id: `${dataFilter.type}-${dataFilter.id}`,
    })
  })

  const result: GroupedOption[] = Array.from(groupedData.entries()).map(([title, children]) => ({
    title,
    children,
  }))

  return result
}
