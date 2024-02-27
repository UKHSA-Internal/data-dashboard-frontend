import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { usePaginationBlock } from '@/app/components/ui/govuk/Pagination/hooks/usePaginationBlock'
import { Pagination } from '@/app/components/ui/govuk/Pagination/Pagination'
import { PaginationNext } from '@/app/components/ui/govuk/Pagination/PaginationNext'
import { PaginationPrevious } from '@/app/components/ui/govuk/Pagination/PaginationPrevious'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export default async function AccessOurDataChild({ params: { slug } }: { params: { slug: string } }) {
  const { title, body, meta } = await getPageBySlug(slug, PageType.Composite)

  const childPages = await getPages(PageType.Composite, { child_of: meta.parent.id.toString() })

  const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
    links: childPages.success
      ? childPages.data.items.map((item) => ({ pageHref: `/access-our-data/${item.meta.slug}`, pageText: item.title }))
      : [],
  })

  return (
    <>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-4">{title}</h2>
      {body.map(renderCompositeBlock)}

      <Pagination variant="block">
        {previousPageHref && (
          <PaginationPrevious href={previousPageHref} variant="block">
            {previousText}
          </PaginationPrevious>
        )}
        {nextPageHref && (
          <PaginationNext href={nextPageHref} variant="block">
            {nextText}
          </PaginationNext>
        )}
      </Pagination>
    </>
  )
}
