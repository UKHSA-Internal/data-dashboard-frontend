import { useSuspenseQuery } from '@tanstack/react-query'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import { toSlug } from '@/app/utils/app.utils'

interface WeatherHealthAlertListProps {
  type: HealthAlertTypes
}

export default function useWeatherHealthAlertList({ type }: WeatherHealthAlertListProps) {
  return useSuspenseQuery({
    queryKey: ['weather-alert-list', type],
    queryFn: async () => getHealthAlerts(type),
    select(data) {
      if (data.success) {
        return data.data.map((geography) => ({
          ...geography,
          slug: toSlug(geography.geography_name),
        }))
      }
    },
  })
}
