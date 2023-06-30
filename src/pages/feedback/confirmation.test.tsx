import { render, screen } from '@testing-library/react'

import FeedbackConfirmation from './confirmation'

test('Shows confirmation panel', () => {
  render(<FeedbackConfirmation />)

  expect(screen.getByText('Form submitted')).toBeInTheDocument()
  expect(screen.getByText('Thank you for your feedback')).toBeInTheDocument()

  expect(screen.getByText('Return to home page')).toHaveAttribute('href', '/')
})
