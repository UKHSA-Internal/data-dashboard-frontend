import { kebabCase } from 'lodash'

import type { Body } from '@/api/models/cms/Page/Body'
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

  const healthTopicsPageId = health_topic[0]?.value.page
  const healthTopicsSectionTitle = health_topic[0]?.value.heading ?? ''
  const hasHealthTopicsSection = healthTopicsPageId != null && healthTopicsPageId > 0

  let healthTopicsBody: Body = []

  if (hasHealthTopicsSection) {
    const { body } = await getPageById<PageType.TopicsList>(healthTopicsPageId)
    healthTopicsBody = body
  }

  const hasRelatedLinks = Boolean(relatedLinks?.length)
  const showSidebarRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Sidebar'
  const showFooterRelatedLinks = hasRelatedLinks && relatedLinksLayout === 'Footer'

  const filterItems = hasHealthTopicsSection ? getFilterItemsFromBody(healthTopicsBody) : []

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
        {hasHealthTopicsSection ? (
          <ContentsLink href={`#${kebabCase(healthTopicsSectionTitle)}`}>{healthTopicsSectionTitle}</ContentsLink>
        ) : null}
      </Contents>
      {landingBody.map((bodySection) => renderSection(processedSectionParams, bodySection, true))}

      {/* -------------------------------- */}
      {/* Health topics section */}
      {hasHealthTopicsSection ? (
        <>
          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible my-8"></hr>
          <h2 className="govuk-heading-l" id={kebabCase(healthTopicsSectionTitle)}>
            {healthTopicsSectionTitle}
          </h2>
          <TopicsListFilterContainer items={filterItems} />
          {healthTopicsBody.map((bodySection) => renderSection(processedSectionParams, bodySection, false))}
        </>
      ) : null}
      {/* -------------------------------- */}

      {showFooterRelatedLinks ? <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks ?? []} /> : null}
    </View>
  )
}
