import { Request, Response } from 'express'

import { getSwitchBoardState, initialState } from '@/app/(pages)/switchboard/shared/state'
import { covid19PageMock } from '@/mock-server/handlers/cms/pages/fixtures/page'

import handler from './[...slug]'

jest.mock('@/app/(pages)/switchboard/shared/state', () => {
  const actual = jest.requireActual('@/app/(pages)/switchboard/shared/state')

  return {
    ...actual,
    getSwitchBoardState: jest.fn(),
  }
})

const mockedGetSwitchBoardState = jest.mocked(getSwitchBoardState)

const createMockResponse = () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  }

  return response as unknown as Response
}

describe('drafts mock handler', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockedGetSwitchBoardState.mockReturnValue(initialState)
  })

  test('returns cover draft page when authenticated', async () => {
    const req = {
      method: 'GET',
      headers: {
        authorization: 'Bearer draft-token',
      },
      params: {
        0: 'cover',
      },
    } as unknown as Request

    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Cover',
        meta: expect.objectContaining({
          slug: 'cover',
          html_url: 'http://localhost:3000/cover/',
        }),
      })
    )
  })

  test('returns nested draft page when authenticated', async () => {
    const req = {
      method: 'GET',
      headers: {
        authorization: 'Bearer draft-token',
      },
      params: {
        0: 'respiratory-viruses/covid-19',
      },
    } as unknown as Request

    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(covid19PageMock)
  })

  test('returns 401 when authorization header is missing', async () => {
    const req = {
      method: 'GET',
      headers: {},
      params: {
        0: 'cover',
      },
    } as unknown as Request

    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'missing or invalid authorization header' })
  })

  test('returns 404 when draft slug does not exist', async () => {
    const req = {
      method: 'GET',
      headers: {
        authorization: 'Bearer draft-token',
      },
      params: {
        0: 'not-a-real-slug',
      },
    } as unknown as Request

    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'page not found' })
  })
})
