import { MapDataRequest, MapDataResponse } from '@/api/models/Maps'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const postMapData = async (request: MapDataRequest, isPublic?: boolean) => {
  // Only append isPublic param when explicitly false (non-public pages)
  // undefined or true = public page, no need to pass JWT
  const publicParam = isPublic === false ? '?isPublic=false' : ''
  try {
    const path = isSSR ? `maps/v1` : `proxy/maps/v1${publicParam}`
    const { data } = await client<MapDataResponse>(
      `${path}`,
      {
        body: request,
      },
      isPublic
    )
    const result = MapDataResponse.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`PostMaps Parsing Error: ${result.error}`)
      return MapDataResponse.safeParse({ data: [], latest_date: '' })
    }
  } catch (error) {
    logger.error(error)
    return MapDataResponse.safeParse({ data: [], latest_date: '' })
  }
}
