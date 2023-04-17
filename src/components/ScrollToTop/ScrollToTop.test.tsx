import { render, screen } from '@/config/test-utils'
import { ScrollToTop } from './ScrollToTop'
import userEvent from '@testing-library/user-event'

test('Displays the button, checks the content', async () => {
  render(<ScrollToTop />)

  expect(screen.getByText('Back to top')).toBeInTheDocument()
  expect(screen.getByText('Back to top')).toHaveAttribute('href', '#content')

  const user = userEvent.setup()
  const scrollToMock = jest.fn()
  global.scrollTo = scrollToMock

  await user.click(screen.getByText('Back to top'))

  expect(scrollToMock).toHaveBeenCalledTimes(1)
})
