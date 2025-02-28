import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderCard } from '@/app/utils/cms.utils'
import { clsx } from '@/lib/clsx'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Description } from '../../ui/ukhsa/View/Description/Description'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

export default async function TopicPage({
  slug,
  searchParams: { areaName, areaType },
}: PageComponentBaseProps<{ areaType?: string; areaName?: string }>) {
  const { t } = await getServerTranslation('common')

  const {
    title,
    body,
    page_description: description,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    enable_area_selector: enableAreaSelector,
    selected_topics: selectedTopics,
  } = await getPageBySlug<PageType.Topic>(slug, { type: PageType.Topic })
  return (
    <View>
      <Heading heading={t('pageTitle', { context: areaName && 'withArea', title, areaName })} />
      <LastUpdated lastUpdated={lastUpdated} />
      <Description description={description} />
      <div className="govuk-grid-row">
        <div
          className={clsx({
            'govuk-grid-column-three-quarters-from-desktop': relatedLinksLayout === 'Sidebar',
            'govuk-grid-column-full': relatedLinksLayout === 'Footer',
          })}
        >
          {enableAreaSelector && (
            <>
              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
              <Details
                open={Boolean(areaType)}
                label={t('areaSelector.detailsLabel')}
                className="govuk-!-margin-top-6 govuk-!-margin-bottom-6"
              >
                <AreaSelector areaType={areaType} selectedTopics={selectedTopics} />
              </Details>
            </>
          )}

          <PageSectionWithContents>
            {body.map(({ id, value }) => (
              <PageSection key={id} heading={value.heading}>
                {value.content.map(renderCard.bind(null, value.heading, []))}
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
