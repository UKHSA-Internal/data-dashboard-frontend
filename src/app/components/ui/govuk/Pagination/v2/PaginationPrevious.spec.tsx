import { render, screen } from '@testing-library/react'

import { PaginationPrevious } from './PaginationPrevious'

test('Shows previous section', () => {
  render(<PaginationPrevious href="/previousLinkTest">test text</PaginationPrevious>)

  expect(screen.getByRole('link', { name: 'Previous page : test text' })).toHaveAttribute('href', '/previousLinkTest')
})
