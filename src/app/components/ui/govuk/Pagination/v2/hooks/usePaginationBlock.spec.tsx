import { usePathname } from '@/app/hooks/usePathname'

import { usePaginationBlock } from './usePaginationBlock'

describe('usePaginationBlock', () => {
  jest.mock('@/app/hooks/usePathname', () => ({
    usePathname: jest.fn(),
  }))
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

    expect(previousText).tobe(null)
    expect(previousPageHref).tobe(null)
    expect(nextText).tobe('What is an API')
    expect(nextPageHref).tobe('/access-our-data/what-is-an-api')
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

    expect(previousText).tobe('What is an API')
    expect(previousPageHref).tobe('/access-our-data/what-is-an-api')
    expect(nextText).tobe(null)
    expect(nextPageHref).tobe(null)
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

    expect(previousText).tobe('Overview')
    expect(previousPageHref).tobe('/access-our-data/overview')
    expect(nextText).tobe('Getting started')
    expect(nextPageHref).tobe('/access-our-data/getting-started')
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

    expect(previousText).tobe(null)
    expect(previousPageHref).tobe(null)
    expect(nextText).tobe('What is an API')
    expect(nextPageHref).tobe('/access-our-data/what-is-an-api')
  })
})
