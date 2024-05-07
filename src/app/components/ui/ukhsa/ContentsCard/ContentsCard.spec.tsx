import { render } from '@/config/test-utils'

import { ContentsCard } from './ContentsCard'

test('Generates a card with the given details', () => {
  const { getByRole, getByText } = render(
    <ContentsCard title="Test title" body="Body contents for card" url="/new-url" />
  )

  expect(getByRole('link', { name: 'Test title' })).toHaveAttribute('href', '/new-url')
  expect(getByText('Body contents for card')).toBeInTheDocument()
})
