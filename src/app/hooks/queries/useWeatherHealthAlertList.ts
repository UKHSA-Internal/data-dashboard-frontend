import { useSuspenseQuery } from '@tanstack/react-query'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import { mapQueryKeys } from '@/app/constants/map.constants'

export default function useWeatherHealthAlertList() {
  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  return useSuspenseQuery({
    queryKey: ['weather-alert-list', category],
    queryFn: async () => getHealthAlerts(category),
    select(data) {
      if (data.success) {
        return data.data
      }
    },
  })
}
