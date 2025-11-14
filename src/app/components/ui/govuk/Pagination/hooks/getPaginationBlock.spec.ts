import { getPathname } from '@/app/hooks/getPathname'

import { getPaginationBlock } from './getPaginationBlock'

jest.mock('@/app/hooks/getPathname', () => ({
  getPathname: jest.fn(),
}))

describe('getPaginationBlock', () => {
  const getPathnameMock = jest.mocked(getPathname)

  test("when on first page, only 'next' button shows", async () => {
    getPathnameMock.mockReturnValue('/access-our-data/overview')

    const { previousText, previousPageHref, nextText, nextPageHref } = await getPaginationBlock({
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
    getPathnameMock.mockReturnValue('/access-our-data/getting-started')

    const { previousText, previousPageHref, nextText, nextPageHref } = await getPaginationBlock({
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
    getPathnameMock.mockReturnValue('/access-our-data/what-is-an-api')

    const { previousText, previousPageHref, nextText, nextPageHref } = await getPaginationBlock({
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
    getPathnameMock.mockReturnValue('/access-our-data')

    const { previousText, previousPageHref, nextText, nextPageHref } = await getPaginationBlock({
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
