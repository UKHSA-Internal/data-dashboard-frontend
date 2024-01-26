import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import { getDownloads } from './getDownloads'

test('Returns chart data in CSV format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  const result = await getDownloads([
    {
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      stratum: '',
    },
  ])

  expect(result).toEqual(downloadsCsvFixture)
})

test('Returns chart data in json format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsJsonFixture,
    status: 200,
  })

  const result = await getDownloads(
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        stratum: '',
      },
    ],
    'json'
  )

  expect(result).toEqual(downloadsJsonFixture)
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    data: downloadsJsonFixture,
    status: 400,
  })

  const result = await getDownloads(
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        stratum: '',
      },
    ],
    'json'
  )

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual(undefined)
})
