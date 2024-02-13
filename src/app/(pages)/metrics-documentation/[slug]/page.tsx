import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { usePaginationBlock } from '@/app/components/ui/govuk/Pagination/v2/hooks/usePaginationBlock'
import { Pagination as PaginationV2 } from '@/app/components/ui/govuk/Pagination/v2/Pagination'
import { PaginationNext } from '@/app/components/ui/govuk/Pagination/v2/PaginationNext'
import { PaginationPrevious } from '@/app/components/ui/govuk/Pagination/v2/PaginationPrevious'
import { PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

import MetricsSummary from '../components/MetricsSummary/MetricsSummary'

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
  const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
    links: [
      { pageHref: '/metrics-documentation/new-cases-7days-sum', pageText: 'Overview' },
      { pageHref: '/metrics-documentation/new-deaths-7days-change-percentage', pageText: 'What is an API' },
      { pageHref: '/metrics-documentation/covid-occupied-beds-latest', pageText: 'Getting started' },
    ],
  })

  const {
    title,
    topic,
    metric,
    metric_group: group,
    body,
    last_published_at,
  } = await getPageBySlug(slug, PageType.MetricsChild)

  return (
    <View heading={title} lastUpdated={last_published_at} backLink="/metrics-documentation">
      <div className="govuk-grid-row">
        :
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <PaginationV2 variant="block">
            {previousText && <PaginationPrevious href={previousPageHref}>{previousText}</PaginationPrevious>}
            {nextText && <PaginationNext href={nextPageHref}>{nextText}</PaginationNext>}
          </PaginationV2>

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
