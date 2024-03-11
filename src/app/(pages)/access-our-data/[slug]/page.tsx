import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.Composite)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function AccessOurDataChild({ params: { slug } }: { params: { slug: string } }) {
  const { title, body } = await getPageBySlug(slug, PageType.Composite)

  return (
    <>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-4">{title}</h2>
      {body.map(renderCompositeBlock)}
    </>
  )
}
