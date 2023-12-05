import { z } from 'zod'

import { client } from '@/api/api-utils'
import { pagesWithHomeTypeMock } from '@/api/mocks/cms/data/pages'
import { logger } from '@/lib/logger'
import {
  pagesWithMetricsChildTypeMock,
  pagesWithWhatsNewChildTypeMock,
} from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { getMetricsPages, getPages, getWhatsNewPages, PageType, responseSchema } from './getPages'

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

const getPagesResponse = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getPages function tests', () => {
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

  test('Handles invalid json received from the api', async () => {
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

  test('Handles generic http errors', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getPages(PageType.Common)

    expect(logger.info).toHaveBeenNthCalledWith(1, 'GET success pages/?type=common.CommonPage')

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

describe('getWhatsNewPages function tests', () => {
  test('Returns a list of cms pages by type', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewChildTypeMock,
    })

    const response = await getWhatsNewPages()

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithWhatsNewChildTypeMock,
    })
  })

  test('Handles invalid json received from the api', async () => {
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

  test('Handles generic http errors', async () => {
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

describe('getMetricsPages function tests', () => {
  test('Returns a list of cms pages by type', async () => {
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

  test('Handles invalid json received from the api', async () => {
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

  test('Handles generic http errors', async () => {
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
