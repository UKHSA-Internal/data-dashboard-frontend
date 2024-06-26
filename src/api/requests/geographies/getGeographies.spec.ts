import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { geographyMock } from '@/mock-server/handlers/geographies/v2/[topic]'

import { getGeographies } from './getGeographies'

describe('GET geographies/v2/:topic', () => {
  test('successful response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: geographyMock,
      status: 200,
    })

    expect(await getGeographies('COVID-19')).toEqual({
      success: true,
      data: geographyMock,
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })

    expect(await getGeographies('Influenza')).toEqual({
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
