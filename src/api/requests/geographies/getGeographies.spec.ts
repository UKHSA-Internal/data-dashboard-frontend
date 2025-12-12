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

  test('throws error when both topic and geography_type are provided', async () => {
    const result = await getGeographies({ topic: 'COVID-19', geography_type: 'Region' })
    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
  })

  test('throws error when neither topic nor geography_type is provided', async () => {
    const result = await getGeographies({})
    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
  })

  test('handles parse error for geography_type response', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: { invalid: 'data' },
      status: 200,
    })

    const result = await getGeographies({ geography_type: 'Region' })
    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
  })

  test('handles catch error for geography_type request', async () => {
    jest.mocked(client).mockRejectedValueOnce(new Error('Network error'))

    const result = await getGeographies({ geography_type: 'Region' })
    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
  })
})
