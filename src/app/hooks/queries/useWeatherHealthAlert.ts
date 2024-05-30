import { useSuspenseQuery } from '@tanstack/react-query'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlertByRegion } from '@/api/requests/health-alerts/getHealthAlertByRegion'
import { mapQueryKeys } from '@/app/constants/map.constants'

export default function useWeatherHealthAlert() {
  const [selectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString.withDefault(''))

  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  return useSuspenseQuery({
    queryKey: ['weather-alert', category, selectedFeatureId],
    queryFn: async () => getHealthAlertByRegion(category, selectedFeatureId),
    select(data) {
      if (data.success) {
        const {
          geography_name: regionName,
          status,
          text,
          refresh_date: lastUpdated,
          period_start: firstPublished,
          period_end: expiryDate,
        } = data.data

        return {
          regionName,
          status,
          text,
          lastUpdated,
          firstPublished,
          expiryDate,
        }
      }
    },
  })
}
