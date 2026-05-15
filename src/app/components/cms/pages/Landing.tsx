import { kebabCase } from 'lodash'

import { PageType } from '@/api/requests/cms/getPages'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage, getPageById } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

import { Contents, ContentsLink } from '../../ui/ukhsa/Contents/Contents'
import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Description } from '../../ui/ukhsa/View/Description/Description'
import { TopicsListFilterContainer } from '../TopicsListFilterContainer/TopicsListFilterContainer'
import { getFilterItemsFromBody } from './TopicsList'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  const processedSectionParams = processSectionParams(section)

  const {
    title,
    body: landingBody,
    page_description: pageDescription,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
    health_topic,
  } = await getLandingPage()

  const healthTopicsPageId = health_topic[0].value.page
  const healthTopicsSectionTitle = health_topic[0].value.heading

  const { body: HealthTopicsBody } = await getPageById<PageType.TopicsList>(healthTopicsPageId)

  const hasRelatedLinks = Boolean(relatedLinks?.length)
  const showSidebarRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Sidebar'
  const showFooterRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Footer'

  const filterItems = getFilterItemsFromBody(HealthTopicsBody)

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
      {landingBody.map((bodySection) => renderSection(processedSectionParams, bodySection, true))}

      {/* -------------------------------- */}
      {/* Health topics section */}
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible my-8"></hr>
      <h2 className="govuk-heading-l" id={kebabCase(healthTopicsSectionTitle)}>
        {healthTopicsSectionTitle}
      </h2>
      <TopicsListFilterContainer items={filterItems} />
      {HealthTopicsBody.map((bodySection) => renderSection(processedSectionParams, bodySection, false))}
      {/* -------------------------------- */}

      {showFooterRelatedLinks ? <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks ?? []} /> : null}
    </View>
  )
}
