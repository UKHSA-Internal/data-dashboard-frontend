import { View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage({
  slug,
  searchParams: { section },
}: PageComponentBaseProps<{ section?: string }>) {
  let processedSectionParams: string[] = []

  if (section) {
    processedSectionParams = processedParams(section)
  }
  const { body } = await getLandingPage()

  return <View>{body.map(({ id, value, type }) => renderSection({ id, value, type }, processedSectionParams))}</View>
}

const processedParams = (v: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(v).map((section) => section.toLowerCase())
}
