/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { mockChartParameters, mockSubplot } from '@/app/api/download/subplot/v1/route.mocks'
import { logger } from '@/lib/logger'
import { downloadsSubplotCsvFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-csv'
import { downloadsSubplotJsonFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-json'

import { POST } from './route'

describe('download/subplot/v1', () => {
  test('Downloads the requested chart in csv format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')
    formData.set('target_threshold', '1')
    formData.set('target_threshold_label', '')
    formData.set('chart_parameters', JSON.stringify(mockChartParameters))
    formData.set('subplots', JSON.stringify(mockSubplot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotCsvFixture,
      status: 200,
    })

    const res = await POST(req)

    expect(client).toHaveBeenCalledWith('downloads/subplot/v1', {
      body: {
        file_format: 'csv',
        target_threshold: '1',
        target_threshold_label: '',
        chart_parameters: mockChartParameters,
        subplots: mockSubplot,
      },
    })

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/csv')
    expect(await res.text()).toEqual(downloadsSubplotCsvFixture)
  })

  test('Downloads the requested chart in json format', async () => {
    const formData = new FormData()
    formData.set('file_format', 'json')
    formData.set('target_threshold', '1')
    formData.set('target_threshold_label', '')
    formData.set('chart_parameters', JSON.stringify(mockChartParameters))
    formData.set('subplots', JSON.stringify(mockSubplot))

    const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
      headers: {
        get: () => 'http://localhost:3000',
      },
      formData: () => formData,
    })

    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotJsonFixture,
      status: 200,
    })

    const res = await POST(req)

    expect(logger.error).not.toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/json')
    expect(await res.json()).toEqual(downloadsSubplotJsonFixture)
  })

  test('Returns status 301 when wrong form body is sent', async () => {
    const formData = new FormData()
    formData.set('file_format', 'invalid_file_format')
    formData.set('target_threshold', '1')
    formData.set('target_threshold_label', '')
    formData.set('chart_parameters', JSON.stringify(mockChartParameters))
    formData.set('subplots', JSON.stringify(mockSubplot))

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

    expect(res.headers.get('content-type')).toBe(null)
    expect(logger.error).toHaveBeenCalledWith(
      new z.ZodError([
        {
          received: 'invalid_file_format',
          code: 'invalid_enum_value',
          options: ['json', 'csv'],
          path: ['file_format'],
          message: "Invalid enum value. Expected 'json' | 'csv', received 'invalid_file_format'",
        },
      ])
    )
    expect(res.status).toBe(301)
  })

  test('Returns status 301 when the proxied request fails', async () => {
    const formData = new FormData()
    formData.set('file_format', 'csv')
    formData.set('target_threshold', '1')
    formData.set('target_threshold_label', '')
    formData.set('chart_parameters', JSON.stringify(mockChartParameters))
    formData.set('subplots', JSON.stringify(mockSubplot))

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
    expect(logger.error).toHaveBeenCalledWith('Error while downloading subplot download response: null')
    expect(res.status).toBe(301)
  })
})
