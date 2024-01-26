import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { Contents, ContentsItem, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'
import { renderCard } from '@/app/utils/cms.utils'

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

interface TopicPageProps {
  params: { topic: string }
  searchParams: { areaType?: string; areaName?: string }
}

export default async function TopicPage({ params: { topic }, searchParams: { areaType, areaName } }: TopicPageProps) {
  const { t } = await useTranslation('common')

  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
    enable_area_selector: enableAreaSelector,
  } = await getPageBySlug(topic, PageType.Topic)
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
            <AreaSelector areaType={areaType} />
          </Details>
        </>
      )}
      <Contents>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            {value.content.map(renderCard)}
          </ContentsItem>
        ))}
      </Contents>
      <RelatedLinks>
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
