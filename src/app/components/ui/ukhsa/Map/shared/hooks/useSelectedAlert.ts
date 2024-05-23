import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { HealthAlert, HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlertByRegion } from '@/api/requests/health-alerts/getHealthAlertByRegion'
import { mapQueryKeys } from '@/app/constants/map.constants'

export const useSelectedAlert = () => {
  const [alert, setAlert] = useState<HealthAlert | null>(null)

  const [selectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  // Client-side requests in useEffects are icky. This is a temporary solution until we
  // implement a client-side data fetching & caching library such as react-query
  // TODO: Refactor this to use react-query
  useEffect(() => {
    const getAlert = async (id: string) => {
      const alert = await getHealthAlertByRegion(category, id)
      if (alert.success) {
        setAlert(alert.data)
      }
    }
    if (selectedFeatureId) {
      getAlert(selectedFeatureId)
    }
  }, [category, selectedFeatureId])

  return alert
}
