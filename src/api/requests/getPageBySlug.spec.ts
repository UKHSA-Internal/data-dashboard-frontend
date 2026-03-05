import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { ZodError } from 'zod'

import { logger } from '@/lib/logger'
import { whatsNewParentMock } from '@/mock-server/handlers/cms/pages/fixtures/page'
import { pagesWithWhatsNewParentTypeMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { client } from '../utils/api.utils'
import { getPageBySlug } from './getPageBySlug'

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}))

const getPages = jest.mocked(client)
const getPage = jest.mocked(client)
const getHeaders = jest.mocked(headers)

beforeEach(() => {
  jest.clearAllMocks()
  getHeaders.mockResolvedValue(new Headers())
})

describe('Successfully getting pages by slug from API', () => {
  test('returns page successfully', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewParentTypeMock,
    })
    getPage.mockResolvedValueOnce({
      status: 200,
      data: whatsNewParentMock,
    })

    const result = await getPageBySlug('whats-new')

    expect(result).toEqual(whatsNewParentMock)
  })

  test('returns draft page from drafts endpoint with bearer token', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: whatsNewParentMock,
    })

    const result = await getPageBySlug(['cover'], {
      t: 'draft-token',
    })

    expect(getPages).toHaveBeenCalledWith(
      'drafts/cover/',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer draft-token',
        },
        isPublic: false,
        cache: 'no-store',
        next: {
          revalidate: 0,
        },
      })
    )
    expect(result).toEqual(whatsNewParentMock)
  })

  test('returns draft page from nested route-style slug endpoint', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: whatsNewParentMock,
    })

    const result = await getPageBySlug(['respiratory-viruses', 'covid-19'], {
      t: 'draft-token',
    })

    expect(getPages).toHaveBeenCalledWith(
      'drafts/respiratory-viruses/covid-19/',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer draft-token',
        },
        isPublic: false,
        cache: 'no-store',
        next: {
          revalidate: 0,
        },
      })
    )
    expect(result).toEqual(whatsNewParentMock)
  })

  test('returns draft page using middleware-injected draft token header', async () => {
    const requestHeaders = new Headers()
    requestHeaders.set('x-cms-draft-token', 'draft-token')
    getHeaders.mockResolvedValueOnce(requestHeaders)

    getPages.mockResolvedValueOnce({
      status: 200,
      data: whatsNewParentMock,
    })

    const result = await getPageBySlug(['cover'])

    expect(getPages).toHaveBeenCalledWith(
      'drafts/cover/',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer draft-token',
        },
        isPublic: false,
        cache: 'no-store',
        next: {
          revalidate: 0,
        },
      })
    )
    expect(result).toEqual(whatsNewParentMock)
  })
})

describe('Failing to get page from cms API', () => {
  test('draft mode fails when route slug is missing', async () => {
    const result = await getPageBySlug([], {
      t: 'draft-token',
    })

    expect(logger.info).toHaveBeenCalledWith(new Error('Draft mode requires a non-empty route slug'))
    expect(notFound).toHaveBeenCalledTimes(1)
    expect(result).not.toBeDefined()
  })

  test('draft mode fails when draft response cannot be parsed', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: {
        invalid: true,
      },
    })

    const result = await getPageBySlug(['cover'], {
      t: 'draft-token',
    })

    expect(logger.error).toHaveBeenCalledWith(expect.any(ZodError))
    expect(logger.info).toHaveBeenCalledWith(
      new Error('Draft CMS page with slug cover does not match expected response schema')
    )
    expect(notFound).toHaveBeenCalledTimes(1)
    expect(result).not.toBeDefined()
  })

  test('getting the pages from the API fails with a server error', async () => {
    getPages.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'API call failed',
    })

    const result = await getPageBySlug('incorrect')

    expect(logger.info).toHaveBeenNthCalledWith(
      1,
      new Error(`Failed to parse CMS pages from API - There is likely an issue with the API response`)
    )
    expect(notFound).toHaveBeenCalledTimes(1)

    expect(result).not.toBeDefined()
  })

  test('unable to match provided slug with pages returned from the API', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewParentTypeMock,
    })

    const result = await getPageBySlug('slugDoesntExist')

    expect(logger.info).toHaveBeenCalledWith(new Error(`No page found for slug slugDoesntExist`))
    expect(notFound).toHaveBeenCalledTimes(1)

    expect(result).not.toBeDefined()
  })

  test('getting a page with the matched ID fails with a server error', async () => {
    getPages.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewParentTypeMock,
    })
    getPage.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'ID not found',
    })
    const slugToTest = 'whats-new'
    const matchingId = pagesWithWhatsNewParentTypeMock.items[0].id

    const result = await getPageBySlug(slugToTest)

    expect(logger.error).toHaveBeenCalledWith(expect.any(ZodError))
    expect(logger.info).toHaveBeenCalledWith(
      new Error(`CMS page with slug ${slugToTest} and id ${matchingId} does not match expected response schema`)
    )
    expect(notFound).toHaveBeenCalledTimes(1)
    expect(result).not.toBeDefined()
  })
})
