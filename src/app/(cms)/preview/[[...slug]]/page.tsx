import type { Metadata } from 'next'

import { PageParams, SearchParams } from '@/app/types'
import { renderCmsPage } from '@/app/utils/cms/renderCmsPage'

import { generateCmsMetadata } from '../../metadata'

// /preview route is ALWAYS uncached
export const dynamic = 'force-dynamic'

export async function generateMetadata(props: {
  params: Promise<PageParams>
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  return generateCmsMetadata(props)
}

export default async function PreviewPage(props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }) {
  return renderCmsPage(props)
}
