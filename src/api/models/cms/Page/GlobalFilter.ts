import { z } from 'zod'

const TimePeriodSchema = z.object({
  id: z.string(),
  value: z.object({
    label: z.string(),
    date_from: z.string(),
    date_to: z.string(),
  }),
  type: z.literal('time_period'),
})

export const TimeRangeSchema = z.object({
  title: z.string(),
  time_periods: z.array(TimePeriodSchema),
})

const GeographyFilter = z.object({
  type: z.literal('geography_filter'),
  value: z.object({
    label: z.string(),
    colour: z.string(),
    geography_type: z.string(),
  }),
  id: z.string(),
})

const ThresholdFilter = z.object({
  type: z.literal('threshold'),
  value: z.object({
    label: z.string(),
    colour: z.string(),
    boundary_minimum_value: z.number(),
    boundary_maximum_value: z.number(),
  }),
  id: z.string(),
})

const Parameter = z.object({
  label: z.string(),
  value: z.string(),
})

const DataFilterParameters = z.object({
  theme: Parameter,
  sub_theme: Parameter,
  topic: Parameter,
  stratum: Parameter,
  metric: Parameter,
  age: Parameter,
  sex: Parameter,
})

const AccompanyingPoint = z.object({
  label_prefix: z.string(),
  label_suffix: z.string(),
  parameters: z.array(
    z.object({
      type: z.string(),
      value: Parameter,
      id: z.string(),
    })
  ),
})

const DataFilter = z.object({
  type: z.literal('data_filter'),
  value: z.object({
    label: z.string(),
    colour: z.string(),
    parameters: DataFilterParameters,
    accompanying_points: z.array(
      z.object({
        type: z.literal('accompanying_point'),
        value: AccompanyingPoint,
        id: z.string(),
      })
    ),
  }),
  id: z.string(),
})

const GeographyFilters = z.object({
  geography_types: z.array(GeographyFilter),
})

const DataFilters = z.object({
  label: z.string(),
  data_filters: z.array(DataFilter),
  categories_to_group_by: z.array(
    z.object({
      type: z.literal('category'),
      value: z.object({
        data_category: z.string(),
      }),
      id: z.string(),
    })
  ),
})

const ThresholdFilters = z.object({
  label: z.string(),
  thresholds: z.array(ThresholdFilter),
})

const GlobalFilters = z.object({
  type: z.string(),
  value: z.union([ThresholdFilters, DataFilters, GeographyFilters]),
  id: z.string(),
})

const GlobalFilterRowItem = z.object({
  title: z.string(),
  filters: z.array(GlobalFilters),
})

const VaccinationSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.string(),
})

export const GlobalFilterRow = z.array(
  z.object({
    type: z.literal('row'),
    value: GlobalFilterRowItem,
    id: z.string(),
  })
)

export type TimePeriod = z.infer<typeof TimePeriodSchema>
export type TimeRange = z.infer<typeof TimeRangeSchema>
export type GeographyFilter = z.infer<typeof GeographyFilter>
export type ThresholdFilter = z.infer<typeof ThresholdFilter>
export type Parameter = z.infer<typeof Parameter>
export type DataFilterParameters = z.infer<typeof DataFilterParameters>
export type AccompanyingPoint = z.infer<typeof AccompanyingPoint>
export type DataFilter = z.infer<typeof DataFilter>
export type GeographyFilters = z.infer<typeof GeographyFilters>
export type DataFilters = z.infer<typeof DataFilters>
export type ThresholdFilters = z.infer<typeof ThresholdFilters>
export type GlobalFilters = z.infer<typeof GlobalFilters>
export type GlobalFilterRowItem = z.infer<typeof GlobalFilterRowItem>
export type GlobalFilterRow = z.infer<typeof GlobalFilterRow>
