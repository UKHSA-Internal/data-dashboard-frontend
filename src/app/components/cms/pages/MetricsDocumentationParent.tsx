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
import { getPaginationList } from '@/app/components/ui/govuk/Pagination/hooks/getPaginationList'
import { Announcements, MetricsCard, View } from '@/app/components/ui/ukhsa'
import MetricsSearch from '@/app/components/ui/ukhsa/MetricsSearch/MetricsSearch'
import NoResults from '@/app/components/ui/ukhsa/NoResults/NoResults'
import { getReturnPathWithParams } from '@/app/hooks/getReturnPathWithParams'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { logger } from '@/lib/logger'

import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

interface MetricsParentPageProps {
  searchParams: {
    page?: number
    search?: string
    category?: string
    topic?: string
  }
}

export async function generateMetadata({
  searchParams: { search = '', page = 1, category = '', topic = '' },
}: MetricsParentPageProps): Promise<Metadata> {
  const { t } = await getServerTranslation('metrics')

  const {
    meta: { seo_title, search_description },
    pagination_size: paginationSize,
    show_pagination: showPagination,
  } = await getPageBySlug<PageType.MetricsParent>(['metrics-documentation'], { type: PageType.MetricsParent })

  const metricsEntries = await getMetricsPages({ search, page, showPagination, paginationSize, category, topic })

  if (!metricsEntries.success) {
    logger.info(metricsEntries.error.message)
    return redirect('/error')
  }

  const {
    data: {
      meta: { total_count: totalItems },
    },
  } = metricsEntries

  const totalPages = Math.ceil(totalItems / paginationSize) || 1

  const title = seo_title.replace(
    '|',
    t('documentTitlePagination', { context: Boolean(search) ? 'withSearch' : '', search, page, totalPages })
  )

  return {
    title,
    description: search_description,
  }
}

export default async function MetricsParentPage({
  slug,
  searchParams: { search, page = 1, category , topic  },
}: PageComponentBaseProps<{ search: string; page: number, category: string; topic: string }>) {  
  const {
    title,
    body,
    last_updated_at: lastUpdated,
    show_pagination: showPagination,
    pagination_size: paginationSize,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.MetricsParent>(slug, { type: PageType.MetricsParent })

  const metricsEntries = await getMetricsPages({ search, page, showPagination, paginationSize, category, topic})

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
  console.log(metricsEntries.data);
  const { previousPageHref, nextPageHref, pages, currentPage } = getPaginationList({
    totalItems,
    initialPage: page ?? 1,
    initialPageSize: paginationSize,
  })

  const setReturnPath = getReturnPathWithParams()

  return (
    <View>
      <Heading heading={title} />
      <LastUpdated lastUpdated={lastUpdated} />
      <Announcements announcements={activeAnnouncements} />
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
                  href={setReturnPath(`metrics-documentation/${meta.slug}`)}
                  description={description}
                  group={group}
                  topic={topic}
                  metric={metric}
                />
              )
            })}
          </ul>
          {items.length < 1 && <NoResults />}

          {pages.length > 0 && showPagination && (
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
    </View>
  )
}
