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
import {
  MetricsCard,
  RelatedLink as RelatedLinkV1,
  RelatedLinks as RelatedLinksV1,
  View,
} from '@/app/components/ui/ukhsa'
import MetricsSearch from '@/app/components/ui/ukhsa/MetricsSearch/MetricsSearch'
import NoResults from '@/app/components/ui/ukhsa/NoResults/NoResults'
import { METRICS_DOCUMENTATION_PAGE_SIZE } from '@/app/constants/app.constants'
import { flags } from '@/app/constants/flags.constants'
import { getReturnPathWithParams } from '@/app/hooks/getReturnPathWithParams'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { getFeatureFlag } from '@/app/utils/flags.utils'
import { logger } from '@/lib/logger'

import {
  RelatedLink as RelatedLinkV2,
  RelatedLinks as RelatedLinksV2,
} from '../../ui/ukhsa/RelatedLinks/v2/RelatedLinks'

interface MetricsParentPageProps {
  searchParams: {
    page?: number
    search?: string
  }
}

export async function generateMetadata({
  searchParams: { search = '', page = 1 },
}: MetricsParentPageProps): Promise<Metadata> {
  const { t } = await getServerTranslation('metrics')

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

export default async function MetricsParentPage({
  slug,
  searchParams: { search, page = 1 },
}: PageComponentBaseProps<{ search: string; page: number }>) {
  const {
    title,
    body,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.MetricsParent>(slug, { type: PageType.MetricsParent })

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)

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

  const { previousPageHref, nextPageHref, pages, currentPage } = getPaginationList({
    totalItems,
    initialPage: page ?? 1,
    initialPageSize: METRICS_DOCUMENTATION_PAGE_SIZE,
  })

  const setReturnPath = getReturnPathWithParams()

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
