/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { client } from '@/api/api-utils'
import { downloadsJsonFixture } from '@/api/mocks/downloads/fixtures/downloads-json'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'

import { POST } from './route'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

const plots = [
  {
    topic: 'COVID-19',
    metric: 'new_cases_daily',
    date_from: null,
    date_to: null,
    stratum: 'default',
    geography: 'England',
    geography_type: 'Nation',
  },
]

describe('POST /api/chart/export', () => {
  test('Downloads the requested chart in csv format', async () => {
    const formData = new FormData()
    formData.set('format', 'csv')
    formData.set('plots', JSON.stringify(plots))

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

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.text()).toEqual(downloadsCsvFixture)
  })

  test('Downloads the requested chart in json format', async () => {
    const formData = new FormData()
    formData.set('format', 'json')
    formData.set('plots', JSON.stringify(plots))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: JSON.stringify(downloadsJsonFixture),
      status: 200,
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(downloadsJsonFixture)
  })

  test('Returns status 301 when wrong form body is sent', async () => {
    const formData = new FormData()
    formData.set('format', 'not_valid')
    formData.set('plots', JSON.stringify(plots))

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
    formData.set('plots', JSON.stringify(plots))

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

  expect(res.status).toBe(301)
})
