import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { menu } from '@/mock-server/handlers/menus/v2/fixtures/menu'

import { getMenu } from './getMenu'

describe('GET menus/v2', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('successful response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: menu,
      status: 200,
    })

    expect(await getMenu()).toEqual({
      success: true,
      data: menu,
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })
    const { success, error } = await getMenu()
    expect(success).toEqual(false)
    expect(error).toEqual(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'undefined',
          path: ['active_menu'],
          message: 'Required',
        },
      ])
    )
  })

  test('logs and returns a parse error when the schema is invalid', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: { active_menu: 'no-menu-data' },
      status: 200,
    })

    const result = await getMenu()

    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('getMenu parse error:'))
  })
})
