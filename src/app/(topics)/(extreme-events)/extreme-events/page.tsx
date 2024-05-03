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
    title: 'Extreme events category page',
    description: 'Extreme events category page description',
  }
}

export default async function ExtremeEvents() {
  return (
    <View heading="Extreme events">
      <div>Extreme events parent page</div>
    </View>
  )
}
