import userEvent from '@testing-library/user-event'

import { render } from '@/config/test-utils'

import { BackToTop } from './BackToTop'

test('renders a back to top link', async () => {
  const { getByRole, getByTestId } = render(await BackToTop())

  // Verify the rendered content
  expect(getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#content')
  expect(getByTestId('up-arrow')).toHaveAttribute('aria-hidden')
})

test('scrolls to the top when clicking the back to top link', async () => {
  const { getByRole } = render(await BackToTop())

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
