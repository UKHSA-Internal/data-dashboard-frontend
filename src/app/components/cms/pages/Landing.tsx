import kebabCase from 'lodash/kebabCase'

import { Announcements, View } from '@/app/components/ui/ukhsa'
import { Contents, ContentsLink } from '@/app/components/ui/ukhsa/Contents/Contents'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Description } from '@/app/components/ui/ukhsa/View/Description/Description'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '@/app/components/ui/ukhsa/View/LastUpdated/LastUpdated'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  let processedSectionParams: string[] = []

  if (section) {
    processedSectionParams = processedParams(section)
  }
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

const processedParams = (value: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(value).map((section) => section.toLowerCase())
}
