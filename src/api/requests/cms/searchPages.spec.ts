import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { searchPages, type SearchResponse } from './searchPages'

type SuccessResponse = z.SafeParseSuccess<SearchResponse>

const mockClient = jest.mocked(client)

const validSearchResponse: SearchResponse = {
  items: [
    {
      title: 'Influenza surveillance',
      sub_title: 'Weekly report',
      meta: {
        type: 'topic.TopicPage',
        detail_url: '/api/v2/pages/1/',
        html_url: '/topics/influenza/',
        slug: 'influenza',
        search_description: 'Flu metrics',
      },
    },
    {
      title: 'Minimal result',
      meta: {
        type: 'common.CommonPage',
        detail_url: '/api/v2/pages/2/',
        html_url: null,
        slug: 'minimal',
      },
    },
  ],
  meta: {
    total_count: 2,
  },
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('searchPages', () => {
  test('returns parsed search results when the API response is valid', async () => {
    mockClient.mockResolvedValueOnce({
      status: 200,
      data: validSearchResponse,
    })

    const result = await searchPages({ limit: '20', search: 'flu' })

    expect(result).toEqual<SuccessResponse>({
      success: true,
      data: validSearchResponse,
    })
  })

  test('calls the search endpoint with the expected query parameters', async () => {
    mockClient.mockResolvedValueOnce({
      status: 200,
      data: validSearchResponse,
    })

    await searchPages({ limit: '15', search: 'covid' })

    expect(mockClient).toHaveBeenCalledTimes(1)
    const [url, options] = mockClient.mock.calls[0]
    expect(url).toBe('proxy/pages/search')

    const searchParams = options?.searchParams as URLSearchParams
    expect(searchParams.get('fields')).toBe('title')
    expect(searchParams.get('limit')).toBe('15')
    expect(searchParams.get('offset')).toBe('0')
    expect(searchParams.get('search')).toBe('covid')
  })

  test('logs a validation error and returns a failed parse when the payload does not match the schema', async () => {
    const loggerSpy = jest.spyOn(logger, 'error').mockImplementation()
    const invalidPayload = {
      items: null,
      meta: { total_count: 0 },
    }

    mockClient.mockResolvedValueOnce({
      status: 200,
      data: invalidPayload,
    })

    const result = await searchPages({ limit: '10', search: 'x' })

    expect(result.success).toBe(false)
    expect(loggerSpy).toHaveBeenCalled()
    expect(loggerSpy.mock.calls[0][0]).toBe('Search Zod Validation error: ')

    loggerSpy.mockRestore()
  })

  test('logs and returns a failed parse when the client throws', async () => {
    const loggerSpy = jest.spyOn(logger, 'error').mockImplementation()
    const networkError = new Error('Network failure')
    mockClient.mockRejectedValueOnce(networkError)

    const result = await searchPages({ limit: '10', search: 'test' })

    expect(loggerSpy).toHaveBeenCalledWith(networkError)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()

    loggerSpy.mockRestore()
  })
})
