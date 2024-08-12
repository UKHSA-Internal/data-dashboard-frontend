import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'

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

  const closeLink = screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })

  await userEvent.click(closeLink)

  expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
})

test('Clicking outside of the header closes the navigation menu', async () => {
  render(
    <>
      <TopNav>
        <>
          <li>Child 1</li>
          <li>Child 2</li>
        </>
      </TopNav>
      <h1>Outside item</h1>
    </>
  )

  await userEvent.click(screen.getByRole('link', { name: 'Show navigation menu', expanded: false }))

  expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).not.toHaveClass('hidden')

  await userEvent.click(screen.getByRole('heading', { name: 'Outside item', level: 1 }))

  expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
})

test('Clicking a menu item closes the navigation menu', async () => {
  const navigationMock = jest.mocked(usePathname)
  navigationMock.mockReturnValue('/')

  const { rerender } = render(
    <TopNav>
      <>
        <li>Child 1</li>
        <li>Child 2</li>
      </>
    </TopNav>
  )

  await userEvent.click(screen.getByRole('link', { name: 'Show navigation menu', expanded: false }))

  expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).toBeVisible()

  // Simulate route change
  navigationMock.mockReturnValue('/new-page')

  rerender(
    <TopNav>
      <>
        <li>Child 1</li>
        <li>Child 2</li>
      </>
    </TopNav>
  )

  expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
})

// ----------------------------
// -- New landing page tests --
// ----------------------------

describe('New landing page tests', () => {
  test('Menu opens & closes', async () => {
    render(<TopNav newLandingPage>Test content</TopNav>)

    const link = screen.getByRole('link', { name: 'Show navigation menu', expanded: false })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('aria-controls', 'ukhsa-topnav')
    expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')

    await userEvent.click(link)

    expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).not.toHaveClass('hidden')

    const closeLink = screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })

    await userEvent.click(closeLink)

    expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
  })

  test('Clicking outside of the header closes the navigation menu', async () => {
    render(
      <>
        <TopNav newLandingPage>
          <>
            <li>Child 1</li>
            <li>Child 2</li>
          </>
        </TopNav>
        <h1>Outside item</h1>
      </>
    )

    await userEvent.click(screen.getByRole('link', { name: 'Show navigation menu', expanded: false }))

    expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).not.toHaveClass('hidden')

    await userEvent.click(screen.getByRole('heading', { name: 'Outside item', level: 1 }))

    expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
  })

  test('Clicking a menu item closes the navigation menu', async () => {
    const navigationMock = jest.mocked(usePathname)
    navigationMock.mockReturnValue('/')

    const { rerender } = render(
      <TopNav newLandingPage>
        <>
          <li>Child 1</li>
          <li>Child 2</li>
        </>
      </TopNav>
    )

    await userEvent.click(screen.getByRole('link', { name: 'Show navigation menu', expanded: false }))

    expect(screen.getByRole('link', { name: 'Hide navigation menu', expanded: true })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).toBeVisible()

    // Simulate route change
    navigationMock.mockReturnValue('/new-page')

    rerender(
      <TopNav>
        <>
          <li>Child 1</li>
          <li>Child 2</li>
        </>
      </TopNav>
    )

    expect(screen.getByRole('link', { name: 'Show navigation menu', expanded: false })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Menu' })).toHaveClass('hidden')
  })
})
