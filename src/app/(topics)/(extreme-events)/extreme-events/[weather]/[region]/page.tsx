import { flag } from '@unleash/nextjs'

import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

export async function generateMetadata() {
  const { enabled } = await flag(flags.extremeEvents)

  if (!enabled)
    return {
      title: 'Page not found',
      description: 'Error - Page not found',
    }

  return {
    title: 'Weather health alert page',
    description: 'Weather health alert description',
  }
}

export default async function Alert() {
  return (
    <View heading="Weather alert for East Midlands">
      <div>Weather health alert info page</div>
    </View>
  )
}
