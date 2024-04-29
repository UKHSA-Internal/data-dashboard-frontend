import { flag } from '@unleash/nextjs'
import { notFound } from 'next/navigation'

import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

export default async function WeatherHealthAlert() {
  const { enabled } = await flag(flags.extremeEvents)

  if (!enabled) notFound()

  return (
    <View heading="Health alerts">
      <div>Health alerts page</div>
    </View>
  )
}
