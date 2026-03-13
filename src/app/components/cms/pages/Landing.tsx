import { Announcements, View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  const processedSectionParams = processSectionParams(section)
  const { body, active_announcements: activeAnnouncements } = await getLandingPage()

  return (
    <View>
      <Announcements announcements={activeAnnouncements} />
      {body.map(renderSection.bind(null, processedSectionParams))}
    </View>
  )
}
