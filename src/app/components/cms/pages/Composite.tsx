import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichTextAutoHeadings } from '@/app/components/cms/RichText/RichTextAutoHeadings'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export default async function CompositePage({ slug }: PageComponentBaseProps) {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.Common | PageType.Composite>(slug)

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
