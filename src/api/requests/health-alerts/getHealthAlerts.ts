import { SafeParseError, SafeParseSuccess } from 'zod'

import { HealthAlertList, HealthAlertTypes } from '@/api/models/Alerts'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

export type GetHealthAlertsResponse = SafeParseError<HealthAlertList> | SafeParseSuccess<HealthAlertList>

// This endpoint is called from our Map UI which is a client component therefore we must
// proxy the request to the API through NextJs. For RSC's we can call the backend API directly
export const getHealthAlerts = async (type: HealthAlertTypes) => {
  try {
    const path = isSSR ? `alerts/v1` : `proxy/alerts/v1`
    const { data } = await client<HealthAlertList>(`${path}/${type}`)
    const result = HealthAlertList.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getHealthAlerts Parsing Error: ${result.error}`)
      return HealthAlertList.safeParse(result.error)
    }
  } catch (error) {
    logger.error(error)
    return HealthAlertList.safeParse(error)
  }
}
