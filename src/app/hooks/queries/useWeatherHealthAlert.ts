import { useSuspenseQuery } from '@tanstack/react-query'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { getHealthAlertByRegion } from '@/api/requests/health-alerts/getHealthAlertByRegion'

interface WeatherHealthAlertProps {
  type: HealthAlertTypes
  regionId: string
}

export default function useWeatherHealthAlert({ type, regionId }: WeatherHealthAlertProps) {
  return useSuspenseQuery({
    queryKey: ['weather-alert', type, regionId],
    queryFn: async () => getHealthAlertByRegion(type, regionId),
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
