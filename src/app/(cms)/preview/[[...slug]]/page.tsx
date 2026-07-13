import { PageParams, SearchParams } from '@/app/types'
import { renderCmsPage } from '@/app/utils/cms/renderCmsPage'

export { generateCmsMetadata as generateMetadata } from '@/app/utils/cms.metadata'

// /nocache route is ALWAYS uncached
export const dynamic = 'force-dynamic'

export default async function PreviewPage(props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }) {
  return renderCmsPage(props)
}
