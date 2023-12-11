import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getMetricsPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Pagination } from '@/app/components/ui/govuk'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { MetricsCard } from '@/app/components/ui/ukhsa/MetricsCard/MetricsCard'
import { METRICS_DOCUMENTATION_PAGE_SIZE } from '@/app/constants/app.constants'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

interface MetricsParentPageProps {
  searchParams: {
    page?: number
  }
}

export async function generateMetadata({ searchParams: { page = 1 } }: MetricsParentPageProps): Promise<Metadata> {
  const { t } = await useTranslation('whatsNew')

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('metrics', PageType.MetricsParent)

  const metricsEntries = await getMetricsPages({ page })

  if (!metricsEntries.success) {
    logger.info(metricsEntries.error.message)
    return redirect('/error')
  }

  const {
    data: {
      meta: { total_count: totalItems },
    },
  } = metricsEntries

  const totalPages = Math.ceil(totalItems / METRICS_DOCUMENTATION_PAGE_SIZE) || 1

  const title = seo_title.replace('|', t('documentTitlePagination', { page, totalPages }))

  return {
    title,
    description: search_description,
  }
}

export default async function MetricsParentPage({ searchParams: { page = 1 } }: MetricsParentPageProps) {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('metrics', PageType.MetricsParent)

  const metricsEntries = await getMetricsPages({ page })

  if (!metricsEntries.success) {
    logger.error(metricsEntries.error.message)
    return redirect('/error')
  }

  if (!metricsEntries.data.items.length) {
    logger.error('No metrics entries found, redirecting to 404 page')
    return notFound()
  }

  const {
    data: {
      items,
      meta: { total_count: totalItems },
    },
  } = metricsEntries

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <RichText>{body}</RichText>

          <div className="govuk-!-margin-top-7" aria-label={title}>
            {items.map(({ id, title, meta, page_description: description, metric, metric_group: group, topic }) => {
              return (
                <MetricsCard
                  key={id}
                  title={title}
                  href={`metrics/${meta.slug}`}
                  description={description}
                  group={group}
                  topic={topic}
                  metric={metric}
                />
              )
            })}
          </div>

          <Pagination
            className="govuk-!-margin-top-8"
            totalItems={totalItems}
            initialPage={page ?? 1}
            initialPageSize={METRICS_DOCUMENTATION_PAGE_SIZE}
          />
        </div>
      </div>

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
