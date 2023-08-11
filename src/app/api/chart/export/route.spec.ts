/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { client } from '@/api/api-utils'
import { downloadsJsonFixture } from '@/api/mocks/downloads/fixtures/downloads-json'
import { RequestParams } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'

import { POST } from './route'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

interface RequestBody {
  plots: RequestParams['plots']
  format: string
}

const plots: RequestBody['plots'] = [
  {
    topic: 'COVID-19',
    metric: 'new_cases_daily',
    date_from: null,
    date_to: null,
    stratum: '',
    geography: '',
    geography_type: '',
  },
]

describe('POST /api/chart/export', () => {
  test('Downloads the requested chart in csv format', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsCsvFixture,
      status: 200,
    })

    const req = Mock.of<NextRequest & { json: () => RequestBody }>({
      json: jest.fn(() => ({
        format: 'csv',
        plots,
      })),
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.text()).toEqual(downloadsCsvFixture)
  })

  test('Downloads the requested chart in json format', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: JSON.stringify(downloadsJsonFixture),
      status: 200,
    })

    const req = Mock.of<NextRequest & { json: () => RequestBody }>({
      json: jest.fn(() => ({
        format: 'json',
        plots,
      })),
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(downloadsJsonFixture)
  })

  test('Returns status 500 when wrong form body is sent', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 200,
    })

    const req = Mock.of<NextRequest & { json: () => RequestBody }>({
      json: jest.fn(() => ({
        format: 'not_valid',
        plots,
      })),
    })

    const res = await POST(req)

    expect(logger.error).toHaveBeenCalledWith(
      new z.ZodError([
        {
          received: 'not_valid',
          code: 'invalid_enum_value',
          options: ['json', 'csv'],
          path: ['file_format'],
          message: "Invalid enum value. Expected 'json' | 'csv', received 'not_valid'",
        },
      ])
    )
    expect(res.status).toBe(500)
  })

  test('Returns status 500 when the proxied request fails', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 500,
    })

    const req = Mock.of<NextRequest & { json: () => RequestBody }>({
      json: jest.fn(() => ({
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
      })),
    })

    const res = await POST(req)

    expect(logger.error).toHaveBeenCalledWith('Proxied request to /api/downloads/v2 failed')
    expect(res.status).toBe(500)
  })
})
