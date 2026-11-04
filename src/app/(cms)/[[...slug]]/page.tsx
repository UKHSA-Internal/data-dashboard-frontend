import { PageParams, SearchParams } from '@/app/types'
import { renderCmsPage } from '@/app/utils/cms/renderCmsPage'

export { generateCmsMetadata as generateMetadata } from '@/app/utils/cms.metadata'

// Renders a published page.
export default async function PublishedPage(props: {
  params: Promise<PageParams>
  searchParams: Promise<SearchParams>
}) {
  return renderCmsPage(props)
}
