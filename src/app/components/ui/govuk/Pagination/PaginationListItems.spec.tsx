import { render, screen } from '@/config/test-utils'

import { PaginationListItems } from './PaginationListItems'

describe('Pagination list items', () => {
  test('displays an unordered list container', () => {
    render(<PaginationListItems>test text</PaginationListItems>)
    expect(screen.getByRole('list')).toHaveClass('govuk-pagination__list')
    expect(screen.getByText('test text')).toBeInTheDocument()
  })

  test('custom class name', () => {
    render(<PaginationListItems className="govuk-!-margin-3">test text</PaginationListItems>)
    expect(screen.getByRole('list')).toHaveClass('govuk-pagination__list govuk-!-margin-3')
  })
})
