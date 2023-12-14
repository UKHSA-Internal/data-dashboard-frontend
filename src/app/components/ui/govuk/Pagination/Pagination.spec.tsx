import { act, render, screen, within } from '@testing-library/react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import { Pagination } from './Pagination'

beforeEach(() => {
  mockRouter.push('/')
})

describe('Pagination', () => {
  test('Do not render pagination when there are no results', () => {
    render(<Pagination initialPage={0} initialPageSize={0} totalItems={0} />)

    const pagination = screen.queryByRole('navigation', { name: 'results' })
    expect(pagination).not.toBeInTheDocument()
  })

  test('Do not render pagination when there is only one page of results', () => {
    render(<Pagination initialPage={0} initialPageSize={5} totalItems={5} />)

    const pagination = screen.queryByRole('navigation', { name: 'results' })
    expect(pagination).not.toBeInTheDocument()
  })

  test('Default to the first page when no page is set in the query string', async () => {
    await mockRouter.push('')

    render(<Pagination initialPage={1} initialPageSize={4} totalItems={5} />)

    // Pagination
    const pagination = screen.getByRole('navigation', { name: 'results' })
    expect(pagination).toBeInTheDocument()

    // Prev Link (hidden when on first page)
    expect(within(pagination).queryByRole('link', { name: 'Previous' })).not.toBeInTheDocument()

    // Page 1 Link
    expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '/?page=1')
    expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')

    // Page 2 Link
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '/?page=2')
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).not.toHaveAttribute('aria-current')

    // Next Link
    expect(within(pagination).getByRole('link', { name: 'Next' })).toHaveAttribute('href', '/?page=2')
  })

  test('Shows the second page the "initialPage" prop is set to 2', async () => {
    render(<Pagination initialPage={2} initialPageSize={4} totalItems={5} />)

    // Pagination
    const pagination = screen.getByRole('navigation', { name: 'results' })
    expect(pagination).toBeInTheDocument()

    // Prev Link
    expect(within(pagination).getByRole('link', { name: 'Previous' })).toHaveAttribute('href', '/?page=1')

    // Page 1 Link
    expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '/?page=1')
    expect(within(pagination).getByRole('link', { name: 'Page 1' })).not.toHaveAttribute('aria-current')

    // Page 2 Link
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '/?page=2')
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page')

    // Next Link (hidden when on last page)
    expect(within(pagination).queryByRole('link', { name: 'Next' })).not.toBeInTheDocument()
  })

  test('Should update the set page when navigating forward/backward', async () => {
    render(<Pagination initialPage={1} initialPageSize={4} totalItems={5} />)

    const pagination = screen.getByRole('navigation', { name: 'results' })

    expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).not.toHaveAttribute('aria-current')

    // Simulate route change to page 2
    await act(async () => {
      await mockRouter.push('?page=2')
    })

    expect(within(pagination).getByRole('link', { name: 'Page 1' })).not.toHaveAttribute('aria-current')
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page')

    // Simulate back button
    await act(async () => {
      await mockRouter.push('?page=1')
    })

    expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
    expect(within(pagination).getByRole('link', { name: 'Page 2' })).not.toHaveAttribute('aria-current')
  })
})
