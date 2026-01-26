import { SafeParseError, SafeParseSuccess, ZodError } from 'zod'

import { HealthAlert } from '@/api/models/Alerts'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { alertRegionFixture } from '@/mock-server/handlers/alerts/v1/fixtures/detail'

import { getHealthAlertByRegion } from './getHealthAlertByRegion'

const getHealthAlertMock = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Successfully getting a health alert from the API', () => {
  test('returns a heat alert object for the region', async () => {
    getHealthAlertMock.mockResolvedValueOnce({
      status: 200,
      data: alertRegionFixture,
    })

    const result = await getHealthAlertByRegion('heat', 'mockRegionId')

    expect(result).toEqual<SafeParseSuccess<HealthAlert>>({
      data: alertRegionFixture,
      success: true,
    })
  })

  test('returns a cold alert object for the region', async () => {
    getHealthAlertMock.mockResolvedValueOnce({
      status: 200,
      data: alertRegionFixture,
    })

    const result = await getHealthAlertByRegion('cold', 'mockRegionId')

    expect(result).toEqual<SafeParseSuccess<HealthAlert>>({
      data: alertRegionFixture,
      success: true,
    })
  })
})

describe('Failing to get a health alert from the API', () => {
  test('returns a parse error when the payload is invalid', async () => {
    getHealthAlertMock.mockResolvedValueOnce({
      status: 200,
      data: { invalid: 'payload' },
    })

    const result = await getHealthAlertByRegion('heat', 'mockRegionId')

    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(ZodError)
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Parsing Error'))
  })

  test('API request fails with a server error', async () => {
    getHealthAlertMock.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'API call failed',
    })

    const result = await getHealthAlertByRegion('cold', 'mockRegionId')

    expect(result).toEqual<SafeParseError<HealthAlert>>({
      error: expect.any(ZodError),
      success: false,
    })

    expect(logger.error).toHaveBeenNthCalledWith(1, {
      status: 500,
      data: null,
      error: 'API call failed',
    })
  })
})
