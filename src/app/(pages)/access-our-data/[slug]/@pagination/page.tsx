import { getPages } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Pagination, PaginationNext, PaginationPrevious } from '@/app/components/ui/govuk'
import { getPaginationBlock } from '@/app/components/ui/govuk/Pagination/hooks/getPaginationBlock'

export default async function PaginationView(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params

  const { slug } = params

  const { meta } = await getPageBySlug(slug)

  const childPages = await getPages({ child_of: meta.parent.id.toString() })

  const { previousText, previousPageHref, nextText, nextPageHref } = await getPaginationBlock({
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
