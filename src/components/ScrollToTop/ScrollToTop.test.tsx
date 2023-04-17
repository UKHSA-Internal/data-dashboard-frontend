import { render, screen } from '@/config/test-utils'
import ScrollToTop from './ScrollToTop'

test('Displays the button, checks the content', () => {
  render(<ScrollToTop />)

  expect(screen.getByText('Back to top')).toBeInTheDocument()
  expect(screen.getByText('Back to top')).toHaveAttribute('href', '#top')
})
