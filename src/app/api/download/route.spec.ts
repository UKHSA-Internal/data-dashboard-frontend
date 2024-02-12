/**
 * @jest-environment node
 */
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { bulkDownloadZip } from '@/mock-server/handlers/bulkdownloads/fixtures/bulk-download-zip'

import { POST } from './route'

const clientMock = jest.mocked(client)

describe('POST api/download/bulk', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Downloads bulk data in csv format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')
    formData.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
      formData: () => formData,
    })

    clientMock.mockResolvedValueOnce({
      data: bulkDownloadZip,
      status: 200,
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: new URLSearchParams({ file_format: 'csv' }),
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.text()).toEqual(bulkDownloadZip)
  })

  test('Downloads bulk data in json format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'json')
    formData.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=json',
      },
      formData: () => formData,
    })

    clientMock.mockResolvedValueOnce({
      data: JSON.stringify(bulkDownloadZip),
      status: 200,
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: new URLSearchParams({ file_format: 'json' }),
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.json()).toEqual(bulkDownloadZip)
  })

  test('Redirects to error page when wrong file format is detected', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=not_valid',
      },
      formData: () => formData,
    })

    clientMock.mockResolvedValueOnce({
      data: null,
      status: 200,
    })

    const res = await POST(req)

    expect(res).toBeUndefined()
    expect(logger.info).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('POST /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('download api route handler - missing parameters'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })

  test('Redirects to error page when backend api returns an error', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')
    formData.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
      formData: () => formData,
    })

    clientMock.mockResolvedValueOnce({
      data: null,
      error: new Error('Failed!'),
      status: 500,
    })

    const res = await POST(req)

    expect(res).toBeUndefined()
    expect(logger.info).toHaveBeenCalledWith('Triggering composite download to %s', 'bulkdownloads/v1')
    expect(logger.error).toHaveBeenCalledWith('POST /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('Failed!'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})
