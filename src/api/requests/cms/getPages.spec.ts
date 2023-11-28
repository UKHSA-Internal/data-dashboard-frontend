import { z } from 'zod'

import { client } from '@/api/api-utils'

// import { logger } from '@/lib/logger'
import { getPages, PageType, responseSchema } from './getPages'

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')
const getPagesResponse = jest.mocked(client)

test('Returns a list of cms pages by type', async () => {
  getPagesResponse.mockResolvedValueOnce({
    status: 200,
    data: {
      items: [
        {
          id: 4,
          meta: {
            detail_url: 'http://localhost/api/pages/4/',
            first_published_at: '2023-09-06T13:51:55.724310+01:00',
            html_url: null,
            show_in_menus: true,
            slug: 'dashboard',
            type: 'home.HomePage',
          },
          title: 'UKHSA data dashboard',
        },
      ],
      meta: {
        total_count: 1,
      },
    },
  })

  const response = await getPages(PageType.Home)

  expect(response).toEqual<SuccessResponse>({
    success: true,
    data: {
      items: [
        {
          id: 4,
          meta: {
            detail_url: 'http://localhost/api/pages/4/',
            first_published_at: '2023-09-06T13:51:55.724310+01:00',
            html_url: null,
            show_in_menus: true,
            slug: 'dashboard',
            type: 'home.HomePage',
          },
          title: 'UKHSA data dashboard',
        },
      ],
      meta: {
        total_count: 1,
      },
    },
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

  // TODO: Check why logger isn't being called
  // expect(logger.error).toHaveBeenCalledTimes(1)

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
