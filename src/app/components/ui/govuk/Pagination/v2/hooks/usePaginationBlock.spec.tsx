import { usePathname } from '@/app/hooks/usePathname'

import { usePaginationBlock } from './usePaginationBlock'

jest.mock('@/app/hooks/usePathname', () => ({
  usePathname: jest.fn(),
}))

describe('usePaginationBlock', () => {
  const usePathnameMock = jest.mocked(usePathname)

  test("when on first page, only 'next' button shows", async () => {
    usePathnameMock.mockReturnValue('/access-our-data/overview')

    const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
      links: [
        { pageHref: '/access-our-data/overview', pageText: 'Overview' },
        { pageHref: '/access-our-data/what-is-an-api', pageText: 'What is an API' },
        { pageHref: '/access-our-data/getting-started', pageText: 'Getting started' },
      ],
    })

    expect(previousText).toBeNull()
    expect(previousPageHref).toBeNull()
    expect(nextText).toEqual('What is an API')
    expect(nextPageHref).toEqual('/access-our-data/what-is-an-api')
  })

  test("when on last page, only 'previous' button shows", async () => {
    usePathnameMock.mockReturnValue('/access-our-data/getting-started')

    const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
      links: [
        { pageHref: '/access-our-data/overview', pageText: 'Overview' },
        { pageHref: '/access-our-data/what-is-an-api', pageText: 'What is an API' },
        { pageHref: '/access-our-data/getting-started', pageText: 'Getting started' },
      ],
    })

    expect(previousText).toEqual('What is an API')
    expect(previousPageHref).toEqual('/access-our-data/what-is-an-api')
    expect(nextText).toBeNull()
    expect(nextPageHref).toBeNull()
  })

  test('when on any other page, show both next & previous buttons', async () => {
    usePathnameMock.mockReturnValue('/access-our-data/what-is-an-api')

    const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
      links: [
        { pageHref: '/access-our-data/overview', pageText: 'Overview' },
        { pageHref: '/access-our-data/what-is-an-api', pageText: 'What is an API' },
        { pageHref: '/access-our-data/getting-started', pageText: 'Getting started' },
      ],
    })

    expect(previousText).toEqual('Overview')
    expect(previousPageHref).toEqual('/access-our-data/overview')
    expect(nextText).toEqual('Getting started')
    expect(nextPageHref).toEqual('/access-our-data/getting-started')
  })

  test('when on default route (no subpage), only the next button shows', async () => {
    usePathnameMock.mockReturnValue('/access-our-data')

    const { previousText, previousPageHref, nextText, nextPageHref } = usePaginationBlock({
      links: [
        { pageHref: '/access-our-data/overview', pageText: 'Overview' },
        { pageHref: '/access-our-data/what-is-an-api', pageText: 'What is an API' },
        { pageHref: '/access-our-data/getting-started', pageText: 'Getting started' },
      ],
    })

    expect(previousText).toBeNull()
    expect(previousPageHref).toBeNull()
    expect(nextText).toEqual('What is an API')
    expect(nextPageHref).toEqual('/access-our-data/what-is-an-api')
  })
})
