import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { usePaginationBlock } from '@/app/components/ui/govuk/Pagination/v2/hooks/usePaginationBlock'
import { Pagination } from '@/app/components/ui/govuk/Pagination/v2/Pagination'
import { PaginationNext } from '@/app/components/ui/govuk/Pagination/v2/PaginationNext'
import { PaginationPrevious } from '@/app/components/ui/govuk/Pagination/v2/PaginationPrevious'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { CompositeComponent } from '@/app/components/ui/ukhsa/CompositeComponent/CompositeComponent'
import { Contents, ContentsLink } from '@/app/components/ui/ukhsa/Contents/Contents'

export default async function AccessOurDataChild({ params: { slug } }: { params: { slug: string } }) {
  const { title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  const { title: childTitle, body: childBody } = await getPageBySlug(slug, PageType.Composite)

  const childPages = await getPages(PageType.Composite, { child_of: '31' })

  const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
    links: childPages.success
      ? childPages.data.items.map((item) => ({ pageHref: `/access-our-data/${item.meta.slug}`, pageText: item.title }))
      : [],
  })

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
          <h2 className="govuk-heading-l govuk-!-margin-bottom-4">{childTitle}</h2>
          {childBody.map(({ value, type, id }) => (
            <CompositeComponent key={id} type={type} value={value} />
          ))}

          <Pagination variant="block">
            {previousPageHref && <PaginationPrevious href={previousPageHref}>{previousText}</PaginationPrevious>}
            {nextPageHref && <PaginationNext href={nextPageHref}>{nextText}</PaginationNext>}
          </Pagination>
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
