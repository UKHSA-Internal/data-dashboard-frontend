import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { usePaginationBlock } from '@/app/components/ui/govuk/Pagination/v2/hooks/usePaginationBlock'
import { Pagination } from '@/app/components/ui/govuk/Pagination/v2/Pagination'
import { PaginationNext } from '@/app/components/ui/govuk/Pagination/v2/PaginationNext'
import { PaginationPrevious } from '@/app/components/ui/govuk/Pagination/v2/PaginationPrevious'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { CompositeComponent } from '@/app/components/ui/ukhsa/CompositeComponent/CompositeComponent'
import { Contents, ContentsLink } from '@/app/components/ui/ukhsa/Contents/Contents'

export default async function AccessOurData() {
  const { title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  const { title: childTitle, body: childBody } = await getPageBySlug('overview', PageType.Composite)

  const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
    links: [
      { pageHref: '/access-our-data/overview', pageText: 'Overview' },
      { pageHref: '/access-our-data/what-is-an-api', pageText: 'What is an API' },
      { pageHref: '/access-our-data/getting-started', pageText: 'Getting started' },
    ],
  })

  return (
    <View heading={title}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {body.map(({ value, type, id }) => (
            <CompositeComponent key={id} type={type} value={value} />
          ))}

          <Contents>
            <ContentsLink href="/access-our-data/overview">Overview</ContentsLink>
            <ContentsLink href="/access-our-data/what-is-an-api">What is an API</ContentsLink>
            <ContentsLink href="/access-our-data/getting-started">Getting started</ContentsLink>
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
