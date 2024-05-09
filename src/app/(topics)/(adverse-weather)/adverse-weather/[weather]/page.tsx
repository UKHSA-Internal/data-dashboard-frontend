import { flag } from '@unleash/nextjs'

import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found',
      description: 'Error - Page not found',
    }

  return {
    title: 'Health alerts page',
    description: 'Health alerts page description',
  }
}

export default async function WeatherHealthAlert() {
  return (
    <View heading="Health alerts">
      <div>Health alerts page</div>
    </View>
  )
}
