import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import {
  PageSection,
  PageSectionWithContents,
  RelatedLink as RelatedLinkV1,
  RelatedLinks as RelatedLinksV1,
  View,
} from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderCard } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

import {
  RelatedLink as RelatedLinkV2,
  RelatedLinks as RelatedLinksV2,
} from '../../ui/ukhsa/RelatedLinks/v2/RelatedLinks'

export default async function TopicPage({
  slug,
  searchParams: { areaName, areaType },
}: PageComponentBaseProps<{ areaType?: string; areaName?: string }>) {
  const { t } = await getServerTranslation('common')

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)
  const { enabled: newTimestampEnabled } = await getFeatureFlag(flags.newTimestamp)

  const {
    title,
    body,
    page_description: description,
    last_published_at: lastPublishedAt,
    last_updated_at: lastUpdatedAt,
    related_links: relatedLinks,
    enable_area_selector: enableAreaSelector,
    selected_topics: selectedTopics,
  } = await getPageBySlug<PageType.Topic>(slug, { type: PageType.Topic })
  return (
    <View
      heading={t('pageTitle', { context: areaName && 'withArea', title, areaName })}
      description={description}
      lastUpdated={newTimestampEnabled ? lastUpdatedAt : lastPublishedAt}
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
            {value.content.map(renderCard)}
          </PageSection>
        ))}
      </PageSectionWithContents>

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
