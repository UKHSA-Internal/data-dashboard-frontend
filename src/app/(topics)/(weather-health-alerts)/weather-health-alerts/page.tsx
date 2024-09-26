import { View } from '@/app/components/ui/ukhsa/View/View'

export const dynamic = 'force-dynamic'

export default async function WeatherHealthAlerts() {
  return (
    <View heading={'WHA L1'} breadcrumbs={[{ name: 'Home', link: '/' }]}>
      Content
    </View>
  )
}
