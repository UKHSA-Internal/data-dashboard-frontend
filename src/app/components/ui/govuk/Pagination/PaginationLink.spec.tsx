import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { render, screen } from '@/config/test-utils'

import { PaginationLink } from './PaginationLink'

jest.mock('next/link', () => {
  return function MockNextLink({
    children,
    prefetch: _prefetch,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; prefetch?: boolean }) {
    return (
      <a {...props} data-next-link="true">
        {children}
      </a>
    )
  }
})

describe('PaginationLink', () => {
  test('use a Next Link by default', () => {
    render(<PaginationLink href="/pathname?page=2">Page 2</PaginationLink>)

    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute('data-next-link', 'true')
  })

  test('use a native anchor when a full document reload is requested', () => {
    render(
      <PaginationLink reloadDocument href={{ pathname: '/pathname', query: { search: '', page: 2 } }}>
        Page 2
      </PaginationLink>
    )

    const link = screen.getByRole('link', { name: 'Page 2' })

    expect(link).not.toHaveAttribute('data-next-link')
    expect(link).toHaveAttribute('href', '/pathname?search=&page=2')
  })
})
