import { notFound } from 'next/navigation'
import { ZodError } from 'zod'

import { logger } from '@/lib/logger'
import { whatsNewParentMock } from '@/mock-server/handlers/cms/pages/fixtures/page'
import { pagesWithWhatsNewParentTypeMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { client } from '../utils/api.utils'
import { getPageBySlug } from './getPageBySlug'

const getPages = jest.mocked(client)
const getPage = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
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
})

describe('Failing to get page from cms API', () => {
  test('getting the pages from the API fails with a server error', async () => {
    getPages.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'API call failed',
    })

    const result = await getPageBySlug('incorrect')

    expect(logger.info).toHaveBeenNthCalledWith(1, new Error(`Could not get cms pages`))
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
