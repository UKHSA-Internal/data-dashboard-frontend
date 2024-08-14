import { render, screen } from '@/config/test-utils'

import { Pagination } from './Pagination'

test('when variant is list-item has appropriate classname', () => {
  render(<Pagination variant="list-item">test</Pagination>)

  expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveClass('govuk-pagination')
  expect(screen.getByRole('navigation', { name: 'Pagination' })).not.toHaveClass('govuk-pagination--block')
})

test('when variant is block has appropriate classname', () => {
  render(<Pagination variant="block">test</Pagination>)

  expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveClass('govuk-pagination govuk-pagination--block')
})

test('custom classname passes through as expected', () => {
  render(
    <Pagination variant="block" className="govuk-!-margin-3">
      test
    </Pagination>
  )

  expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveClass('govuk-!-margin-3')
})
