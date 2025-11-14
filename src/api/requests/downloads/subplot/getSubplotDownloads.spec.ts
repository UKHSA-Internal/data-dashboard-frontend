import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { downloadsSubplotCsvFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-csv'
import { downloadsSubplotJsonFixture } from '@/mock-server/handlers/downloads/subplot/fixtures/downloads-json'

import { getSubplotDownloads } from './getSubplotDownloads'

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

test('Returns chart data in CSV format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotCsvFixture,
    status: 200,
  })

  const result = await getSubplotDownloads('csv', null, null, mockChartParameters, mockSubplots)

  expect(result).toEqual(downloadsSubplotCsvFixture)
})

test('Returns chart data in JSON format', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: downloadsSubplotJsonFixture,
    status: 200,
  })

  const result = await getSubplotDownloads('json', null, null, mockChartParameters, mockSubplots)

  expect(result).toEqual(downloadsSubplotJsonFixture)
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    data: downloadsSubplotJsonFixture,
    status: 400,
  })

  const result = await getSubplotDownloads('json', null, null, mockChartParameters, mockSubplots)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual(undefined)
})
