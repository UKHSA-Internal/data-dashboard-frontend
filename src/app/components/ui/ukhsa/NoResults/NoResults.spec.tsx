import { render } from '@/config/test-utils'

import NoResults from './NoResults'

test('renders NoResults', async () => {
  const { getByText } = render(await NoResults())

  expect(getByText('There are no matching results')).toBeVisible()
  expect(getByText('Improve your search results by:')).toBeVisible()
  expect(getByText('removing filters')).toBeVisible()
  expect(getByText('double-checking your spelling')).toBeVisible()
  expect(getByText('using fewer keywords')).toBeVisible()
  expect(getByText('searching for something less specific')).toBeVisible()
})
