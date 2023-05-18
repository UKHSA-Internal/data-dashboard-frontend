import { render, screen } from '@/config/test-utils'
import { ChartDownload } from './ChartDownload'
import type { Chart } from '@/api/models/cms/Page'
import { chartExportApiRoutePath } from '@/config/constants'

const chart: Chart = [
  {
    id: '1',
    type: 'plot',
    value: {
      topic: 'COVID-19',
      metric: 'new_cases_daily',
      chart_type: 'line_with_shaded_section',
      date_from: null,
      date_to: null,
      stratum: '',
      geography: '',
      geography_type: '',
    },
  },
]

test('Displays a form and hidden input fields containing the POST data', async () => {
  render(<ChartDownload chart={chart} />)

  // Displays a form with a method and action
  const form = screen.getByTestId('download-form')
  expect(form).toHaveAttribute('method', 'POST')
  expect(form).toHaveAttribute('action', chartExportApiRoutePath)

  // File format to request from export endpoint
  expect(screen.getByTestId('download-form-format')).toHaveValue('json')

  // Only a subset of data is required from the Chart object to give to the export endpoint
  const { topic, metric, stratum, geography, geography_type, date_from, date_to } = chart[0].value

  expect(screen.getByTestId('download-form-plots')).toHaveValue(
    JSON.stringify({
      topic,
      metric,
      stratum,
      geography,
      geography_type,
      date_from,
      date_to,
    })
  )
})

test('Displays hidden input fields correctly for charts with multiple plots', () => {
  // Pass multiple plots in and modify the second plot to have a different metric value
  render(
    <ChartDownload
      chart={[chart[0], { ...chart[0], id: '2', value: { ...chart[0].value, metric: 'new_cases_7day_avg' } }]}
    />
  )

  const hiddenPlotFields = screen.getAllByTestId('download-form-plots')
  expect(hiddenPlotFields).toHaveLength(2)

  const { topic, metric, stratum, geography, geography_type, date_from, date_to } = chart[0].value

  // First hidden input
  expect(hiddenPlotFields[0]).toHaveValue(
    JSON.stringify({
      topic,
      metric,
      stratum,
      geography,
      geography_type,
      date_from,
      date_to,
    })
  )

  // Second hidden input
  expect(hiddenPlotFields[1]).toHaveValue(
    JSON.stringify({
      topic,
      metric: 'new_cases_7day_avg',
      stratum,
      geography,
      geography_type,
      date_from,
      date_to,
    })
  )
})

test('Displays the download button correctly', async () => {
  render(<ChartDownload chart={chart} />)

  const button = screen.getByRole('button', { name: 'Download' })
  expect(button).toHaveAttribute('type', 'submit')
})
