import { useSuspenseQuery } from '@tanstack/react-query'
import { postMapData } from '@/api/requests/cover-maps/postMaps'
import { MapDataResponse } from '@/api/models/Maps'
import { toSlug } from '../utils/string'

export default function useMapData({ request }: MapDataRequest) {
  return useSuspenseQuery({
    queryKey: ['map-data', request.topic],
    queryFn: async () => postMapData(request),
    select(data) {
      if (data.success) {
        return data.data.map((geography) => ({
          ...geography,
          slug: toSlug(geography.geography_name),
        }))
      }
    },
  })
}
