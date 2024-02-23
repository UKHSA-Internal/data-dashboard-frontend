import { ReactNode } from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { CompositeComponent } from '@/app/components/ui/ukhsa/CompositeComponent/CompositeComponent'

export default async function Layout({ children }: { children: ReactNode }) {
  const { title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  return (
    <View heading={title}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {body.map(({ value, type, id }) => (
            <CompositeComponent key={id} type={type} value={value} />
          ))}

          {/* <Contents>
            {childPages.success &&
              childPages.data.items.map((item) => (
                <ContentsLink key={item.id} href={`/access-our-data/${item.meta.slug}`}>
                  {item.title}
                </ContentsLink>
              ))}
          </Contents> */}
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
