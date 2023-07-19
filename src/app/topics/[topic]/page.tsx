import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { renderCard } from '@/app/utils/cms.utils'

import { Contents, ContentsItem, View } from '../../components/ui/ukhsa'

export const revalidate = 3600 // revalidate every hour

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  if (typeof process.env.CI !== 'undefined') return {} // Avoid requests in CI due to IP Restrictions

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function TopicPage({ params: { topic } }: { params: { topic: string } }) {
  if (typeof process.env.CI !== 'undefined') return null // Avoid requests in CI due to IP Restrictions

  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
  } = await getPageBySlug(topic, PageType.Topic)

  return (
    <View heading={title} description={description} lastUpdated={lastUpdated}>
      <Contents>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            {value.content.map(renderCard)}
          </ContentsItem>
        ))}
      </Contents>
    </View>
  )
}
