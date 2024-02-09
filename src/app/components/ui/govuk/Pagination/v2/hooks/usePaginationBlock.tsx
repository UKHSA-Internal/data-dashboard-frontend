type PaginationLink = {
  pageText: string
  pageLink: string
}

interface PaginationBlockProps {
  paginationLinks: Array<PaginationLink>
}

export function usePaginationBlock({ paginationLinks }: PaginationBlockProps) {
  return {
    previousText: null,
    previousPageHref: null,
    nextText: null,
    nextPageHref: null,
  }
}
