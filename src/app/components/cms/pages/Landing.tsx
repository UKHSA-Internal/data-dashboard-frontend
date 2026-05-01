import { kebabCase } from 'lodash'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
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
    body: landingBody,
    page_description: pageDescription,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
  } = await getLandingPage()

  const healthTopicsPageId = 'health-topics' // TODO: This should be a field within 'getLandingPage'
  const healthTopicsSectionTitle = 'All data dashboard health themes' // TODO: Again, should come from 'getLandingPage'

  const { body: HealthTopicsBody } = await getPageBySlug<PageType.TopicsList>(healthTopicsPageId, {
    type: PageType.TopicsList,
  }) // TODO: This should be getByID from the updated response object

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
        {landingBody.map(({ id, value }) => (
          <ContentsLink key={id} href={`#${kebabCase(value.heading)}`}>
            {value.heading}
          </ContentsLink>
        ))}
        <ContentsLink href={`#${kebabCase(healthTopicsSectionTitle)}`}>{healthTopicsSectionTitle}</ContentsLink>
      </Contents>
      {landingBody.map(renderSection.bind(null, processedSectionParams))}
      {/* Health topics section */}
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible my-8"></hr>
      <h2 className="govuk-heading-l" id={kebabCase(healthTopicsSectionTitle)}>
        {healthTopicsSectionTitle}
      </h2>
      {/* TODO: Need to include the dropdown filter here, once dropdown PR merged */}
      {HealthTopicsBody.map(renderSection.bind(null, processedSectionParams))}{' '}
      {/* TODO: Once the enableShowMore branch merged in, pass in 'false' here to mimic health topics page */}
      {showFooterRelatedLinks ? <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks ?? []} /> : null}
    </View>
  )
}
