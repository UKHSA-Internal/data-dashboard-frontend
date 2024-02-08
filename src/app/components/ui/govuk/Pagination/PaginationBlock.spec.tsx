import { render, screen, within } from '@testing-library/react'

import { PaginationBlock } from './PaginationBlock'

describe('Pagination block', () => {
  test('Shows previous and next buttons when given all parameters', () => {
    render(
      <PaginationBlock
        previousLink="/previousLinkTest"
        previousText="Section 1"
        nextLink="/nextLinkTest"
        nextText="Section 3"
      />
    )

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    // Previous section shows
    expect(within(paginationBlock).getByRole('link', { name: 'Previous page : Section 1' })).toHaveAttribute(
      'href',
      '/previousLinkTest'
    )

    // Next section shows
    expect(within(paginationBlock).getByRole('link', { name: 'Next page : Section 3' })).toHaveAttribute(
      'href',
      '/nextLinkTest'
    )
  })

  test('Shows only previous button when no next content', () => {
    render(<PaginationBlock previousLink="/previousLinkTest" previousText="Section 5" />)

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    // Previous section shows
    expect(
      within(paginationBlock).getByRole('link', {
        name: 'Previous page : Section 5',
      })
    ).toHaveAttribute('href', '/previousLinkTest')

    // Next section does not show (only show 1 link)
    expect(within(paginationBlock).queryAllByRole('link')).toHaveLength(1)
  })

  test('Shows only previous button when no link for next', () => {
    render(<PaginationBlock previousLink="/previousLinkTest" previousText="Section 2" nextText="Section 4" />)

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    // Previous section shows
    expect(
      within(paginationBlock).getByRole('link', {
        name: 'Previous page : Section 2',
      })
    ).toHaveAttribute('href', '/previousLinkTest')

    // Next section does not show (only show 1 link)
    expect(within(paginationBlock).queryAllByRole('link')).toHaveLength(1)
  })

  test('Shows only next button when no previous content', () => {
    render(<PaginationBlock nextLink="/nextLinkTest" nextText="Section 2" />)

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    // Next section shows
    expect(
      within(paginationBlock).getByRole('link', {
        name: 'Next page : Section 2',
      })
    ).toHaveAttribute('href', '/nextLinkTest')

    // Previous section does not show (only show 1 link)
    expect(within(paginationBlock).queryAllByRole('link')).toHaveLength(1)
  })

  test('Shows only next button when no text for previous', () => {
    render(<PaginationBlock nextLink="/nextLinkTest" nextText="Section 2" previousLink="/previousLinkTest" />)

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    // Next section shows
    expect(
      within(paginationBlock).getByRole('link', {
        name: 'Next page : Section 2',
      })
    ).toHaveAttribute('href', '/nextLinkTest')

    // Previous section does not show (only show 1 link)
    expect(within(paginationBlock).queryAllByRole('link')).toHaveLength(1)
  })

  test('Shows no links when no content for either', () => {
    render(<PaginationBlock />)

    const paginationBlock = screen.getByRole('navigation', { name: 'PaginationBlock' })

    expect(paginationBlock).toBeVisible()

    // No links showing within
    expect(within(paginationBlock).queryAllByRole('link')).toHaveLength(0)
  })
})
