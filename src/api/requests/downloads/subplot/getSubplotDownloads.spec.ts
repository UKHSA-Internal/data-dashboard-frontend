import { client } from '@/api/utils/api.utils'
import { auth } from '@/auth'
import { auditLog, logger } from '@/lib/logger'
import { downloadsSubplotCsvFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-csv'
import { downloadsSubplotJsonFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-json'

import { getSubplotDownloads } from './getSubplotDownloads'

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}))

const mockChartParameters = {
  theme: 'immunisation',
  sub_theme: 'childhood-vaccines',
  x_axis: 'geography',
  y_axis: 'metric',
  date_from: '2021-01-31',
  date_to: '2021-12-31',
  age: 'all',
  sex: 'all',
  topic: null,
  metric: null,
  stratum: null,
  metric_value_ranges: [],
}

const mockSubplots = [
  {
    subplot_title: '6-in-1 (12 months)',
    subplot_parameters: { topic: '6-in-1', metric: '6-in-1_coverage_coverageByYear', stratum: '12m' },
    plots: [
      { label: 'England', geography: 'England', geography_type: 'Nation', line_colour: 'COLOUR_1_DARK_BLUE' },
      { label: 'North East', geography: 'North East', geography_type: 'Region', line_colour: 'COLOUR_2_TURQUOISE' },
      {
        label: 'Darlington',
        geography: 'Darlington',
        geography_type: 'Upper Tier Local Authority',
        line_colour: 'COLOUR_3_DARK_PINK',
      },
    ],
  },
]

const mockAuth = auth as unknown as jest.MockedFunction<() => Promise<{ userId: string | null } | null>>
const mockAuditLog = auditLog as jest.MockedFunction<typeof auditLog>

test('Uses default file_format and threshold params when omitted', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotCsvFixture,
    status: 200,
  })

  await getSubplotDownloads(true, undefined, undefined, undefined, mockChartParameters, mockSubplots)

  expect(client).toHaveBeenCalledWith('downloads/subplot/v1', {
    body: {
      is_public: true,
      file_format: 'csv',
      target_threshold: null,
      target_threshold_label: null,
      chart_parameters: mockChartParameters,
      subplots: mockSubplots,
    },
    headers: undefined,
  })
})

test('Returns chart data in CSV format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotCsvFixture,
    status: 200,
  })

  const result = await getSubplotDownloads(true, 'csv', null, null, mockChartParameters, mockSubplots)

  expect(result).toEqual(downloadsSubplotCsvFixture)
})

test('Returns chart data in JSON format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotJsonFixture,
    status: 200,
  })

  const result = await getSubplotDownloads(true, 'json', null, null, mockChartParameters, mockSubplots)

  expect(result).toEqual(downloadsSubplotJsonFixture)
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    data: downloadsSubplotJsonFixture,
    status: 400,
  })

  const result = await getSubplotDownloads(true, 'json', null, null, mockChartParameters, mockSubplots)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toBeUndefined()
})

test('Forwards auth token to client when present', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotCsvFixture,
    status: 200,
  })

  await getSubplotDownloads(true, 'csv', null, null, mockChartParameters, mockSubplots, 'Bearer test-token')

  expect(client).toHaveBeenCalledWith('downloads/subplot/v1', {
    body: {
      is_public: true,
      file_format: 'csv',
      target_threshold: null,
      target_threshold_label: null,
      chart_parameters: mockChartParameters,
      subplots: mockSubplots,
    },
    headers: { 'X-UHD-AUTH': 'Bearer test-token' },
  })
})

test('Does not forward auth header when no token present', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotCsvFixture,
    status: 200,
  })

  await getSubplotDownloads(true, 'csv', null, null, mockChartParameters, mockSubplots)

  expect(client).toHaveBeenCalledWith('downloads/subplot/v1', {
    body: {
      is_public: true,
      file_format: 'csv',
      target_threshold: null,
      target_threshold_label: null,
      chart_parameters: mockChartParameters,
      subplots: mockSubplots,
    },
    headers: undefined,
  })
})

describe('auditLog', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Calls auditLog when is_public is false and session exists', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotCsvFixture,
      status: 200,
    })
    mockAuth.mockResolvedValue({ userId: 'user-123' })

    await getSubplotDownloads(false, 'csv', null, null, mockChartParameters, mockSubplots)

    expect(mockAuditLog).toHaveBeenCalledTimes(1)
    expect(mockAuditLog).toHaveBeenCalledWith('user-123', 'FILE_DOWNLOAD', `csv - ${JSON.stringify(mockSubplots)}`)
  })

  test('falls back to empty string when userId is nullish', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotCsvFixture,
      status: 200,
    })
    mockAuth.mockResolvedValue({ userId: null })

    await getSubplotDownloads(false, 'csv', null, null, mockChartParameters, mockSubplots)

    expect(mockAuditLog).toHaveBeenCalledWith('', 'FILE_DOWNLOAD', `csv - ${JSON.stringify(mockSubplots)}`)
  })

  test('does not call auditLog when is_public is false but there is no session', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotCsvFixture,
      status: 200,
    })
    mockAuth.mockResolvedValue(null)

    await getSubplotDownloads(false, 'csv', null, null, mockChartParameters, mockSubplots)

    expect(mockAuditLog).not.toHaveBeenCalled()
  })

  test('does not call auditLog when is_public is true', async () => {
    jest.mocked(client).mockResolvedValueOnce({
      data: downloadsSubplotCsvFixture,
      status: 200,
    })
    await getSubplotDownloads(true, 'csv', null, null, mockChartParameters, mockSubplots)

    expect(mockAuth).not.toHaveBeenCalled()
    expect(mockAuditLog).not.toHaveBeenCalled()
  })
})
