import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichTextAutoHeadings } from '@/app/components/cms/RichText/RichTextAutoHeadings'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

// Our dynamic routes can be of two different cms page types (common or composite)
type DynamicPageType = PageType.Common | PageType.Composite

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug<DynamicPageType>(slug)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function CommonPage({ params: { slug } }: { params: { slug: string } }) {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug<DynamicPageType>(slug)

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {typeof body === 'string' ? (
            <RichTextAutoHeadings>{body}</RichTextAutoHeadings>
          ) : (
            body.map(renderCompositeBlock)
          )}
        </div>
      </div>

      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
