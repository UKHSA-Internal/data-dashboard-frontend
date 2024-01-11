import { ZodError } from 'zod'

import { client } from '@/api/api-utils'
import { mockRegions } from '@/mock-server/handlers/geographies/v1/types/fixtures'

import { getGeographyNames } from './getGeographyNames'

describe('GET geographies/v1/types/:id', () => {
  test('successful response', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: { geographies: mockRegions }, status: 200 })
    expect(await getGeographyNames(1)).toEqual({
      success: true,
      data: {
        geographies: mockRegions,
      },
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })
    expect(await getGeographyNames(1)).toEqual({
      success: false,
      error: new ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'undefined',
          path: ['geographies'],
          message: 'Required',
        },
      ]),
    })
  })
})
