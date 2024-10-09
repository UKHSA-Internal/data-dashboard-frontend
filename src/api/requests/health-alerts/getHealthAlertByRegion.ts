import { HealthAlert, HealthAlertTypes } from '@/api/models/Alerts'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const getHealthAlertByRegion = async (type: HealthAlertTypes, region: string) => {
  try {
    const path = isSSR ? `alerts/v1` : `proxy/alerts/v1`
    const { data } = await client<HealthAlert>(`${path}/${type}/${region}`, {
      cache: 'no-store',
    })
    return HealthAlert.safeParse(data)
  } catch (error) {
    logger.error(error)
    return HealthAlert.safeParse(error)
  }
}
