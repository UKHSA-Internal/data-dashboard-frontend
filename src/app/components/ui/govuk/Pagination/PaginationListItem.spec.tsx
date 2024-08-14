import { UrlObject } from 'node:url'

import { render, screen, within } from '@/config/test-utils'

import { PaginationListItem } from './PaginationListItem'

describe('Pagination list item', () => {
  test('displays a link within a list item', () => {
    render(
      <PaginationListItem href="/test-link" current={false}>
        {Number(1)}
      </PaginationListItem>
    )

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveClass('govuk-pagination__item block')
    expect(listItem).not.toHaveClass('govuk-pagination__item--current')

    const link = within(listItem).getByRole('link', { name: 'Page 1' })
    expect(link).toHaveAttribute('href', '/test-link')
    expect(link).toHaveAttribute('class', 'govuk-link govuk-pagination__link govuk-link--no-visited-state')
  })

  test('currently active page', () => {
    render(
      <PaginationListItem href="/test-link" current>
        {Number(1)}
      </PaginationListItem>
    )

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveClass('govuk-pagination__item govuk-pagination__item--current block')

    const link = within(listItem).getByRole('link', { name: 'Page 1' })
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  test('Custom class name', () => {
    render(
      <PaginationListItem href="/test-link" current className="govuk-!-margin-5">
        {Number(5)}
      </PaginationListItem>
    )

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveClass('govuk-pagination__item govuk-pagination__item--current block govuk-!-margin-5')
  })

  test('Using a UrlObject for the href prop', () => {
    const href: UrlObject = { pathname: '/pathname', query: { page: 1 } }

    render(
      <PaginationListItem href={href} current>
        {Number(5)}
      </PaginationListItem>
    )

    expect(screen.getByRole('link', { name: 'Page 5' })).toHaveAttribute('href', '/pathname?page=1')
  })
})
