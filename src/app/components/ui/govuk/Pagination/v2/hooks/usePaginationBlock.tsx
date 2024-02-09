import { useSearchParams } from '@/app/hooks/useSearchParams'

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
  paginationLinks: Array<PaginationLink>
}

// Assumed root: /access-our-data
// Assumed pages: /access-our-data?page=what-is-an-api
// paginationLinks: [
//   { pageHref: '/access-our-data?page=overview', pageText: 'Overview' },
//   { pageHref: '/access-our-data?page=what-is-an-api', pageText: 'What is an API' },
//   { pageHref: '/access-our-data?page=getting-started', pageText: 'Getting started' },
//   { pageHref: '/access-our-data?page=api-authentication', pageText: 'API authentication' },
//   { pageHref: '/access-our-data?page=data-structure', pageText: 'Data structure' },
//   { pageHref: '/access-our-data?page=examples', pageText: 'Examples' },
// ],
// Could also look to use URLs, e.g: /access-our-data/overview

export function usePaginationBlock({ paginationLinks }: PaginationBlockProps): PaginationBlockReturnType {
  let pageIndex = 0

  const searchParams = useSearchParams()

  if (searchParams.get('page')) {
    pageIndex = paginationLinks.findIndex(
      ({ pageHref }) => pageHref === `/access-our-data?page=${searchParams.get('page')}`
    )
  } else {
    pageIndex = 0
  }

  // First item
  if (pageIndex === 0 || pageIndex === -1) {
    return {
      previousText: null,
      previousPageHref: null,
      nextText: paginationLinks[1].pageText,
      nextPageHref: paginationLinks[1].pageHref,
    }
  }

  // Last item
  if (pageIndex === paginationLinks.length - 1) {
    return {
      previousText: paginationLinks[paginationLinks.length - 2].pageText,
      previousPageHref: paginationLinks[paginationLinks.length - 2].pageHref,
      nextText: null,
      nextPageHref: null,
    }
  }

  // All other items
  return {
    previousText: paginationLinks[pageIndex - 1].pageText,
    previousPageHref: paginationLinks[pageIndex - 1].pageHref,
    nextText: paginationLinks[pageIndex + 1].pageText,
    nextPageHref: paginationLinks[pageIndex + 1].pageHref,
  }
}
