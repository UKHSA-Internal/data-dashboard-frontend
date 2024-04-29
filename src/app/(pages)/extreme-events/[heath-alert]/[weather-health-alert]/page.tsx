import { flag } from '@unleash/nextjs'
import { notFound } from 'next/navigation'

import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

export default async function WeatherAlert() {
  const { enabled } = await flag(flags.extremeEvents)

  if (!enabled) notFound()

  return (
    <View heading="Weather alert for East Midlands">
      <div>Weather health alert info page</div>
    </View>
  )
}
