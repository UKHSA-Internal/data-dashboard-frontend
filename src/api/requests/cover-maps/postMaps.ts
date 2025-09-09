import { MapDataRequest, MapDataResponse } from '@/api/models/Maps'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const postMapData = async (request: MapDataRequest) => {
  try {
    console.log('isSSR: ', isSSR)
    const path = isSSR ? `maps/v1` : `proxy/maps/v1`
    const { data } = await client<MapDataResponse>(`${path}`, {
      body: request,
    })
    return MapDataResponse.safeParse(data)
  } catch (error) {
    logger.error(error)
    return MapDataResponse.safeParse({ data: [], latest_date: '' })
  }
}
