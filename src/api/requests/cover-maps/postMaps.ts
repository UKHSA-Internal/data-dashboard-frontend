import { SafeParseError, SafeParseSuccess, z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'
import { MapDataList, MapDataResponse } from '@/api/models/Maps'

export type GetMapDataResponse = SafeParseError<MapDataList> | SafeParseSuccess<MapDataList>

export const MapRequestParams = z.object({
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

export type MapRequestParams = z.infer<typeof MapRequestParams>

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const postMapData = async (request: MapRequestParams) => {
  try {
    const path = isSSR ? `maps/v1` : `proxy/maps/v1`
    const { data } = await client<MapDataList>(`${path}`, {
      body: request,
    })
    return MapDataResponse.safeParse(data)
  } catch (error) {
    logger.error(error)
    return MapDataList.safeParse(error)
  }
}
