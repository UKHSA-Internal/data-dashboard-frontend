import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { PageSection, PageSectionWithContents, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderCard } from '@/app/utils/cms.utils'

export default async function TopicPage({
  slug,
  searchParams: { areaName, areaType },
}: PageComponentBaseProps<{ areaType?: string; areaName?: string }>) {
  const { t } = await getServerTranslation('common')

  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
    enable_area_selector: enableAreaSelector,
    selected_topics: selectedTopics,
  } = await getPageBySlug<PageType.Topic>(slug, { type: PageType.Topic })
  return (
    <View
      heading={t('pageTitle', { context: areaName && 'withArea', title, areaName })}
      description={description}
      lastUpdated={lastUpdated}
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
      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
