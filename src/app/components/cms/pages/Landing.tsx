import { kebabCase } from 'lodash'

import { Announcements, View } from '@/app/components/ui/ukhsa'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

import { Contents, ContentsLink } from '../../ui/ukhsa/Contents/Contents'
import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Description } from '../../ui/ukhsa/View/Description/Description'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  const processedSectionParams = processSectionParams(section)

  const {
    title,
    body,
    page_description: pageDescription,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
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
          <Heading heading={title} />
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
