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

export type MapAccompanyingPointList = z.infer<typeof MapAccompanyingPointList>
export type MapDataList = z.infer<typeof MapDataList>
export type MapDataResponse = z.infer<typeof MapDataResponse>
