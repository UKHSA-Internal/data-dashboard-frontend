import { UrlObject } from 'url'

import { render, screen } from '@/config/test-utils'

import { PaginationPrevious } from './PaginationPrevious'

describe('Pagination previous link', () => {
  test('"block" variant shows an icon, label and custom page name', () => {
    render(
      <PaginationPrevious href="/previousLinkTest" variant="block">
        test text
      </PaginationPrevious>
    )

    expect(screen.getByTestId('icon-prev')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: 'Previous page : test text' })).toHaveAttribute('href', '/previousLinkTest')
  })

  test('"list-item" variant shows just an icon and label', () => {
    render(<PaginationPrevious href="/previousLinkTest" variant="list-item" />)

    expect(screen.getByTestId('icon-prev')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('href', '/previousLinkTest')
  })

  test('Using a UrlObject for the href prop', () => {
    const href: UrlObject = { pathname: '/pathname', query: { page: 1 } }

    render(<PaginationPrevious href={href} variant="list-item" />)

    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('href', '/pathname?page=1')
  })
})
