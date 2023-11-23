import { render } from '@/config/test-utils'

import MetricsSummary from './MetricsSummary'

test('renders MetricsCard', async () => {
  const { getByText } = render(
    await MetricsSummary({
      topic: 'COVID-19',
      category: 'Healthcare',
      apiName: 'test_apiname',
    })
  )

  // Topic
  expect(getByText('Topic')).toBeVisible()
  expect(getByText('COVID-19')).toBeVisible()

  // Category
  expect(getByText('Category')).toBeVisible()
  expect(getByText('Healthcare')).toBeVisible()

  // API name
  expect(getByText('API name')).toBeVisible()
  expect(getByText('test_apiname')).toBeVisible()
})
