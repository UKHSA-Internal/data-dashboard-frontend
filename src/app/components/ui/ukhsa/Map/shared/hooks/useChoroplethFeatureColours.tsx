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
