import { getPages } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Pagination, PaginationNext, PaginationPrevious } from '@/app/components/ui/govuk'
import { getPaginationBlock } from '@/app/components/ui/govuk/Pagination/hooks/getPaginationBlock'

export default async function PaginationView({ params: { slug } }: { params: { slug: string } }) {
  const { meta } = await getPageBySlug(slug)

  const childPages = await getPages({ child_of: meta.parent.id.toString() })

  const { previousText, previousPageHref, nextText, nextPageHref } = getPaginationBlock({
    links: childPages.success
      ? childPages.data.items.map((item) => ({ pageHref: `/access-our-data/${item.meta.slug}`, pageText: item.title }))
      : [],
  })

  return (
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
  )
}
