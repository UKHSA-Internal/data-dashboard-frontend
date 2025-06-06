import { Announcements, View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  let processedSectionParams: string[] = []

  if (section) {
    processedSectionParams = processedParams(section)
  }
  const { body, active_announcements: activeAnnouncements } = await getLandingPage()

  return (
    <View>
      <Announcements announcements={activeAnnouncements} />
      {body.map(renderSection.bind(null, processedSectionParams))}
    </View>
  )
}

const processedParams = (value: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(value).map((section) => section.toLowerCase())
}
