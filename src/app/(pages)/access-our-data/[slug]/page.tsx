import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { useTranslation } from '@/app/i18n'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

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
  const { t } = await useTranslation('common')

  const { title, body, last_published_at: lastUpdated } = await getPageBySlug<PageType.Composite>(slug)

  return (
    <>
      {lastUpdated && (
        <p className="govuk-!-margin-bottom-0 govuk-body-xs">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
      )}

      <h2 className="govuk-heading-l govuk-!-margin-bottom-4">{title}</h2>

      {body.map(renderCompositeBlock)}
    </>
  )
}
