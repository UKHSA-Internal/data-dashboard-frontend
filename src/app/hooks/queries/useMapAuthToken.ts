import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { MapTileProvider } from '@/app/types'

const PROXY_ENDPOINT = 'api/proxy/map'
const RETRY_ATTEMPTS = 1

const proxyResponseSchema = z.object({ token: z.string(), expiresIn: z.string() })

async function getToken(provider: MapTileProvider) {
  const req = await fetch(PROXY_ENDPOINT, { method: 'POST', body: JSON.stringify({ provider }) })
  const res = await req.json()
  return proxyResponseSchema.parse(res)
}

export default function useMapAuthToken(provider: MapTileProvider) {
  const queryClient = useQueryClient()

  return useSuspenseQuery({
    queryKey: ['weather-alert', 'map-auth-token'],
    queryFn: async () => getToken(provider),
    retry: RETRY_ATTEMPTS,
    refetchInterval: (query) => {
      // Extract the token expiration time (in seconds) and set the query refetch interval
      const queryData = proxyResponseSchema.safeParse(queryClient.getQueryData(query.queryKey))
      if (queryData.success) {
        return Number(queryData.data.expiresIn) * 1000 // Convert to milliseconds
      }
      return false
    },
  })
}
