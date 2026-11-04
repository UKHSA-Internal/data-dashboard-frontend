/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { DualCategoryRequestParams, getTables, Response as TablesResponse } from '@/api/requests/tables/getTables'

import { POST } from './route'

jest.mock('@/api/requests/tables/getTables')

const getTablesMock = jest.mocked(getTables)

const mockBody: DualCategoryRequestParams = {
  x_axis: 'date',
  y_axis: 'metric',
  chart_type: 'line_multi_coloured',
  static_fields: {
    theme: 'infectious_disease',
    sub_theme: 'respiratory',
    topic: 'COVID-19',
    metric: 'new_cases_daily',
    geography: 'England',
    geography_type: 'Nation',
    stratum: 'default',
    sex: null,
    age: null,
    date_from: null,
    date_to: null,
  },
  primary_field_values: ['England'],
  secondary_category: 'age',
  segments: [
    {
      secondary_field_value: '00-04',
      colour: 'COLOUR_1_DARK_BLUE',
      label: '0 to 4 years',
    },
  ],
}

const mockData: TablesResponse = [
  {
    reference: '2024-01-01',
    values: [
      {
        label: '0 to 4 years',
        value: 100,
        in_reporting_delay_period: false,
      },
    ],
  },
]

const mockRequest = (body: unknown, url = 'http://localhost:3000/api/proxy/tables/dual-category/v1') =>
  Mock.of<NextRequest>({
    json: jest.fn().mockResolvedValue(body),
    nextUrl: new URL(url) as NextRequest['nextUrl'],
  })

describe('POST /api/proxy/tables/dual-category/v1', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('passes the request body to getTables and returns the data', async () => {
    getTablesMock.mockResolvedValueOnce({ success: true, data: mockData })

    const res = await POST(mockRequest(mockBody))

    expect(getTables).toHaveBeenCalledTimes(1)
    expect(getTables).toHaveBeenCalledWith(mockBody, true)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(mockData)
  })

  test('passes isPublic as true when the search param is absent', async () => {
    getTablesMock.mockResolvedValueOnce({ success: true, data: mockData })

    await POST(mockRequest(mockBody))

    expect(getTables).toHaveBeenCalledWith(mockBody, true)
  })

  test('passes isPublic as true when the search param is "true"', async () => {
    getTablesMock.mockResolvedValueOnce({ success: true, data: mockData })

    await POST(mockRequest(mockBody, 'http://localhost:3000/api/proxy/tables/dual-category/v1?isPublic=true'))

    expect(getTables).toHaveBeenCalledWith(mockBody, true)
  })

  test('passes isPublic as false when the search param is "false"', async () => {
    getTablesMock.mockResolvedValueOnce({ success: true, data: mockData })

    await POST(mockRequest(mockBody, 'http://localhost:3000/api/proxy/tables/dual-category/v1?isPublic=false'))

    expect(getTables).toHaveBeenCalledWith(mockBody, false)
  })

  test('returns a 500 without calling getTables when the request body is empty', async () => {
    const res = await POST(mockRequest(null))

    expect(getTables).not.toHaveBeenCalled()
    expect(res.status).toBe(500)
    expect(await res.text()).toBe('Missing request body')
  })

  test('returns a 500 when getTables fails', async () => {
    getTablesMock.mockResolvedValueOnce({ success: false, error: new z.ZodError([]) })

    const res = await POST(mockRequest(mockBody))

    expect(getTables).toHaveBeenCalledWith(mockBody, true)
    expect(res.status).toBe(500)
    expect(await res.text()).toBe('Downstream service request failed')
  })
})
