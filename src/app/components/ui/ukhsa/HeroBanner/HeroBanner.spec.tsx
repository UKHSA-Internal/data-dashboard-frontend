import { render } from '@/config/test-utils'

import HeroBanner from './HeroBanner'

test('renders hero banner', async () => {
  const { getByRole } = render(await HeroBanner({ subTitle: 'Showing public health data across England' }))

  expect(getByRole('heading', { level: 1, name: 'UKHSA data dashboard' })).toBeVisible()
  expect(getByRole('heading', { level: 2, name: 'Showing public health data across England' })).toBeVisible()
  expect(getByRole('link', { name: 'What is the UKHSA data dashboard?' })).toHaveAttribute('href', '/about')
})
