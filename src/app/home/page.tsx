import { Metadata } from 'next'

import { initMocks } from '@/api/msw'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

import { Wrapper } from '../components/ui/ukhsa'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)
  return {
    title,
    description,
  }
}

async function getPage() {
  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks = [],
    meta,
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return {
    title,
    body,
    description,
    lastUpdated,
    relatedLinks,
    meta,
  }
}

export default async function Page() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    initMocks()
  }

  const page = await getPage()

  const { title, description, lastUpdated } = page

  return (
    <Wrapper heading={title} description={description} lastUpdated={lastUpdated}>
      <div>WIP</div>
    </Wrapper>
  )
}
