import { HealthAlertList, HealthAlertTypes } from '@/api/models/Alerts'
import { logger } from '@/lib/logger'

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const getHealthAlerts = async (type: HealthAlertTypes) => {
  return ''
  try {
    const isSSR = typeof window === 'undefined'
    const path = isSSR ? `alerts/v1` : `proxy/alerts/v1`
    const { data } = await client<HealthAlertList>(`${path}/${type}`)
    return HealthAlertList.safeParse(data)
  } catch (error) {
    logger.error(error)
    return HealthAlertList.safeParse(error)
  }
}
