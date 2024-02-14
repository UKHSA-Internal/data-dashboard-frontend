/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { RequestParams } from '@/api/requests/downloads/getDownloads'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import { POST } from './route'

interface RequestBody {
  plots: RequestParams['plots']
  format: string
}

const mockPlot: RequestBody['plots'][number] = {
  topic: 'COVID-19',
  metric: 'new_cases_daily',
  date_from: null,
  date_to: null,
  stratum: 'default',
  geography: 'England',
  geography_type: 'Nation',
}

describe('POST /api/download/chart', () => {
  test('Downloads the requested chart in csv format', async () => {
    const formData = new FormData()
    formData.set('format', 'csv')
    formData.set('plots', JSON.stringify(mockPlot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsCsvFixture,
      status: 200,
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('downloads/v2', {
      body: {
        file_format: 'csv',
        plots: [mockPlot],
      },
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('text/csv')
    expect(await res.text()).toEqual(downloadsCsvFixture)
  })

  test('Downloads the requested chart with multiple plots', async () => {
    const formData = new FormData()
    formData.set('format', 'csv')
    formData.set('plots', JSON.stringify(mockPlot))
    formData.append('plots', JSON.stringify({ ...mockPlot, stratum: 'mock-1' }))
    formData.append('plots', JSON.stringify({ ...mockPlot, stratum: 'mock-2' }))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsCsvFixture,
      status: 200,
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('downloads/v2', {
      body: {
        file_format: 'csv',
        plots: [
          mockPlot,
          {
            ...mockPlot,
            stratum: 'mock-1',
          },
          {
            ...mockPlot,
            stratum: 'mock-2',
          },
        ],
      },
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('text/csv')
    expect(await res.text()).toEqual(downloadsCsvFixture)
  })

  test('Downloads the requested chart in json format', async () => {
    const formData = new FormData()
    formData.set('format', 'json')
    formData.set('plots', JSON.stringify(mockPlot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsJsonFixture,
      status: 200,
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('text/json')
    expect(await res.json()).toEqual(downloadsJsonFixture)
  })

  test('Returns status 301 when wrong form body is sent', async () => {
    const formData = new FormData()
    formData.set('format', 'not_valid')
    formData.set('plots', JSON.stringify(mockPlot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 200,
    })

    const res = await POST(req)

    expect(res.headers.get('content-type')).toEqual(null)
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
    expect(res.status).toBe(301)
  })

  test('Returns status 301 when the proxied request fails', async () => {
    const formData = new FormData()
    formData.set('format', 'csv')
    formData.set('plots', JSON.stringify(mockPlot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 301,
    })

    const res = await POST(req)

    expect(res.headers.get('content-type')).toEqual(null)
    expect(logger.error).toHaveBeenCalledWith('Proxied request to /api/downloads/v2 failed')
    expect(res.status).toBe(301)
  })
})

test('returns status 301 when the formData is not a string', async () => {
  const fileExample = new Blob()

  const formData = new FormData()
  formData.set('format', 'csv')
  formData.set('plots', fileExample)

  const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
    headers: {
      get: () => 'http://localhost:3000',
    },
    formData: () => formData,
  })

  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 301,
  })

  const res = await POST(req)

  expect(res.headers.get('content-type')).toEqual(null)
  expect(res.status).toBe(301)
})
