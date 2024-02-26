/**
 * @jest-environment node
 */
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { bulkDownloadCsv, bulkDownloadJson } from '@/mock-server/handlers/bulkdownloads/fixtures/bulk-download-zip'

import { GET, POST } from './route'

const clientMock = jest.mocked(client)

describe('GET api/download', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Downloads bulk data in csv format', async () => {
    const url = new URL('http://localhost/mock-page')
    url.searchParams.set('file_format', 'csv')
    url.searchParams.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      url: url.toString(),
    })

    clientMock.mockResolvedValueOnce({
      data: bulkDownloadCsv,
      status: 200,
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await GET(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: url.searchParams,
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.text()).toEqual(bulkDownloadCsv)
  })

  test('Downloads bulk data in json format', async () => {
    const url = new URL('http://localhost/mock-page')
    url.searchParams.set('file_format', 'csv')
    url.searchParams.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      url: url.toString(),
    })

    clientMock.mockResolvedValueOnce({
      data: JSON.stringify(bulkDownloadJson),
      status: 200,
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await GET(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: url.searchParams,
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.json()).toEqual(bulkDownloadJson)
  })

  test('Redirects to error page when the endpoint is not provided', async () => {
    const url = new URL('http://localhost/mock-page')
    url.searchParams.set('file_format', 'csv')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      url: url.toString(),
    })

    clientMock.mockResolvedValueOnce({
      data: null,
      status: 200,
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await GET(req)

    expect(res).toBeUndefined()
    expect(logger.info).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('GET /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('download api route handler - missing endpoint'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })

  test('Redirects to error page when backend api returns an error', async () => {
    const url = new URL('http://localhost/mock-page')
    url.searchParams.set('file_format', 'csv')
    url.searchParams.set('endpoint', 'bulkdownloads/v1')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      url: url.toString(),
    })

    clientMock.mockResolvedValueOnce({
      data: null,
      error: new Error('Failed!'),
      status: 500,
    })

    const res = await GET(req)

    expect(res).toBeUndefined()
    expect(logger.info).toHaveBeenCalledWith('Triggering download to %s', 'bulkdownloads/v1')
    expect(logger.error).toHaveBeenCalledWith('GET /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('Failed!'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})

describe('POST api/download', () => {
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
      data: bulkDownloadCsv,
      status: 200,
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: new URLSearchParams({ file_format: 'csv' }),
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.text()).toEqual(bulkDownloadCsv)
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
      data: JSON.stringify(bulkDownloadJson),
      status: 200,
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('bulkdownloads/v1', {
      searchParams: new URLSearchParams({ file_format: 'json' }),
    })
    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.json()).toEqual(bulkDownloadJson)
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
      headers: new Headers({ 'content-type': 'application/zip' }),
    })

    const res = await POST(req)

    expect(res).toBeUndefined()
    expect(logger.info).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('POST /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('download api route handler - missing endpoint'))
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
    expect(logger.info).toHaveBeenCalledWith('Triggering download to %s', 'bulkdownloads/v1')
    expect(logger.error).toHaveBeenCalledWith('POST /api/download proxy endpoint failed')
    expect(logger.error).toHaveBeenCalledWith(new Error('Failed!'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})
