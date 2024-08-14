import { UrlObject } from 'url'

import { render, screen } from '@/config/test-utils'

import { PaginationNext } from './PaginationNext'

describe('Pagination next link', () => {
  test('"block" variant shows an icon, label and custom page name', () => {
    render(
      <PaginationNext href="/nextLinkTest" variant="block">
        test text
      </PaginationNext>
    )

    expect(screen.getByTestId('icon-next')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: 'Next page : test text' })).toHaveAttribute('href', '/nextLinkTest')
  })

  test('"list-item" variant shows just an icon and label', () => {
    render(<PaginationNext href="/nextLinkTest" variant="list-item" />)

    expect(screen.getByTestId('icon-next')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('href', '/nextLinkTest')
  })

  test('Using a UrlObject for the href prop', () => {
    const href: UrlObject = { pathname: '/pathname', query: { page: 1 } }

    render(<PaginationNext href={href} variant="list-item" />)

    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('href', '/pathname?page=1')
  })
})
