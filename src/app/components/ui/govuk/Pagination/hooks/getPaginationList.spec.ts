import { mockRouter } from '@/app/utils/__mocks__/next-router'

import { getPaginationList } from './getPaginationList'

const pathname = '/mock-page'
const defaultUrl = new URL(`http://localhost${pathname}?order=asc`)
jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))
jest.mock('@/app/hooks/getSearchParams', () => ({
  getSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

type PaginationListProps = Awaited<ReturnType<typeof getPaginationList>>

describe('getPaginationList', () => {
  beforeEach(() => {
    mockRouter.push('/')
  })

  test('no results', async () => {
    const props = await getPaginationList({ initialPage: 0, initialPageSize: 0, totalItems: 0 })

    expect(props).toEqual<PaginationListProps>({
      currentPage: null,
      nextPageHref: null,
      previousPageHref: null,
      pages: [],
    })
  })

  test('only one page of results', async () => {
    const props = await getPaginationList({ initialPage: 0, initialPageSize: 5, totalItems: 5 })

    expect(props).toEqual<PaginationListProps>({
      currentPage: null,
      nextPageHref: null,
      previousPageHref: null,
      pages: [],
    })
  })

  test('show the first page of two', async () => {
    const props = await getPaginationList({ initialPage: 1, initialPageSize: 4, totalItems: 5 })

    expect(props).toEqual<PaginationListProps>({
      currentPage: 1,
      nextPageHref: {
        pathname,
        query: {
          page: 2,
          order: 'asc',
        },
      },
      previousPageHref: null,
      pages: [
        {
          href: {
            pathname,
            query: {
              page: 1,
              order: 'asc',
            },
          },
          page: 1,
        },
        {
          href: {
            pathname,
            query: {
              page: 2,
              order: 'asc',
            },
          },
          page: 2,
        },
      ],
    })
  })

  test('show the second page of two', async () => {
    const props = await getPaginationList({ initialPage: 2, initialPageSize: 4, totalItems: 5 })

    expect(props).toEqual<PaginationListProps>({
      currentPage: 2,
      nextPageHref: null,
      previousPageHref: {
        pathname,
        query: {
          page: 1,
          order: 'asc',
        },
      },
      pages: [
        {
          href: {
            pathname,
            query: {
              page: 1,
              order: 'asc',
            },
          },
          page: 1,
        },
        {
          href: {
            pathname,
            query: {
              page: 2,
              order: 'asc',
            },
          },
          page: 2,
        },
      ],
    })
  })

  test('show the second page of three', async () => {
    const props = await getPaginationList({ initialPage: 2, initialPageSize: 4, totalItems: 10 })

    expect(props).toEqual<PaginationListProps>({
      currentPage: 2,
      nextPageHref: {
        pathname,
        query: {
          page: 3,
          order: 'asc',
        },
      },
      previousPageHref: {
        pathname,
        query: {
          page: 1,
          order: 'asc',
        },
      },
      pages: [
        {
          href: {
            pathname,
            query: {
              page: 1,
              order: 'asc',
            },
          },
          page: 1,
        },
        {
          href: {
            pathname,
            query: {
              page: 2,
              order: 'asc',
            },
          },
          page: 2,
        },
        {
          href: {
            pathname,
            query: {
              page: 3,
              order: 'asc',
            },
          },
          page: 3,
        },
      ],
    })
  })
})
