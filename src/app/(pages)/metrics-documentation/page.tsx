import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getMetricsPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Pagination } from '@/app/components/ui/govuk/Pagination/Pagination'
import { usePaginationBlock } from '@/app/components/ui/govuk/Pagination/v2/hooks/usePaginationBlock'
import { Pagination as PaginationV2 } from '@/app/components/ui/govuk/Pagination/v2/Pagination'
import { PaginationNext } from '@/app/components/ui/govuk/Pagination/v2/PaginationNext'
import { PaginationPrevious } from '@/app/components/ui/govuk/Pagination/v2/PaginationPrevious'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { MetricsCard } from '@/app/components/ui/ukhsa/MetricsCard/MetricsCard'
import { METRICS_DOCUMENTATION_PAGE_SIZE } from '@/app/constants/app.constants'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

import MetricsSearch from './components/MetricsSearch/MetricsSearch'
import NoResults from './components/NoResults/NoResults'

interface MetricsParentPageProps {
  searchParams: {
    page?: number
    search?: string
  }
}

export async function generateMetadata({
  searchParams: { search = '', page = 1 },
}: MetricsParentPageProps): Promise<Metadata> {
  const { t } = await useTranslation('metrics')

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('metrics-documentation', PageType.MetricsParent)

  const metricsEntries = await getMetricsPages({ search, page })

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

  const title = seo_title.replace(
    '|',
    t('documentTitlePagination', { context: Boolean(search) ? 'withSearch' : '', search, page, totalPages })
  )

  return {
    title,
    description: search_description,
  }
}

export default async function MetricsParentPage({ searchParams: { search, page = 1 } }: MetricsParentPageProps) {
  const { t } = await useTranslation('metrics')
  const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
    paginationLinks: [
      { pageHref: '/access-our-data?page=overview', pageText: 'Overview' },
      { pageHref: '/access-our-data?page=what-is-an-api', pageText: 'What is an API' },
      { pageHref: '/access-our-data?page=getting-started', pageText: 'Getting started' },
      { pageHref: '/access-our-data?page=api-authentication', pageText: 'API authentication' },
      { pageHref: '/access-our-data?page=data-structure', pageText: 'Data structure' },
      { pageHref: '/access-our-data?page=examples', pageText: 'Examples' },
    ],
  })

  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('metrics-documentation', PageType.MetricsParent)

  const metricsEntries = await getMetricsPages({ search, page })

  if (!metricsEntries.success) {
    logger.error(metricsEntries.error.message)
    return redirect('/error')
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
          <PaginationV2 variant="block">
            {previousText && <PaginationPrevious href={previousPageHref}>{previousText}</PaginationPrevious>}
            {nextText && <PaginationNext href={nextPageHref}>{nextText}</PaginationNext>}
          </PaginationV2>

          <RichText>{body}</RichText>

          {/* TODO: CDD-1479 - Investgiate how we can consume i18n inside client components
              so that we don't need to pass in the values as props like this from the server component */}
          <MetricsSearch
            value={search ?? ''}
            labels={{
              searchTitle: t('metricsSearch.searchTitle'),
              noScriptButtonText: t('metricsSearch.noScriptButtonText'),
              clearText: t('metricsSearch.clearText'),
            }}
          />

          <ul className="govuk-!-margin-top-4" aria-label={title}>
            {items.map(({ id, title, meta, page_description: description, metric, metric_group: group, topic }) => {
              return (
                <MetricsCard
                  key={id}
                  title={title}
                  href={`metrics-documentation/${meta.slug}`}
                  description={description}
                  group={group}
                  topic={topic}
                  metric={metric}
                />
              )
            })}
          </ul>
          {items.length < 1 && <NoResults />}

          <Pagination
            className="govuk-!-margin-top-8"
            totalItems={totalItems}
            initialPage={page ?? 1}
            initialPageSize={METRICS_DOCUMENTATION_PAGE_SIZE}
          />
        </div>
      </div>

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
