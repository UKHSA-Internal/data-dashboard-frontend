import userEvent from '@testing-library/user-event'
import { useWindowScroll } from 'react-use'

import { render } from '@/config/test-utils'

import { BackToTop } from './BackToTop'

jest.mock('react-use')
const useWindowScrollMock = jest.mocked(useWindowScroll)

test('renders a back to top link', async () => {
  useWindowScrollMock.mockReturnValue({ x: 0, y: 100 })

  const { getByRole, getByTestId } = render(<BackToTop />)

  // Verify the rendered content
  expect(getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#main-content')
  expect(getByTestId('up-arrow')).toHaveAttribute('aria-hidden', 'true')
})

test('scrolls to the top when clicking the back to top link', async () => {
  const { getByRole } = render(<BackToTop />)

  // Mock the window.scrollTo function
  const scrollToMock = jest.fn()
  window.scrollTo = scrollToMock

  // Simulate the click event
  const link = getByRole('link', { name: 'Back to top' })
  await userEvent.click(link)

  // Verify that the window.scrollTo function was called with the expected arguments
  expect(scrollToMock).toHaveBeenCalledWith({
    top: 0,
    behavior: 'smooth',
  })
})

test('becomes sticky after scrolling vertically further than 200px', async () => {
  useWindowScrollMock.mockReturnValueOnce({ x: 0, y: 0 })

  const { getByRole, rerender } = render(<BackToTop />)

  // Initially not sticky
  expect(getByRole('link', { name: 'Back to top' })).not.toHaveClass('xl:sticky')

  // Update scroll position to beyond 200px
  useWindowScrollMock.mockReturnValue({ x: 0, y: 201 })
  rerender(<BackToTop />)

  // Should now be sticky
  expect(getByRole('link', { name: 'Back to top' })).toHaveClass('xl:sticky')
})

test('becomes not sticky after scrolling vertically below 200px', async () => {
  useWindowScrollMock.mockReturnValueOnce({ x: 0, y: 201 })

  const { getByRole, rerender } = render(<BackToTop />)

  // Initially sticky
  expect(getByRole('link', { name: 'Back to top' })).toHaveClass('xl:sticky')

  // Update scroll position to below 200px
  useWindowScrollMock.mockReturnValue({ x: 0, y: 199 })
  rerender(<BackToTop />)

  // Should no longer be sticky
  expect(getByRole('link', { name: 'Back to top' })).not.toHaveClass('xl:sticky')
})
