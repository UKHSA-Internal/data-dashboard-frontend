import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

const PROXY_ENDPOINT = 'api/proxy/map'
const RETRY_ATTEMPTS = 1

const proxyResponseSchema = z.object({ token: z.string(), expiresIn: z.string() })

async function getToken() {
  const req = await fetch(PROXY_ENDPOINT, { method: 'POST' })
  const res = await req.json()
  const { token } = proxyResponseSchema.parse(res)
  return token
}

export default function useEsriMapAuthToken() {
  return useSuspenseQuery({
    queryKey: ['weather-alert', 'esri-auth-token'],
    queryFn: getToken,
    retry: RETRY_ATTEMPTS,
  })
}
