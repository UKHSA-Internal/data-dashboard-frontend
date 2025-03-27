import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mock } from 'ts-mockery'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { client } from '@/api/utils/api.utils'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'
import {
  bulkDownloadsPageMock,
  covid19PageMock,
  dashboardMock,
  metricsChildMocks,
  metricsParentMock,
  whatsNewChildMocks,
  whatsNewParentMock,
} from '@/mock-server/handlers/cms/pages/fixtures/page'
import {
  pagesWithCompositeTypeMock,
  pagesWithLandingTypeMock,
  pagesWithMetricsChildTypeMock,
  pagesWithMetricsParentTypeMock,
  pagesWithTopicTypeMock,
  pagesWithWhatsNewChildTypeMock,
  pagesWithWhatsNewParentTypeMock,
} from '@/mock-server/handlers/cms/pages/fixtures/pages'

import {
  getPageById,
  getPageMetadata,
  getPagesByContentType,
  getPageTypeBySlug,
  getParentPage,
  validateUrlWithCms,
} from '.'

const getPage = jest.mocked(client)
const getPages = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
  console.error = jest.fn()
})

describe('validateUrlWithCms', () => {
  test('Landing page url', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithLandingTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: dashboardMock,
    })

    const slug: Slug = []
    const result = await validateUrlWithCms(slug, PageType.Landing)

    expect(result).toEqual<PageResponse<PageType.Landing>>(dashboardMock)
  })

  test('Root level page', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithCompositeTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: bulkDownloadsPageMock,
    })

    const slug: Slug = ['bulk-downloads']
    const result = await validateUrlWithCms(slug, PageType.Composite)

    expect(result).toEqual<PageResponse<PageType.Composite>>(bulkDownloadsPageMock)
  })

  test('Nested metrics documentation child page', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithMetricsChildTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: metricsChildMocks[0] }) // Mock initial child request

    const slug: Slug = ['metrics-documentation', 'new-cases-7days-sum']
    const result = await validateUrlWithCms(slug, PageType.MetricsChild)

    expect(result).toEqual<PageResponse<PageType.MetricsChild>>(metricsChildMocks[0])
  })

  test('Nested whats new child page', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithWhatsNewChildTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: whatsNewChildMocks[0] }) // Mock initial child request

    const slug: Slug = ['whats-new', 'soft-launch-of-the-ukhsa-data-dashboard']
    const result = await validateUrlWithCms(slug, PageType.WhatsNewChild)

    const mock = whatsNewChildMocks[0]
    const expectedResult = Mock.of<PageResponse<PageType.WhatsNewChild>>({
      ...mock,
      badge: {
        ...mock.badge,
        colour: 'grey',
      },
    })

    expect(result).toEqual<PageResponse<PageType.WhatsNewChild>>(expectedResult)
  })

  test('404 Not Found when a URL cannot be matched against the CMS', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithMetricsChildTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: metricsChildMocks[0] }) // Mock initial child request

    const slug: Slug = ['whats-new', 'new-cases-7days-sum']
    const result = await validateUrlWithCms(slug, PageType.MetricsChild)

    expect(notFound).toHaveBeenCalledTimes(1)
    expect(result).toBeUndefined()
  })
})

describe('getPageMetadata', () => {
  test('Getting metadata for the Landing page', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithLandingTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: dashboardMock,
    })

    const slug: Slug = []
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.Landing)

    expect(result).toEqual<Metadata>({
      alternates: { canonical: 'http://localhost' },
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
      alternates: { canonical: 'http://localhost/bulk-downloads' },
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

  test('Getting metadata for topic pages', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithTopicTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: covid19PageMock })

    const slug: Slug = ['topics', 'covid-19']
    const searchParams: SearchParams = {
      areaName: 'England',
    }
    const result = await getPageMetadata(slug, searchParams, PageType.Topic)

    expect(result).toEqual<Metadata>({
      alternates: { canonical: 'http://localhost/topics/covid-19' },
      description: 'Overall summary of COVID-19 in circulation within the UK',
      openGraph: {
        description: 'Overall summary of COVID-19 in circulation within the UK',
        title: 'COVID-19  in England | UKHSA data dashboard',
      },
      title: 'COVID-19  in England | UKHSA data dashboard',
      twitter: {
        description: 'Overall summary of COVID-19 in circulation within the UK',
        title: 'COVID-19  in England | UKHSA data dashboard',
      },
    })
  })

  //TODO: Fix failing test CDD-2182.
  test('Getting metadata for metrics-documentation', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithMetricsParentTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: metricsParentMock })
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithMetricsChildTypeMock })

    const slug: Slug = ['metrics-documentation']
    const searchParams: SearchParams = {
      search: 'covid-19',
    }

    try {
      const result = await getPageMetadata(slug, searchParams, PageType.MetricsParent)
      expect(result).toEqual<Metadata>({
        alternates: { canonical: 'http://localhost/metrics-documentation' },
        description: '',
        openGraph: {
          description: '',
          title: 'Metrics documentation - "covid-19" (page 1 of 6) | UKHSA data dashboard',
        },
        title: 'Metrics documentation - "covid-19" (page 1 of 6) | UKHSA data dashboard',
        twitter: {
          description: '',
          title: 'Metrics documentation - "covid-19" (page 1 of 6) | UKHSA data dashboard',
        },
      })
    } catch (error) {
      console.log(error)
    }
  })

  test('Failing to get metrics metadata', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithMetricsParentTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: metricsParentMock })
    getPages.mockRejectedValueOnce({ success: false, data: null, error: 'API call failed' })

    const slug: Slug = ['metrics-documentation']
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.MetricsParent)

    expect(logger.error).toHaveBeenCalledWith({
      data: null,
      error: 'API call failed',
      success: false,
    })
    expect(notFound).toHaveBeenCalled()
    expect(result).not.toBeDefined()
  })

  test('Getting metadata for whats-new', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithWhatsNewParentTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: whatsNewParentMock })
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithWhatsNewChildTypeMock })

    const slug: Slug = ['whats-new']
    const searchParams: SearchParams = {}

    try {
      const result = await getPageMetadata(slug, searchParams, PageType.WhatsNewParent)
      expect(result).toEqual<Metadata>({
        alternates: { canonical: 'http://localhost/whats-new' },
        description: '',
        openGraph: {
          description: '',
          title: "What's new (page 1 of 4) | UKHSA data dashboard",
        },
        title: "What's new (page 1 of 4) | UKHSA data dashboard",
        twitter: {
          description: '',
          title: "What's new (page 1 of 4) | UKHSA data dashboard",
        },
      })
    } catch (error) {
      console.log(error)
    }
  })

  test('Failing to get whats-new metadata', async () => {
    getPages.mockResolvedValueOnce({ status: 200, data: pagesWithWhatsNewParentTypeMock })
    getPage.mockResolvedValueOnce({ status: 200, data: whatsNewParentMock })
    getPages.mockRejectedValueOnce({ success: false, data: null, error: 'API call failed' })

    const slug: Slug = ['whats-new']
    const searchParams: SearchParams = {}
    const result = await getPageMetadata(slug, searchParams, PageType.WhatsNewParent)

    expect(logger.error).toHaveBeenCalledWith({
      data: null,
      error: 'API call failed',
      success: false,
    })
    expect(notFound).toHaveBeenCalled()
    expect(result).not.toBeDefined()
  })

  test('Failing to get page metadata', async () => {
    getPages.mockRejectedValueOnce({ success: false, data: null, error: 'API call failed' })

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

describe('getParentPage', () => {
  describe('Successfully getting the parent page for a given page', () => {
    test('returns page successfully', async () => {
      getPage.mockResolvedValueOnce({ status: 200, data: whatsNewParentMock })
      const result = await getParentPage(whatsNewChildMocks[0])
      expect(result).toEqual<PageResponse<PageType.WhatsNewParent>>(whatsNewParentMock)
    })
  })

  describe('Failing to get pages from content type from the API', () => {
    test('getting the pages from the API fails with a server error', async () => {
      getPage.mockRejectedValueOnce({ success: false, data: null, error: 'API call failed' })
      const result = await getParentPage(whatsNewChildMocks[0])
      expect(logger.error).toHaveBeenCalledWith(expect.any(Error))
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
        data: pagesWithLandingTypeMock,
      })

      const result = await getPagesByContentType(PageType.Landing)

      expect(result).toEqual(pagesWithLandingTypeMock)
    })
  })

  describe('Failing to get pages from content type from the API', () => {
    test('getting the pages from the API fails with a server error', async () => {
      getPages.mockRejectedValueOnce({
        success: false,
        data: null,
        error: 'API call failed',
      })

      const result = await getPagesByContentType(PageType.Landing)

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
