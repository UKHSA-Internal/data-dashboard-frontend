import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { geographyMock } from '@/mock-server/handlers/geographies/v3/[topic]'

import { getGeographies } from './getGeographies'

describe('GET geographies/v3', () => {
  test('successful topic response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: geographyMock,
      status: 200,
    })

    expect(await getGeographies({ topic: 'COVID-19' })).toEqual({
      success: true,
      data: geographyMock,
    })
  })

  test('successful geography_type response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: geographyMock,
      status: 200,
    })

    expect(await getGeographies({ geography_type: 'Region' })).toEqual({
      success: true,
      data: geographyMock,
    })
  })

  test('failure response', async () => {
    jest.mocked(client).mockRejectedValueOnce({ data: null, status: 400 })

    expect(await getGeographies({ topic: 'Influenza' })).toEqual({
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
