import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

import { View } from '../components/ui/ukhsa'
import { renderSection } from '../utils/cms.utils'

export const revalidate = 3600 // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  if (process.env.CI) return {}

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)
  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function HomePage() {
  if (process.env.CI) return null

  const { title, body, page_description: description } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return (
    <View heading={title} description={description} showWelcome>
      {body.map(renderSection)}
    </View>
  )
}
