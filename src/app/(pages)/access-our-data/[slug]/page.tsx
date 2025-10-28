import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getServerTranslation } from '@/app/i18n'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug<PageType.Composite>(slug)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function AccessOurDataChild(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const {
    slug
  } = params;

  const { t } = await getServerTranslation('common')

  const { title, body, last_updated_at: lastUpdated } = await getPageBySlug<PageType.Composite>(slug)

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
