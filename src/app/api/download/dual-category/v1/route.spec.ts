/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { DualCategoryRequestParams } from '@/api/requests/downloads/getDownloads'
import { client } from '@/api/utils/api.utils'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import { POST } from './route'

jest.mock('@/auth', () => ({
  auth: jest.fn().mockResolvedValue(null),
}))

const dualCategoryData: Omit<DualCategoryRequestParams, 'is_public' | 'file_format'> = {
  x_axis: 'date',
  y_axis: 'metric',
  x_axis_title: 'Date',
  y_axis_title: 'Value',
  chart_type: 'stacked_bar',
  static_fields: {
    theme: 'infectious_disease',
    sub_theme: 'respiratory',
    topic: 'COVID-19',
    metric: 'new_cases_daily',
    geography: 'England',
    geography_type: 'Nation',
    stratum: 'default',
  },
  primary_field_values: ['2024-01-01'],
  secondary_category: 'age',
  segments: [
    {
      secondary_field_value: '00-04',
      colour: 'COLOUR_1_DARK_BLUE',
      label: '0 to 4 years',
    },
  ],
}

const mockRequest = (isPublic: boolean, fileFormat: 'csv' | 'json', authToken?: string) => {
  const formData = new FormData()
  formData.set('is_public', isPublic.toString())
  formData.set('file_format', fileFormat)
  formData.set('dual_category_data', JSON.stringify(dualCategoryData))

  return Mock.of<NextRequest>({
    headers: {
      get: (header: string) => {
        if (header === 'origin') return 'http://localhost:3000'
        if (header === 'X-UHD-AUTH') return authToken ?? null
        return null
      },
    },
    formData: async () => formData,
  })
}

describe('POST /api/download/dual-category/v1', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('downloads public dual category JSON without double serializing it', async () => {
    const serializedJson = JSON.stringify(downloadsJsonFixture)
    jest.mocked(client).mockResolvedValueOnce({ data: serializedJson, status: 200 })

    const response = await POST(mockRequest(true, 'json'))

    expect(client).toHaveBeenCalledWith('downloads/dual-category/v1', {
      body: { ...dualCategoryData, is_public: true, file_format: 'json' },
      headers: undefined,
    })
    expect(response.status).toBe(200)
    const responseBody = await response.text()
    expect(responseBody).toBe(serializedJson)
    expect(JSON.parse(responseBody)).toEqual(downloadsJsonFixture)
  })

  test('downloads non-public dual category JSON with the sign-in token', async () => {
    const serializedJson = JSON.stringify(downloadsJsonFixture)
    jest.mocked(client).mockResolvedValueOnce({ data: serializedJson, status: 200 })

    const response = await POST(mockRequest(false, 'json', 'Bearer test-token'))

    expect(client).toHaveBeenCalledWith('downloads/dual-category/v1', {
      body: { ...dualCategoryData, is_public: false, file_format: 'json' },
      headers: { 'X-UHD-AUTH': 'Bearer test-token' },
    })
    expect(response.status).toBe(200)
    const responseBody = await response.text()
    expect(responseBody).toBe(serializedJson)
    expect(JSON.parse(responseBody)).toEqual(downloadsJsonFixture)
  })

  test('downloads non-public dual category CSV with the sign-in token', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: downloadsCsvFixture, status: 200 })

    const response = await POST(mockRequest(false, 'csv', 'Bearer test-token'))

    expect(client).toHaveBeenCalledWith('downloads/dual-category/v1', {
      body: { ...dualCategoryData, is_public: false, file_format: 'csv' },
      headers: { 'X-UHD-AUTH': 'Bearer test-token' },
    })
    expect(response.status).toBe(200)
    expect(await response.text()).toBe(downloadsCsvFixture)
  })
})
