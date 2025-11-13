import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import {
  allPagesMock,
  pagesWithLandingTypeMock,
  pagesWithMetricsChildTypeMock,
  pagesWithTopicTypeMock,
  pagesWithWhatsNewChildTypeMock,
} from '@/mock-server/handlers/cms/pages/fixtures/pages'

import {
  getMetricsPages,
  getPages,
  getWhatsNewPages,
  PageType,
  responseSchema,
  whatsNewResponseSchema,
} from './getPages'

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type WhatsNewSuccessResponse = z.SafeParseSuccess<z.infer<typeof whatsNewResponseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

const getPagesResponse = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Successfully getting all pages from the cms api ', () => {
  test('Returns a list of cms pages by type', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithLandingTypeMock,
    })

    const response = await getPages({ type: PageType.Landing })

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithLandingTypeMock,
    })
  })
})

// Pages tests
describe('getPages', () => {
  test('returns and error when it receives invalid http status code', async () => {
    const loggerSpy = jest.spyOn(logger, 'error').mockImplementation()
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getPages({ type: PageType.Common })

    expect(result.success).toBe(false)
    if (result.success) {
      throw new Error('Expected error result')
    }
    expect(result.error.issues).toEqual([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'undefined',
        path: ['items'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'undefined',
        path: ['meta'],
        message: 'Required',
      },
    ])

    loggerSpy.mockRestore()
  })
  test('returns a list of pages', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: allPagesMock,
    })

    const result = await getPages()

    expect(result.success).toBe(true)

    if (!result.success) {
      throw new Error('Expected successful parse result')
    }

    expect(result.data.meta).toEqual({
      total_count: allPagesMock.items.length,
    })
    expect(result.data.items).toHaveLength(allPagesMock.items.length)
    expect(result.data.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          seo_change_frequency: expect.any(Number),
          seo_priority: expect.any(Number),
          meta: expect.objectContaining({
            type: expect.any(String),
            detail_url: expect.any(String),
            html_url: expect.any(String),
            slug: expect.any(String),
            search_description: expect.any(String),
            show_in_menus: expect.any(Boolean),
            first_published_at: expect.any(String),
          }),
        }),
      ])
    )
  })
  test('makes single request when total count is less than limit', async () => {
    const smallMock = {
      items: allPagesMock.items.slice(0, 10),
      meta: { total_count: 10 },
    }

    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: smallMock,
    })

    const result = await getPages()

    expect(result.success).toBe(true)
    expect(getPagesResponse).toHaveBeenCalledTimes(1)
  })

  test('makes multiple requests when total count exceeds limit of 50', async () => {
    const totalItems = 113 // This should require 3 requests (50, 50, 25)
    const firstPageItems = allPagesMock.items.slice(0, 50)
    const secondPageItems = allPagesMock.items.slice(50, 100)
    const thirdPageItems = allPagesMock.items.slice(100, 113)

    getPagesResponse
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: firstPageItems,
          meta: { total_count: totalItems },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: secondPageItems,
          meta: { total_count: totalItems },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: thirdPageItems,
          meta: { total_count: totalItems },
        },
      })

    const result = await getPages()

    expect(result.success).toBe(true)

    if (!result.success) {
      throw new Error('Expected successful parse result')
    }

    expect(result.data.items).toHaveLength(totalItems)
    expect(result.data.meta.total_count).toBe(totalItems)
    expect(getPagesResponse).toHaveBeenCalledTimes(3)
  })

  test('includes additional params in initial request', async () => {
    const additionalParams = { type: 'topic.TopicPage' }

    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithTopicTypeMock,
    })

    await getPages(additionalParams)

    const firstCallArgs = getPagesResponse.mock.calls[0]
    const searchParams = firstCallArgs[1]?.searchParams as URLSearchParams

    expect(searchParams.get('type')).toBe('topic.TopicPage')
    expect(searchParams.get('limit')).toBe('50')
    expect(searchParams.get('fields')).toBe('*')
    expect(searchParams.get('offset')).toBe('0')
  })

  test('includes additional params in all paginated requests', async () => {
    const additionalParams = { type: 'common.CommonPage' }
    const totalItems = 125

    const firstPageItems = allPagesMock.items.slice(0, 50)
    const secondPageItems = allPagesMock.items.slice(50, 100)
    const thirdPageItems = allPagesMock.items.slice(100, 125)

    getPagesResponse
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: firstPageItems,
          meta: { total_count: totalItems },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: secondPageItems,
          meta: { total_count: totalItems },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          items: thirdPageItems,
          meta: { total_count: totalItems },
        },
      })

    await getPages(additionalParams)

    // Check all calls include the additional params
    getPagesResponse.mock.calls.forEach((call) => {
      const searchParams = call[1]?.searchParams as URLSearchParams
      expect(searchParams.get('type')).toBe('common.CommonPage')
    })
  })
  test('returns error when initial request fails validation', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: 'invalid data', // Wrong structure
        meta: { total_count: 1 },
      },
    })

    const result = await getPages()

    expect(result.success).toBe(false)
  })
})

// What's new tests
describe("Successfully getting all What's new child pages from the cms api", () => {
  test("returns a list of What's new child pages", async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewChildTypeMock,
    })

    const response = await getWhatsNewPages({ page: 1 })

    expect(response).toEqual<WhatsNewSuccessResponse>({
      success: true,
      data: {
        meta: {
          total_count: pagesWithWhatsNewChildTypeMock.items.length,
        },
        items: pagesWithWhatsNewChildTypeMock.items.map((entry) => ({
          ...entry,
          badge: {
            text: entry.badge?.text ?? '',
            colour: entry.badge?.colour ? entry.badge?.colour.toLowerCase() : '',
          },
        })),
      },
    })
  })
})

describe("Failing to get all What's new child pages from the cms api", () => {
  test('invalid json received from the api returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: null,
        meta: {
          total_count: 1,
        },
      },
    })

    const response = await getWhatsNewPages({ page: 1 })

    expect(response).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: ['items'],
          message: 'Expected array, received null',
        },
      ]),
    })
  })

  test('invalid http status code returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getWhatsNewPages({ page: 1 })

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'undefined',
          path: ['items'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['meta'],
          message: 'Required',
        },
      ]),
    })
  })
})

// Metrics documentation tests
describe('Successfully getting all Metrics Documentation child pages from the cms api', () => {
  test('returns a list of Metrics Documentation child pages', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithMetricsChildTypeMock,
    })

    const response = await getMetricsPages({ search: undefined, page: 1 })

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithMetricsChildTypeMock,
    })
  })

  test('returns a list of Metrics Documentation child pages from search criteria', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithMetricsChildTypeMock,
    })

    const response = await getMetricsPages({ search: 'test', page: 1 })

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithMetricsChildTypeMock,
    })
  })
})

describe('Failing to get all Metrics Documentation pages from the cms api', () => {
  test('invalid json received from the api returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: null,
        meta: {
          total_count: 1,
        },
      },
    })

    const response = await getMetricsPages({ search: undefined, page: 1 })

    expect(response).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: ['items'],
          message: 'Expected array, received null',
        },
      ]),
    })
  })

  test('invalid http status code returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getMetricsPages({ search: undefined, page: 1 })

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'undefined',
          path: ['items'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['meta'],
          message: 'Required',
        },
      ]),
    })
  })
})
