import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getMetricsPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { MetricsCard } from '@/app/components/ui/ukhsa/MetricsCard/MetricsCard'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

import MetricsSearch from './components/MetricsSearch/MetricsSearch'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await useTranslation('metrics')

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('metrics', PageType.MetricsParent)

  const title = seo_title.replace(
    '|',
    t('documentTitleSearch', { search: search_description, seoTitle: seo_title, page, totalPages })
  )

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

  const metricsEntries = await getMetricsPages(search)

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

          <div className="govuk-!-margin-top-7" aria-label={title}>
            {items.map(({ id, title, meta, shortText, category, topic, apiName }) => {
              return (
                <MetricsCard
                  key={id}
                  title={title}
                  href={`metrics/${meta.slug}`}
                  shortText={shortText}
                  category={category}
                  topic={topic}
                  apiName={apiName}
                />
              )
            })}
            {items.length < 1 && <div>No results found</div>}
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
