import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import { useSearchParams } from '@/app/hooks/useSearchParams'
import { useTranslation } from '@/app/i18n'

import MetricsSummary from '../components/MetricsSummary/MetricsSummary'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug<PageType.MetricsChild>(slug, { type: PageType.MetricsChild, fields: '*' })

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function MetricsChildPage({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await useTranslation('metrics')
  const searchParams = useSearchParams()

  const {
    title,
    topic,
    metric,
    metric_group: group,
    body,
    last_published_at,
  } = await getPageBySlug<PageType.MetricsChild>(slug, { type: PageType.MetricsChild })

  const backLink = searchParams.get('returnUrl') || '/metrics-documentation'

  return (
    <View heading={title} lastUpdated={last_published_at} backLink={backLink}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <PageSectionWithContents>
            <PageSection heading={'Summary'}>
              <MetricsSummary topic={topic} group={group} metric={metric} />
            </PageSection>
            {body.map(({ id, value: { title, body } }) => (
              <PageSection key={id} heading={title}>
                {body ? (
                  <RichText>{body}</RichText>
                ) : (
                  <p className="govuk-body">{t('emptyDescriptionText', { value: title.toLowerCase() })}</p>
                )}
              </PageSection>
            ))}
          </PageSectionWithContents>
        </div>
      </div>
    </View>
  )
}
