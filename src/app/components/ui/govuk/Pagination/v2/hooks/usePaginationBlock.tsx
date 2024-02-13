import { usePathname } from '@/app/hooks/usePathname'

type PaginationBlockReturnType = {
  previousText: string | null
  previousPageHref: string | null
  nextText: string | null
  nextPageHref: string | null
}

type PaginationLink = {
  pageText: string
  pageHref: string
}

interface PaginationBlockProps {
  links: Array<PaginationLink>
}

export function usePaginationBlock({ links }: PaginationBlockProps): PaginationBlockReturnType {
  let pageIndex = 0

  const pathname = usePathname()
  const pathnameSections = pathname.split('/')

  if (pathnameSections.length > 2) pageIndex = links.findIndex(({ pageHref }) => pageHref === pathname)
  else pageIndex = 0

  // First item
  if (pageIndex === 0 || pageIndex === -1) {
    return {
      previousText: null,
      previousPageHref: null,
      nextText: links[1].pageText,
      nextPageHref: links[1].pageHref,
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
