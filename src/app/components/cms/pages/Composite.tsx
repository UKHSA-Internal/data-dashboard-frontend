import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichTextAutoHeadings } from '@/app/components/cms/RichText/RichTextAutoHeadings'
import { RelatedLink as RelatedLinkV1, RelatedLinks as RelatedLinksV1, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { PageComponentBaseProps } from '@/app/types'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

import {
  RelatedLink as RelatedLinkV2,
  RelatedLinks as RelatedLinksV2,
} from '../../ui/ukhsa/RelatedLinks/v2/RelatedLinks'

export default async function CompositePage({ slug }: PageComponentBaseProps) {
  const {
    title,
    body,
    last_published_at: lastPublishedAt,
    last_updated_at: lastUpdatedAt,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.Common | PageType.Composite>(slug)

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)
  const { enabled: newTimestampEnabled } = await getFeatureFlag(flags.newTimestamp)

  return (
    <View heading={title} lastUpdated={newTimestampEnabled ? lastUpdatedAt : lastPublishedAt}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {typeof body === 'string' ? (
            <RichTextAutoHeadings>{body}</RichTextAutoHeadings>
          ) : (
            body.map(renderCompositeBlock)
          )}
        </div>
      </div>

      {newLandingContentEnabled ? (
        <RelatedLinksV2 variant="footer">
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLinkV2 key={id} url={url} title={title}>
              {body}
            </RelatedLinkV2>
          ))}
        </RelatedLinksV2>
      ) : (
        <RelatedLinksV1 variant="footer">
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLinkV1 key={id} url={url} title={title}>
              {body}
            </RelatedLinkV1>
          ))}
        </RelatedLinksV1>
      )}
    </View>
  )
}
