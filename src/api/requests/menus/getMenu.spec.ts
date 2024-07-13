import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { sideMenu } from '@/mock-server/handlers/menus/v1/fixtures/side-menu'

import { getMenu } from './getMenu'

describe('GET menus/v1', () => {
  test('successful response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: sideMenu,
      status: 200,
    })

    expect(await getMenu()).toEqual({
      success: true,
      data: sideMenu,
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })

    expect(await getMenu()).toEqual({
      success: false,
      error: new ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'undefined',
          path: ['active_menu'],
          message: 'Required',
        },
      ]),
    })
  })
})
