import userEvent from '@testing-library/user-event'

import { render, screen } from '@/config/test-utils'

import { TopNav } from './TopNav'

jest.mock('next/navigation')

test('Mobile menu opens & closes', async () => {
  render(
    <TopNav>
      <>
        <li>Child 1</li>
        <li>Child 2</li>
      </>
    </TopNav>
  )

  const link = screen.getByRole('link', { name: 'Show navigation menu', expanded: false })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('aria-controls', 'ukhsa-topnav')
  expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')

  await userEvent.click(link)

  expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).not.toHaveClass('hidden')

  await userEvent.click(link)

  expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
})
