import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { flags } from '@/app/constants/flags.constants'
import { getServerTranslation } from '@/app/i18n'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug<PageType.Composite>(slug)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function AccessOurDataChild({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await getServerTranslation('common')

  const { enabled: newTimestampEnabled } = await getFeatureFlag(flags.newTimestamp)

  const {
    title,
    body,
    last_published_at: lastPublishedAt,
    last_updated_at: lastUpdatedAt,
  } = await getPageBySlug<PageType.Composite>(slug)

  const lastUpdated = newTimestampEnabled ? lastUpdatedAt : lastPublishedAt

  return (
    <>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-2">{title}</h2>

      {lastUpdated && (
        <p className="govuk-!-margin-bottom-0 govuk-body-xs govuk-!-margin-bottom-4">
          {t('lastUpdated', { value: new Date(lastUpdated) })}
        </p>
      )}

      {body.map(renderCompositeBlock)}
    </>
  )
}
