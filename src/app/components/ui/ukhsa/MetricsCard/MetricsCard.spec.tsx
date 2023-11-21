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

  expect(getByRole('heading', { level: 2, name: 'Test content' })).toBeVisible()
  expect(getByRole('link', { name: 'Test content' })).toHaveAttribute('href', 'metrics/test')
  expect(getByText('Description for test content card')).toBeVisible()
  expect(getByText('Healthcare')).toBeVisible()
  expect(getByText('COVID-19')).toBeVisible()
  expect(getByText('test_apiname')).toBeVisible()
})
