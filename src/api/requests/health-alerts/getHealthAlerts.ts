import { HealthAlertList, HealthAlertTypes } from '@/api/models/Alerts'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const getHealthAlerts = async (type: HealthAlertTypes) => {
  try {
    const path = isSSR ? `alerts/v1` : `proxy/alerts/v1`
    const res = await fetch(`${getApiBaseUrl()}/${path}/${type}`, {
      headers: { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' },
      cache: 'no-cache',
    })
    const data = await res.json()
    return HealthAlertList.safeParse(data)
  } catch (error) {
    logger.error(error)
    return HealthAlertList.safeParse(error)
  }
}
