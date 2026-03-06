import { Announcements, View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  const processedSectionParams = processSectionParams(section)
  const { body, active_announcements: activeAnnouncements } = await getLandingPage()

  const {
    title,
    body,
    page_description: pageDescription,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    last_published_at: lastPublishedAt,
    active_announcements: activeAnnouncements,
  } = await getLandingPage()

  const hasRelatedLinks = Boolean(relatedLinks?.length)
  const showSidebarRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Sidebar'
  const showFooterRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Footer'

  return (
    <View>
      <div className="govuk-grid-row">
        <div
          className={
            showSidebarRelatedLinks ? 'govuk-grid-column-three-quarters-from-desktop' : 'govuk-grid-column-full'
          }
        >
          <Heading heading={title} lastUpdated={lastPublishedAt} />
          <LastUpdated lastUpdated={lastPublishedAt} />
          <Announcements announcements={activeAnnouncements} />
          {pageDescription ? <Description description={pageDescription} /> : null}
        </div>

        {showSidebarRelatedLinks ? (
          <div className="govuk-grid-column-one-quarter-from-desktop sticky top-2">
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks ?? []} />
          </div>
        ) : null}
      </div>

      <Contents>
        {body.map(({ id, value }) => (
          <ContentsLink key={id} href={`#${kebabCase(value.heading)}`}>
            {value.heading}
          </ContentsLink>
        ))}
      </Contents>

      {body.map(renderSection.bind(null, processedSectionParams))}

      {showFooterRelatedLinks ? <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks ?? []} /> : null}
    </View>
  )
}
