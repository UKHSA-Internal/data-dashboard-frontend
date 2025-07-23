import { z } from 'zod'

export const MapAccompanyingPointList = z.array(
  z.object({
    label_prefix: z.string(),
    label_suffix: z.string(),
    metric_value: z.number().nullable(),
  })
)

export const MapDataList = z.array(
  z.object({
    geography_code: z.string(),
    geography_type: z.string(),
    geography: z.string(),
    metric_value: z.number(),
    accompanying_points: MapAccompanyingPointList,
  })
)

export const MapDataResponse = z.object({
  data: MapDataList,
  latest_date: z.string(),
})

export const MapDataRequest = z.object({
  date_from: z.string(),
  date_to: z.string(),
  parameters: z.object({
    theme: z.string(),
    sub_theme: z.string(),
    topic: z.string(),
    metric: z.string(),
    stratum: z.string(),
    age: z.string(),
    sex: z.string(),
    geography_type: z.string(),
    geographies: z.array(z.string()),
  }),
  accompanying_points: z.array(
    z.object({
      label_prefix: z.string(),
      label_suffix: z.string(),
      parameters: z.object({
        metric: z.string(),
        geography_type: z.string(),
        geography: z.string(),
      }),
    })
  ),
})

export type MapAccompanyingPointList = z.infer<typeof MapAccompanyingPointList>
export type MapDataList = z.infer<typeof MapDataList>
export type MapDataResponse = z.infer<typeof MapDataResponse>
export type MapDataRequest = z.infer<typeof MapDataRequest>
