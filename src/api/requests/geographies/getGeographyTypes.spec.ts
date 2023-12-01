import { ZodError } from 'zod'

import { client } from '@/api/api-utils'
import { areaTypeMock } from '@/mock-server/handlers/geographies/v1/types'

import { getGeographyTypes } from './getGeographyTypes'

jest.mock('@/api/api-utils')

describe('GET geographies/v1/types', () => {
  test('successful response', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: areaTypeMock, status: 200 })
    expect(await getGeographyTypes()).toEqual({
      success: true,
      data: areaTypeMock,
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })
    expect(await getGeographyTypes()).toEqual({
      success: false,
      error: new ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          path: [],
          message: 'Expected array, received object',
        },
      ]),
    })
  })
})
