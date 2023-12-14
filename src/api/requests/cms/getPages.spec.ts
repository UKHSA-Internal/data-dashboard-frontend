import { z } from 'zod'

import { client } from '@/api/api-utils'
import { pagesWithHomeTypeMock } from '@/api/mocks/cms/data/pages'
import { logger } from '@/lib/logger'
import {
  pagesWithMetricsChildTypeMock,
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

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

const getPagesResponse = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Successfully getting all pages from the cms api ', () => {
  test('Returns a list of cms pages by type', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithHomeTypeMock,
    })

    const response = await getPages(PageType.Home)

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithHomeTypeMock,
    })
  })
})

// Pages tests
describe('Failing to get all pages from the cms api', () => {
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

    const response = await getPages(PageType.Home)

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

    const result = await getPages(PageType.Common)

    expect(logger.info).toHaveBeenNthCalledWith(1, 'GET success pages/?type=common.CommonPage&limit=100')

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

// What's new tests
describe("Successfully getting all What's new child pages from the cms api", () => {
  test("returns a list of What's new child pages", async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewChildTypeMock,
    })

    const response = await getWhatsNewPages()

    expect(response).toEqual<WhatsNewSuccessResponse>({
      success: true,
      data: {
        meta: {
          total_count: 3,
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

    const response = await getWhatsNewPages()

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

    const result = await getWhatsNewPages()

    expect(logger.info).toHaveBeenNthCalledWith(1, 'GET success pages/?type=whats_new.WhatsNewChildEntry&fields=*')

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

    const response = await getMetricsPages()

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

    const response = await getMetricsPages()

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

    const result = await getMetricsPages()

    expect(logger.info).toHaveBeenNthCalledWith(
      1,
      'GET success pages/?type=metrics_documentation.MetricsDocumentationChildEntry&fields=*'
    )

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
