import { View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage({
  slug,
  searchParams: { section, showMore },
}: PageComponentBaseProps<{ section?: string; showMore?: string }>) {
  let processedSectionParams: string[] = []
  console.log('showMore value:', showMore)
  if (section) {
    processedSectionParams = processedParams(section)
  }
  console.log('processedParams', processedSectionParams)
  console.log('region value:', section)
  const { body } = await getLandingPage()
  // body.map(({ value }) => console.log(JSON.stringify(value.content)))

  return <View>{body.map(({ id, value, type }) => renderSection({ id, value, type }, processedSectionParams))}</View>
}

const processedParams = (v: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(v).map((section) => section.toLowerCase())
}
