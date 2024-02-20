import { render, screen } from '@testing-library/react'

import { PaginationNext } from './PaginationNext'

test('Shows next section', () => {
  render(
    <PaginationNext href="/nextLinkTest" variant="block">
      test text
    </PaginationNext>
  )

  expect(screen.getByRole('link', { name: 'Next page : test text' })).toHaveAttribute('href', '/nextLinkTest')
})
