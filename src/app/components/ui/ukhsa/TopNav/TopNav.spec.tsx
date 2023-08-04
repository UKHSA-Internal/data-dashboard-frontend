import userEvent from '@testing-library/user-event'

import { render } from '@/config/test-utils'

import { TopNav } from './TopNav'

jest.mock('next/navigation')

test('Mobile menu opens & closes', async () => {
  const { getByRole } = render(
    <TopNav>
      <>
        <li>Child 1</li>
        <li>Child 2</li>
      </>
    </TopNav>
  )

  const link = getByRole('link', { name: 'Show navigation menu', expanded: false })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('aria-controls', 'ukhsa-topnav')
  expect(getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')

  await userEvent.click(link)

  expect(getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
  expect(getByRole('navigation', { name: 'Menu' })).not.toHaveClass('hidden')

  await userEvent.click(link)

  expect(getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
  expect(getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
})
