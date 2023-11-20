/**
 * @jest-environment node
 */
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'
import { bulkDownloadZip } from '@/mock-server/handlers/bulkdownloads/fixtures/bulk-download-zip'

import { POST } from './route'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')
jest.mock('next/navigation')

describe('POST api/download/bulk', () => {
  test('Downloads bulk data in csv format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: bulkDownloadZip,
      status: 200,
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toEqual('application/zip')
    expect(await res.text()).toEqual(bulkDownloadZip)
  })

  test('Downloads bulk data in json format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=json',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: JSON.stringify(bulkDownloadZip),
      status: 200,
    })

    const res = await POST(req)

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

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      status: 200,
    })

    const res = await POST(req)

    expect(res).toBeUndefined()
    expect(logger.info).toHaveBeenCalledWith('bulk download api route handler error', undefined)
    expect(redirect).toHaveBeenCalledWith('/error')
  })

  test('Redirects to error page when backend api returns an error', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000?file_format=csv',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: null,
      error: new Error('Failed!'),
      status: 500,
    })

    const res = await POST(req)

    expect(res).toBeUndefined()
    expect(logger.info).toHaveBeenCalledWith('bulk download api route handler error', new Error('Failed!'))
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})
