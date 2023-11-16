/**
 * @jest-environment node
 */
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/api-utils'
import { downloadsJsonFixture } from '@/api/mocks/downloads/fixtures/downloads-json'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'

import { GET } from './route'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')
jest.mock('next/navigation')

describe('GET api/download/bulk', () => {
  test('Downloads bulk data in csv format', async () => {
    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsCsvFixture,
      status: 200,
    })

    const res = await GET(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.text()).toEqual(downloadsCsvFixture)
  })

  test('Downloads bulk data in json format', async () => {
    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=json',
      },
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: JSON.stringify(downloadsJsonFixture),
      status: 200,
    })

    const res = await GET(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(downloadsJsonFixture)
  })

  test('Redirects to error page when wrong file format is detected', async () => {
    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=not_valid',
      },
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 200,
    })

    await GET(req)

    expect(logger.info).toHaveBeenCalledWith('bulk download api route handler error', undefined)
    expect(redirect).toHaveBeenCalledWith('/error')
  })

  test('Redirects to error page when backend api returns an error', async () => {
    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      error: new Error('Failed!'),
      status: 500,
    })

    await GET(req)

    expect(logger.info).toHaveBeenCalledWith('bulk download api route handler error', new Error('Failed!'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})
