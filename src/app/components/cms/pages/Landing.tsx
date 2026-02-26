import { Announcements, PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'
import { renderCard, renderSection } from '@/app/utils/cms.utils'
import { clsx } from '@/lib/clsx'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Description } from '../../ui/ukhsa/View/Description/Description'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  let processedSectionParams: string[] = []

  if (section) {
    processedSectionParams = processedParams(section)
  }
  const {
    body,
    page_description: description,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
  } = await getLandingPage()

  body.map(renderSection.bind(null, processedSectionParams))

  return (
    <View>
      <LastUpdated lastUpdated={lastUpdated} />
      <Announcements announcements={activeAnnouncements} />
      <Description description={description} />
      <div className="govuk-grid-row">
        <div
          className={clsx({
            'govuk-grid-column-three-quarters-from-desktop': relatedLinksLayout === 'Sidebar',
            'govuk-grid-column-full': relatedLinksLayout === 'Footer',
          })}
        >
          <PageSectionWithContents>
            {body.map(({ id, value }) => (
              <PageSection key={id} heading={value.heading}>
                {value.content.map((item) => renderCard(value.heading, [], item))}
              </PageSection>
            ))}
          </PageSectionWithContents>
        </div>

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
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

const processedParams = (value: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(value).map((section) => section.toLowerCase())
}
