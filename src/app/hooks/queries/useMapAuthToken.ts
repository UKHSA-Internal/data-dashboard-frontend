import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

const PROXY_ENDPOINT = 'api/proxy/map'
const RETRY_ATTEMPTS = 1

const proxyResponseSchema = z.object({ token: z.string(), expiresIn: z.string() })

async function getToken() {
  const req = await fetch(PROXY_ENDPOINT, { method: 'POST' })
  const res = await req.json()
  return proxyResponseSchema.parse(res)
}

export default function useMapAuthToken() {
  const queryClient = useQueryClient()

  return useSuspenseQuery({
    queryKey: ['weather-alert', 'map-auth-token'],
    queryFn: getToken,
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
