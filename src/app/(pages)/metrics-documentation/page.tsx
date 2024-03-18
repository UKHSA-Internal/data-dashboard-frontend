import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getMetricsPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import {
  Pagination,
  PaginationListItem,
  PaginationListItems,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/govuk'
import { usePaginationList } from '@/app/components/ui/govuk/Pagination/hooks/usePaginationList'
import { MetricsCard, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
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
  } = await getPageBySlug('metrics-documentation', { type: PageType.MetricsParent })

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
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.MetricsParent>('metrics-documentation', { type: PageType.MetricsParent })

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

  const { previousPageHref, nextPageHref, pages, currentPage } = usePaginationList({
    totalItems,
    initialPage: page ?? 1,
    initialPageSize: METRICS_DOCUMENTATION_PAGE_SIZE,
  })

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <RichText>{body}</RichText>

          <MetricsSearch value={search ?? ''} />

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

          {pages.length > 0 && (
            <Pagination variant="list-item" className="govuk-!-margin-top-8">
              {previousPageHref && <PaginationPrevious variant="list-item" href={previousPageHref} />}
              <PaginationListItems>
                {pages.map(({ page, href }) => (
                  <PaginationListItem key={page} href={href} current={currentPage === page}>
                    {page}
                  </PaginationListItem>
                ))}
              </PaginationListItems>

              {nextPageHref && <PaginationNext variant="list-item" href={nextPageHref} />}
            </Pagination>
          )}
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
