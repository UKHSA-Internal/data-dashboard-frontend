import { getPathname } from '@/app/hooks/getPathname'

type PaginationLink = {
  pageText: string
  pageHref: string
}

interface PaginationBlockProps {
  links: Array<PaginationLink>
}

export async function getPaginationBlock({ links }: PaginationBlockProps) {
  const pathname = await getPathname()

  const pageIndex = links.findIndex(({ pageHref }) => pageHref === pathname)

  // First item
  if (pageIndex === 0 || pageIndex === -1) {
    return {
      previousText: null,
      previousPageHref: null,
      nextText: links[1]?.pageText ?? null,
      nextPageHref: links[1]?.pageHref ?? null,
    }
  }

  // Last item
  if (pageIndex === links.length - 1) {
    return {
      previousText: links[links.length - 2].pageText,
      previousPageHref: links[links.length - 2].pageHref,
      nextText: null,
      nextPageHref: null,
    }
  }

  // All other items
  return {
    previousText: links[pageIndex - 1].pageText,
    previousPageHref: links[pageIndex - 1].pageHref,
    nextText: links[pageIndex + 1].pageText,
    nextPageHref: links[pageIndex + 1].pageHref,
  }
}
