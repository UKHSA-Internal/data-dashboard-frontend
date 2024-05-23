import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { type HealthAlertStatus, type HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import { mapQueryKeys } from '@/app/constants/map.constants'

export const useChoroplethFeatureColours = () => {
  const [featureColours, setFeatureColours] = useState<Record<string, HealthAlertStatus> | null>(null)
  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  // Client-side requests in useEffects are icky. This is a temporary solution until we
  // implement a client-side data fetching & caching library such as react-query
  // TODO: Refactor this to use react-query
  useEffect(() => {
    const getAlerts = async () => {
      const alerts = await getHealthAlerts(category)
      if (!alerts.success) return
      const mappedAlertsToFeatureColours = Object.fromEntries(
        alerts.data.map((alert) => [alert.geography_code, alert.status])
      )
      setFeatureColours(mappedAlertsToFeatureColours)
    }
    getAlerts()
  }, [category])

  return featureColours
}
