import { useSuspenseQuery } from '@tanstack/react-query'

import { MapDataRequest } from '@/api/models/Maps'
import { postMapData } from '@/api/requests/cover-maps/postMaps'

export default function useMapData(request: MapDataRequest) {
  return useSuspenseQuery({
    queryKey: ['map-data'],
    queryFn: async () => postMapData(request),
    select(data) {
      if (data.success) {
        return data.data
      }
      return undefined
    },
  })
}
