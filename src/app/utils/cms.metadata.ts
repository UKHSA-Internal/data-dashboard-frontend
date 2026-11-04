import type { Metadata } from 'next'

import { PageParams, SearchParams } from '@/app/types'
import { getPageMetadata, getPageTypeBySlug } from '@/app/utils/cms'

export async function generateCmsMetadata(props: {
  params: Promise<PageParams>
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const params = await props.params
  const { slug = [] } = params
  const slugPath = slug?.join('/') || ''

  // isAssetPath logic inlined here for metadata
  if (/\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|css|js)$/i.test(slugPath)) {
    return {}
  }

  const pageType = await getPageTypeBySlug(slug)
  return await getPageMetadata(slug, searchParams, pageType)
}
