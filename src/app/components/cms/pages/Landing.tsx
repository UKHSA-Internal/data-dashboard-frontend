import { View } from '@/app/components/ui/ukhsa'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage() {
  const { body } = await getLandingPage()

  return <View>{body.map(renderSection)}</View>
}
