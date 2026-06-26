import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import { getDownloads, SingleCategoryRequestParams } from './getDownloads'

const basePlot: SingleCategoryRequestParams['plots'][number] = {
  topic: 'COVID-19',
  metric: 'new_cases_7days_sum',
  stratum: '',
}

const baseBody: SingleCategoryRequestParams = {
  is_public: true,
  file_format: 'csv',
  x_axis: null,
  confidence_intervals: false,
  plots: [basePlot],
}

test('Returns chart data in CSV format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  const result = await getDownloads(baseBody)

  expect(result).toEqual(downloadsCsvFixture)
})

test('Returns chart data in json format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsJsonFixture,
    status: 200,
  })

  const result = await getDownloads({ ...baseBody, file_format: 'json' })

  expect(result).toEqual(downloadsJsonFixture)
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    data: downloadsJsonFixture,
    status: 400,
  })

  const result = await getDownloads({ ...baseBody, file_format: 'json' })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual(undefined)
})

test('Sends confidence_intervals as true in request body', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads({ ...baseBody, confidence_intervals: true })

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [basePlot],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: true,
    },
  })
})

test('Sends confidence_intervals as false in request body', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads({ ...baseBody, confidence_intervals: false })

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [basePlot],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: false,
    },
  })
})

test('Defaults confidence_intervals to false when not provided', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads(baseBody)

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [basePlot],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: false,
    },
  })
})
