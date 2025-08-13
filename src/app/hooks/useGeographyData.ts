import { useSuspenseQuery } from '@tanstack/react-query'

import { GeographyParams, getGeographies } from '@/api/requests/geographies/getGeographies'

export default function useGeographyData(request: GeographyParams) {
  return useSuspenseQuery({
    queryKey: ['geography-data'],
    queryFn: async () => getGeographies(request),
    select(data) {
      console.log('data: ', data)
      if (data.success) {
        return data
      }
      return undefined
    },
  })
}
