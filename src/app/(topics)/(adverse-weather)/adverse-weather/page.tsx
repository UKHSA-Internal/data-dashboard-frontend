import { flag } from '@unleash/nextjs'

import { flags } from '@/app/constants/flags.constants'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

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

export default async function AdverseWeather() {
  return <div>Adverse weahter page</div>
}
