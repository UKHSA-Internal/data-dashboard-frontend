import { z } from 'zod'

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

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(alertRegionFixture)
    }
  })

  test('returns a cold alert object for the region', async () => {
    getHealthAlertMock.mockResolvedValueOnce({
      status: 200,
      data: alertRegionFixture,
    })

    const result = await getHealthAlertByRegion('cold', 'mockRegionId')

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(alertRegionFixture)
    }
  })
})

describe('Failing to get a health alert from the API', () => {
  test('API request fails with a server error', async () => {
    getHealthAlertMock.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'API call failed',
    })

    const result = await getHealthAlertByRegion('cold', 'mockRegionId')

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeInstanceOf(z.ZodError)
    }

    expect(logger.error).toHaveBeenNthCalledWith(1, {
      status: 500,
      data: null,
      error: 'API call failed',
    })
  })
})
