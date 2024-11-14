import { renderSection } from '@/app/utils/cms.utils'
import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { View } from '../../ui/ukhsa/View/View'
import { getLandingPage } from '@/app/utils/cms'

export default async function HomePage() {
  const [{ body }] = await Promise.all([getLandingPage()])

  return (
    <View heading="" description="">
      {body.map(renderSection)}
    </View>
  )
}
