import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichTextAutoHeadings } from '@/app/components/cms/RichText/RichTextAutoHeadings'
import { View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'

export default async function CompositePage({ slug }: PageComponentBaseProps) {
  const {
    title,
    body,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
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

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-2 sticky top-2">
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
          </div>
        ) : null}
      </div>

      {relatedLinksLayout === 'Footer' ? (
        <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
      ) : null}
    </View>
  )
}
