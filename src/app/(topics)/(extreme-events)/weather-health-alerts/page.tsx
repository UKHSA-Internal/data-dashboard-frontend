import { View } from '@/app/components/ui/ukhsa/View/View'
import WeatherHealthAlertsLink from '@/app/components/ui/ukhsa/WeatherHealthAlertsLink/WeatherHealthAlertsLink'

export default async function Page() {
  return (
    <View heading="Weather health alerts">
      <p>This will be the root topic page for weather health alerts</p>
      <WeatherHealthAlertsLink />
    </View>
  )
}
