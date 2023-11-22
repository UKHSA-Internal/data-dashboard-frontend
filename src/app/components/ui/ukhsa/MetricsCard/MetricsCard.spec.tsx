import { render } from '@/config/test-utils'

import { MetricsCard } from './MetricsCard'

test('renders MetricsCard', async () => {
  const { getByRole, getByText } = render(
    await MetricsCard({
      title: 'Test content',
      href: 'metrics/test',
      shortText: 'Description for test content card',
      category: 'Healthcare',
      topic: 'COVID-19',
      apiName: 'test_apiname',
    })
  )

  expect(getByRole('link')).toHaveAttribute('href', 'metrics/test')
  expect(getByText('Description for test content card')).toBeVisible()

  // Category
  expect(getByText('Category')).toBeVisible()
  expect(getByText('Healthcare')).toBeVisible()

  // Topic
  expect(getByText('Topic')).toBeVisible()
  expect(getByText('COVID-19')).toBeVisible()

  // API name
  expect(getByText('API name')).toBeVisible()
  expect(getByText('test_apiname')).toBeVisible()
})
