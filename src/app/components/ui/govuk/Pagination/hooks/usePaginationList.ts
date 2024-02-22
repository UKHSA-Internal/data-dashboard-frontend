import { UrlObject } from 'node:url'

import { usePathname } from '@/app/hooks/usePathname'
import { useSearchParams } from '@/app/hooks/useSearchParams'

interface PaginationListProps {
  totalItems: number
  initialPage: number
  initialPageSize: number
}

type PageHref = UrlObject | null
type Pages = Array<{ page: number; href: UrlObject }>

export function usePaginationList({ totalItems, initialPage, initialPageSize }: PaginationListProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || initialPage
  const totalPages = Math.ceil(totalItems / initialPageSize) || 1
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const query = Object.fromEntries(searchParams)

  if (totalPages <= 1) {
    return {
      previousPageHref: null,
      nextPageHref: null,
      currentPage: null,
      pages: [],
    }
  }

  const previousPageHref: PageHref = hasPreviousPage
    ? {
        pathname,
        query: { ...query, page: currentPage - 1 },
      }
    : null

  const nextPageHref: PageHref = hasNextPage
    ? {
        pathname,
        query: { ...query, page: currentPage + 1 },
      }
    : null

  const pages: Pages = generatePageNumbers().map((page) => ({
    page,
    href: {
      pathname,
      query: { ...query, page },
    },
  }))

  return {
    previousPageHref,
    nextPageHref,
    currentPage,
    pages,
  }
}
