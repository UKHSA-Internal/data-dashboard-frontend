import { Metadata } from 'next'
import { ReactNode } from 'react'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { BackToTop, Contents, ContentsLink, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('access-our-data', PageType.Composite)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const { t } = await useTranslation('common')

  const { id, title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  const childPages = await getPages(undefined, { child_of: id.toString() })

  return (
    <>
      <View heading={title}>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-three-quarters-from-desktop">
            {body.map(renderCompositeBlock)}

            {childPages.success && (
              <Contents>
                {childPages.data.items.map((item) => (
                  <ContentsLink key={item.id} href={`/access-our-data/${item.meta.slug}`}>
                    {item.title}
                  </ContentsLink>
                ))}
              </Contents>
            )}
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-three-quarters-from-desktop">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
            {children}
          </div>

          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
            <RelatedLinks variant="sidebar">
              {relatedLinks.map(({ title, url, id }) => (
                <RelatedLink key={id} url={url} title={title} />
              ))}
            </RelatedLinks>
          </div>
        </div>
      </View>
      <BackToTop label={t('backToTop')} />
    </>
  )
}
