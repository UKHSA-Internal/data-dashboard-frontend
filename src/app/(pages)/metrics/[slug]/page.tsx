import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import MetricsSummary from '@/app/(pages)/metrics/components/MetricsSummary/MetricsSummary'
import { RichText } from '@/app/components/cms'
import { Contents, ContentsItem, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.MetricsChild, { fields: '*' })

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function MetricsChildPage({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await useTranslation('metrics')

  const {
    title,
    topic,
    metric,
    metric_group: group,
    body,
    last_published_at,
  } = await getPageBySlug(slug, PageType.MetricsChild)

  return (
    <View heading={title} lastUpdated={last_published_at} backLink="/metrics">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <Contents>
            <ContentsItem heading={'Summary'}>
              <MetricsSummary topic={topic} group={group} metric={metric} />
            </ContentsItem>
            {body.map(({ id, value: { title, body } }) => (
              <ContentsItem key={id} heading={title}>
                {body ? (
                  <RichText>{body}</RichText>
                ) : (
                  <p className="govuk-body">{t('emptyDescriptionText', { value: title.toLowerCase() })}</p>
                )}
              </ContentsItem>
            ))}
          </Contents>
        </div>
      </div>
    </View>
  )
}
