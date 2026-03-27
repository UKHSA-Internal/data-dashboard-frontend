import { getApiBaseUrl } from '@/api/requests/helpers'

export const getMetrics = async () => {
  const url = `${getApiBaseUrl()}/telemetry/metrics/`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch metrics')
  }

  return res.text()
}