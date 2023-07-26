import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

import { RelatedLink, RelatedLinks, View } from './components/ui/ukhsa'
import { renderSection } from './utils/cms.utils'

// Good to know: The new model in the app directory favors granular caching control at the fetch request level
// over the binary all-or-nothing model of getServerSideProps and getStaticProps at the page-level in the pages directory.
// The dynamic option is a way to opt back in to the previous model as a convenience and provides a simpler migration path.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function HomePage() {
  const {
    title,
    body,
    page_description: description,
    related_links: relatedLinks,
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return (
    <View heading={title} description={description} showWelcome>
      {body.map(renderSection)}
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
