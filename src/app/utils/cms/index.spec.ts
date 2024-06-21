import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageType } from '@/api/requests/cms/getPages'
import { client } from '@/api/utils/api.utils'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'
import { bulkDownloadsPageMock, covid19PageMock, dashboardMock } from '@/mock-server/handlers/cms/pages/fixtures/page'
import {
  pagesWithCompositeTypeMock,
  pagesWithHomeTypeMock,
  pagesWithTopicTypeMock,
} from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { getHomePage, getPageById, getPageMetadata, getPagesByContentType, getPageTypeBySlug } from '.'

const getPage = jest.mocked(client)
const getPages = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getPageMetadata', () => {
  test('Getting metadata for the home page', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithHomeTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: dashboardMock,
    })

    const slug: Slug = []
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.Home)

    expect(result).toEqual<Metadata>({
      alternates: { canonical: 'http://fake-backend.gov.uk' },
      description: 'Overall summary of the respiratory viruses in circulation within the UK',
      openGraph: {
        description: 'Overall summary of the respiratory viruses in circulation within the UK',
        title: 'UKHSA data dashboard',
      },
      title: 'UKHSA data dashboard',
      twitter: {
        description: 'Overall summary of the respiratory viruses in circulation within the UK',
        title: 'UKHSA data dashboard',
      },
    })
  })

  test('Getting metadata for a composite page', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithCompositeTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: bulkDownloadsPageMock,
    })

    const slug: Slug = ['bulk-downloads']
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.Composite)

    expect(result).toEqual<Metadata>({
      alternates: { canonical: 'http://fake-backend.gov.uk/bulk-downloads' },
      description: 'Mocked bulk downloads page description',
      openGraph: {
        description: 'Mocked bulk downloads page description',
        title: 'Bulk downloads | UKHSA data dashboard',
      },
      title: 'Bulk downloads | UKHSA data dashboard',
      twitter: {
        description: 'Mocked bulk downloads page description',
        title: 'Bulk downloads | UKHSA data dashboard',
      },
    })
  })

  test('Failing to get page metadata', async () => {
    getPages.mockRejectedValueOnce({
      success: false,
      data: null,
      error: 'API call failed',
    })

    const slug: Slug = ['bulk-downloads']
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.Composite)

    expect(logger.error).toHaveBeenCalledWith({
      data: null,
      error: 'API call failed',
      success: false,
    })
    expect(notFound).toHaveBeenCalled()
    expect(result).not.toBeDefined()
  })
})

describe('getPageTypeBySlug', () => {
  describe('Successfully getting page type by slug from the API', () => {
    test('returns page successfully', async () => {
      getPages.mockResolvedValueOnce({
        status: 200,
        data: pagesWithTopicTypeMock,
      })
      getPage.mockResolvedValueOnce({
        status: 200,
        data: covid19PageMock,
      })

      const result = await getPageTypeBySlug(['covid-19'])

      expect(result).toEqual(PageType.Topic)
    })
  })
})

describe('getHomePage', () => {
  describe('Successfully getting the home page from the API', () => {
    test('returns page successfully', async () => {
      getPages.mockResolvedValueOnce({
        status: 200,
        data: pagesWithHomeTypeMock,
      })
      getPage.mockResolvedValueOnce({
        status: 200,
        data: dashboardMock,
      })
      const result = await getHomePage()

      expect(result).toEqual(dashboardMock)
    })
  })

  describe('Failing to get the home page from the API', () => {
    test('getting the page from the API fails with a server error', async () => {
      getPages.mockRejectedValueOnce({
        success: false,
        data: null,
        error: 'API call failed',
      })
      const result = await getHomePage()

      expect(logger.error).toHaveBeenCalledWith(expect.any(Error))
      expect(notFound).toHaveBeenCalledTimes(2)

      expect(result).not.toBeDefined()
    })

    test('getting the page from the API fails due to no home page existing within the root', async () => {
      getPages.mockResolvedValueOnce({
        status: 200,
        data: {
          ...pagesWithHomeTypeMock,
          items: [
            {
              ...pagesWithHomeTypeMock.items[0],
              title: 'UKHSA Dashboard Root',
            },
          ],
        },
      })
      const result = await getHomePage()

      expect(logger.error).toHaveBeenCalledWith(new Error('No homepage matches found'))
      expect(notFound).toHaveBeenCalledTimes(1)

      expect(result).not.toBeDefined()
    })
  })
})

describe('getPagesByContentType', () => {
  describe('Successfully getting pages by content type from the API', () => {
    test('returns page successfully', async () => {
      getPages.mockResolvedValueOnce({
        status: 200,
        data: pagesWithHomeTypeMock,
      })

      const result = await getPagesByContentType(PageType.Home)

      expect(result).toEqual(pagesWithHomeTypeMock)
    })
  })

  describe('Failing to get pages from content type from the API', () => {
    test('getting the pages from the API fails with a server error', async () => {
      getPages.mockRejectedValueOnce({
        success: false,
        data: null,
        error: 'API call failed',
      })

      const result = await getPagesByContentType(PageType.Home)

      expect(logger.error).toHaveBeenCalledWith(expect.any(Error))
      expect(notFound).toHaveBeenCalledTimes(1)

      expect(result).not.toBeDefined()
    })
  })
})

describe('getPageById', () => {
  describe('Successfully getting page by id from API', () => {
    test('returns page successfully', async () => {
      getPage.mockResolvedValueOnce({
        status: 200,
        data: dashboardMock,
      })

      const result = await getPageById(1)

      expect(result).toEqual(dashboardMock)
    })
  })

  describe('Failing to get page from cms API', () => {
    test('getting the page from the API fails with a server error', async () => {
      getPage.mockRejectedValueOnce({
        success: false,
        data: null,
        error: 'API call failed',
      })

      const result = await getPageById(1)

      expect(logger.error).toHaveBeenCalledWith(expect.any(Error))
      expect(notFound).toHaveBeenCalledTimes(1)

      expect(result).not.toBeDefined()
    })
  })
})
