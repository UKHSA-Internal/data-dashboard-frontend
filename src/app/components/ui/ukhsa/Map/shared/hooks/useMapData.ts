import { useSuspenseQuery } from '@tanstack/react-query'
import { postMapData } from '@/api/requests/cover-maps/postMaps'
import { MapDataResponse } from '@/api/models/Maps'
import { toSlug } from '@/app/utils/app.utils'

export default function useMapData(request: MapDataRequest) {
  console.log('request: ', request)
  return useSuspenseQuery({
    queryKey: ['map-data'],
    queryFn: async () => postMapData(request),
    select(data) {
      console.log('data: ', data.data)
      if (data.success) {
        return data.data
      }
    },
  })
}
