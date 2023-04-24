import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import revalidate from '../../../pages/api/revalidate'
import { NextApiRequest, NextApiResponse } from 'next'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

describe('GET /api/revalidate', () => {
  beforeEach(() => {
    console.log = jest.fn()
  })

  test('successfully revalidates the provided route path and returns a 200 status', async () => {
    const path = '/about'
    const secret = process.env.NEXT_REVALIDATE_API_KEY
    const revalidateMock = jest.fn()

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'GET',
      query: {
        secret,
        path,
      },
    })

    res.revalidate = revalidateMock

    await revalidate(req, res)

    expect(revalidateMock).toHaveBeenNthCalledWith(1, path)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        revalidated: true,
      })
    )
  })

  test('Invalid secret throws an error and returns a 401 status', async () => {
    const path = '/about'
    const secret = 'invalid-secret'
    const revalidateMock = jest.fn()

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'GET',
      query: {
        secret,
        path,
      },
    })
    res.revalidate = revalidateMock

    await revalidate(req, res)

    expect(revalidateMock).not.toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Invalid token',
      })
    )
  })

  test('No route path provided returns an error and 500 status', async () => {
    const path = undefined
    const secret = process.env.NEXT_REVALIDATE_API_KEY
    const revalidateMock = jest.fn()

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'GET',
      query: {
        secret,
        path,
      },
    })

    res.revalidate = revalidateMock

    await revalidate(req, res)

    expect(revalidateMock).not.toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Error revalidating',
      })
    )
  })
})
