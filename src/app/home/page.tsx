import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Metadata } from 'next'
import { useTranslation } from '../i18n'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)
  return {
    title,
    description,
  }
}

async function getPage() {
  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks = [],
    meta,
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return {
    title,
    body,
    description,
    lastUpdated,
    relatedLinks,
    meta,
  }
}

export default async function Page() {
  const { t } = await useTranslation('common')

  const page = await getPage()

  const { title, description, lastUpdated } = page

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="mb-4 govuk-body-s">{t('lastUpdated', { value: lastUpdated })}</p>
          <h1 className="govuk-heading-xl mb-4">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>

      <div>WIP</div>
    </>
  )
}
