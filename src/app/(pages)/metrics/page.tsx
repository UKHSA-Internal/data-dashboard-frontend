import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getMetricsPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { MetricsCard } from '@/app/components/ui/ukhsa/MetricsCard/MetricsCard'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

import MetricsSearch from '../metrics-documentation/components/MetricsSearch/MetricsSearch'
import NoResults from '../metrics-documentation/components/NoResults/NoResults'

export async function generateMetadata({ searchParams: { search = '', page = 1 } }): Promise<Metadata> {
  const { t } = await useTranslation('metrics')

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('metrics', PageType.MetricsParent)

  // TODO: Merge with pagination work to pull through
  const totalPages = 1

  let title = seo_title.replace('|', t('documentTitleSearch', { search, seoTitle: seo_title, page, totalPages }))

  if (search_description === '') {
    title = seo_title
  }

  return {
    title,
    description: search_description,
  }
}

interface MetricsParentPageProps {
  searchParams: {
    search?: string
  }
}

export default async function MetricsParentPage({ searchParams: { search } }: MetricsParentPageProps) {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('metrics', PageType.MetricsParent)

  const metricsEntries = await getMetricsPages({ search })

  if (!metricsEntries.success) {
    logger.info(metricsEntries.error.message)
    return redirect('/error')
  }

  const {
    data: { items },
  } = metricsEntries

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <RichText>{body}</RichText>

          <MetricsSearch value={search ?? ''} />

          <div className="govuk-!-margin-top-3" aria-label={title}>
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
            {items.length < 1 && <NoResults />}
          </div>
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
