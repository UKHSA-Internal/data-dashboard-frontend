import { render, screen } from '@testing-library/react'

import Feedback from '.'

test('Questions showing correctly', () => {
  render(<Feedback />)

  expect(screen.getByText('UKHSA Dashboard Feedback')).toBeInTheDocument()
  expect(screen.getByText('What was your reason for visiting the dashboard today?')).toBeInTheDocument()
  expect(screen.getByText('Did you find everything you were looking for?')).toBeInTheDocument()
  expect(screen.getByText('How could we improve your experience with the dashboard?')).toBeInTheDocument()
  expect(screen.getByText('What would you like to see on the dashboard in the future?')).toBeInTheDocument()

  expect(screen.getByText('Return to home page')).toHaveAttribute('href', '/')
})
