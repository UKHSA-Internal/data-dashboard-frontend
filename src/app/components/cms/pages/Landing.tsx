import { View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage({
  slug,
  searchParams: { section, showMore },
}: PageComponentBaseProps<{ section?: string; showMore?: string }>) {
  console.log('showMore value:', showMore)
  console.log('region value:', section)
  const { body } = await getLandingPage()
  body.map(({value}) => console.log(JSON.stringify(value.content)))

  return <View>{body.map(({ id, value, type }) => renderSection({ id, value, type }, showMore, section))}</View>
}
