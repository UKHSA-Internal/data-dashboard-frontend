import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

import { View } from '../../ui/ukhsa/View/View'

export default async function HomePage() {
  const [{ body }] = await Promise.all([getLandingPage()])

  return (
    <View heading="" description="">
      {body.map(renderSection)}
    </View>
  )
}
