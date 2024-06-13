import { SafeParseError, SafeParseSuccess, ZodError } from 'zod'

import { HealthAlertList } from '@/api/models/Alerts'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { fixtures } from '@/mock-server/handlers/alerts/v1/fixtures/list'

import { getHealthAlerts } from './getHealthAlerts'

const getHealthAlertsMock = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

const fixture = fixtures.Green

describe('Successfully getting a list of health alerts from the API', () => {
  test('returns a list of alerts', async () => {
    getHealthAlertsMock.mockResolvedValueOnce({
      status: 200,
      data: fixture,
    })

    const result = await getHealthAlerts('heat')

    expect(result).toEqual<SafeParseSuccess<HealthAlertList>>({
      data: fixture,
      success: true,
    })
  })
})

describe('Failing to get a list of health alerts from the API', () => {
  test('API request fails with a server error', async () => {
    getHealthAlertsMock.mockRejectedValueOnce({
      status: 500,
      data: null,
      error: 'API call failed',
    })

    const result = await getHealthAlerts('cold')

    expect(result).toEqual<SafeParseError<HealthAlertList>>({
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
