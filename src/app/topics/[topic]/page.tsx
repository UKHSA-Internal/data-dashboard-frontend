import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { renderCard } from '@/app/utils/cms.utils'

import { Contents, ContentsItem, RelatedLink, RelatedLinks, View } from '../../components/ui/ukhsa'

// Good to know: The new model in the app directory favors granular caching control at the fetch request level
// over the binary all-or-nothing model of getServerSideProps and getStaticProps at the page-level in the pages directory.
// The dynamic option is a way to opt back in to the previous model as a convenience and provides a simpler migration path.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function TopicPage({ params: { topic } }: { params: { topic: string } }) {
  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
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
      {relatedLinks.length && (
        <RelatedLinks>
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLink key={id} url={url} title={title}>
              {body}
            </RelatedLink>
          ))}
        </RelatedLinks>
      )}
    </View>
  )
}
