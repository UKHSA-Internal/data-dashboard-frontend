import { Key } from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Announcement, View } from '@/app/components/ui/ukhsa'
import { BannerVariant } from '@/app/components/ui/ukhsa/GlobalBanner/GlobalBanner'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '@/app/components/ui/ukhsa/View/LastUpdated/LastUpdated'
import { PageComponentBaseProps } from '@/app/types'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

import { RichTextAutoHeadings } from '../RichText/RichTextAutoHeadings'

export default async function CompositePage({ slug }: PageComponentBaseProps) {
  const {
    title,
    body,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    announcements,
  } = await getPageBySlug<PageType.Common | PageType.Composite>(slug)

  const hasAnnouncements = announcements && announcements.length > 0

  return (
    <View>
      {hasAnnouncements && // Render announcements if they exist
        announcements.map(
          (announcement: { id: Key | null | undefined; banner_type: BannerVariant; title: string; body: string }) => {
            return (
              <Announcement
                key={announcement.id}
                variant={announcement.banner_type}
                heading={announcement.title}
                className="govuk-!-margin-bottom-4"
              >
                {announcement.body}
              </Announcement>
            )
          }
        )}

      <Heading heading={title} />
      <LastUpdated lastUpdated={lastUpdated} />
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
