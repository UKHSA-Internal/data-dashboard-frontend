import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import api from '../../../../pages/api/chart/export'
import { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@/lib/logger'
import { server } from '@/api/msw/server'
import { downloadsCsvFixture } from '@/api/mocks/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/api/mocks/downloads/fixtures/downloads-json'
import { z } from 'zod'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { rest } from 'msw'

jest.mock('@/lib/logger')

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('POST /api/chart/export', () => {
  test('Downloads the requested chart in csv format', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        format: 'csv',
        plots: [
          {
            topic: 'COVID-19',
            metric: 'new_cases_daily',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
        ],
      },
    })

    await api(req, res)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toEqual(downloadsCsvFixture)
  })

  test('Downloads the requested chart in json format', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        format: 'json',
        plots: [
          {
            topic: 'COVID-19',
            metric: 'new_cases_daily',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
        ],
      },
    })

    await api(req, res)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toEqual(downloadsJsonFixture)
  })

  test('Returns status 405 when wrong http method is sent ', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'GET',
    })

    await api(req, res)

    expect(logger.error).toHaveBeenCalledWith('Unsupported request method GET sent to export endpoint')
    expect(res._getStatusCode()).toBe(405)
    expect(res._getData()).toEqual('')
  })

  test('Returns status 500 when wrong form body is sent', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        format: 'xml', // <----- XML is not supported
        plots: [
          {
            topic: 'COVID-19',
            metric: 'new_cases_daily',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
        ],
      },
    })

    await api(req, res)

    expect(logger.error).toHaveBeenCalledWith(
      new z.ZodError([
        {
          received: 'xml',
          code: 'invalid_enum_value',
          options: ['json', 'csv'],
          path: ['file_format'],
          message: "Invalid enum value. Expected 'json' | 'csv', received 'xml'",
        },
      ])
    )
    expect(res._getStatusCode()).toBe(500)
    expect(res._getData()).toEqual('')
  })

  test('Returns status 500 when the proxied request fails', async () => {
    server.use(
      rest.post(`${getApiBaseUrl()}/downloads/v2`, async (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        format: 'json',
        plots: [
          {
            topic: 'COVID-19',
            metric: 'new_cases_daily',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
        ],
      },
    })

    await api(req, res)

    expect(logger.error).toHaveBeenCalledWith('Proxied request to /api/downloads/v2 failed')
    expect(res._getStatusCode()).toBe(500)
    expect(res._getData()).toEqual('')
  })
})
