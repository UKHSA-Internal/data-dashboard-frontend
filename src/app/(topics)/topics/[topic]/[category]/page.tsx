import { capitalize } from 'lodash'
import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { View } from '@/app/components/ui/ukhsa'
import { renderCard } from '@/app/utils/cms.utils'

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function TopicPage({
  params: { topic, category },
  searchParams,
}: {
  params: { topic: string; category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { title, body, last_published_at: lastUpdated } = await getPageBySlug(topic, PageType.Topic)

  const { geography = '' } = searchParams

  return (
    <View
      heading={`${title} ${capitalize(category)} in ${geography}`}
      lastUpdated={lastUpdated}
      backLink={`/topics/${topic}`}
    >
      {/* <Details label="COVID-19 in England">region selector</Details> */}
      {body.map(({ id, value }) =>
        value.heading.toLowerCase() === category ? value.content.map((card) => renderCard(card, searchParams)) : null
      )}
    </View>
  )
}
