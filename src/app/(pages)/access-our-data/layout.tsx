import { ReactNode } from 'react'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Contents, ContentsLink, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { CompositeComponent } from '@/app/components/ui/ukhsa/CompositeComponent/CompositeComponent'
import { usePathname } from '@/app/hooks/usePathname'

export default async function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const { title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  const { meta: childMeta } = await getPageBySlug(pathname.split('/')[2], PageType.Composite)

  const childPages = await getPages(PageType.Composite, { child_of: childMeta.parent.id.toString() })

  console.log('Path:', pathname)

  return (
    <View heading={title}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {body.map(({ value, type, id }) => (
            <CompositeComponent key={id} type={type} value={value} />
          ))}

          <Contents>
            {childPages.success &&
              childPages.data.items.map((item) => (
                <ContentsLink key={item.id} href={`/access-our-data/${item.meta.slug}`}>
                  {item.title}
                </ContentsLink>
              ))}
          </Contents>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          {children}
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedLink key={id} url={url} title={title} />
            ))}
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
