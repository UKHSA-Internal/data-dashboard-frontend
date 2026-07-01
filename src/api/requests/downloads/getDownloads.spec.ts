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

  const result = await getDownloads(true, [
    {
      theme: 'infectious_disease',
      sub_theme: 'respiratory',
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      geography: 'England',
      geography_type: 'Nation',
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
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
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
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
        stratum: '',
      },
    ],
    'json'
  )

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual(undefined)
})

test('Sends confidence_intervals as true in request body', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads(
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
        stratum: '',
      },
    ],
    'csv',
    null,
    true
  )

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [
        {
          theme: 'infectious_disease',
          sub_theme: 'respiratory',
          topic: 'COVID-19',
          metric: 'new_cases_7days_sum',
          geography: 'England',
          geography_type: 'Nation',
          stratum: '',
        },
      ],
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

  await getDownloads(
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
        stratum: '',
      },
    ],
    'csv',
    null,
    false
  )

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [
        {
          theme: 'infectious_disease',
          sub_theme: 'respiratory',
          topic: 'COVID-19',
          metric: 'new_cases_7days_sum',
          geography: 'England',
          geography_type: 'Nation',
          stratum: '',
        },
      ],
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

  await getDownloads(true, [
    {
      theme: 'infectious_disease',
      sub_theme: 'respiratory',
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      geography: 'England',
      geography_type: 'Nation',
      stratum: '',
    },
  ])

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [
        {
          theme: 'infectious_disease',
          sub_theme: 'respiratory',
          topic: 'COVID-19',
          metric: 'new_cases_7days_sum',
          geography: 'England',
          geography_type: 'Nation',
          stratum: '',
        },
      ],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: false,
    },
  })
})
test('Forwards auth token to client when present', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads(
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
        stratum: '',
      },
    ],
    'csv',
    null,
    false,
    'Bearer test-token'
  )

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [
        {
          theme: 'infectious_disease',
          sub_theme: 'respiratory',
          topic: 'COVID-19',
          metric: 'new_cases_7days_sum',
          geography: 'England',
          geography_type: 'Nation',
          stratum: '',
        },
      ],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: false,
    },
    headers: { 'X-UHD-AUTH': 'Bearer test-token' },
  })
})

test('Does not forward auth header when no token present', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsCsvFixture,
    status: 200,
  })

  await getDownloads(
    true,
    [
      {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        geography: 'England',
        geography_type: 'Nation',
        stratum: '',
      },
    ],
    'csv',
    null,
    false
  )

  expect(client).toHaveBeenCalledWith('downloads/v2', {
    body: {
      is_public: true,
      plots: [
        {
          theme: 'infectious_disease',
          sub_theme: 'respiratory',
          topic: 'COVID-19',
          metric: 'new_cases_7days_sum',
          geography: 'England',
          geography_type: 'Nation',
          stratum: '',
        },
      ],
      file_format: 'csv',
      x_axis: null,
      confidence_intervals: false,
    },
    headers: undefined,
  })
})
