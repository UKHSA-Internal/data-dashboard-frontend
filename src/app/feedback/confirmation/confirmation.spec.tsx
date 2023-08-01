import { screen } from '@/config/test-utils'

// import FeedbackConfirmation from './page'

// Removing tests whilst metadata issue with jest ongoing
// https://github.com/vercel/next.js/issues/47299

jest.mock('next/router', () => require('next-router-mock'))

test.skip('Shows confirmation page', async () => {
  // render(await FeedbackConfirmation())

  expect(screen.getByRole('heading', { name: 'Form submitted', level: 1 })).toBeInTheDocument()
  expect(screen.getByText('Thank you for your feedback')).toBeInTheDocument()
  expect(
    screen.getByText(
      "Thank you for taking the time to give feedback on the UKHSA data dashboard. We'll use your feedback to help us continually improve our services."
    )
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      /We're constantly looking to improve our users' experience of the dashboard. If you'd like to share your thoughts further, please get in touch with our user research team at/
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /researchteam.dpd@ukhsa.gov.uk/ })).toHaveAttribute(
    'href',
    'mailto:researchteam.dpd@ukhsa.gov.uk'
  )
  expect(screen.getByText('Return to home page')).toHaveAttribute('href', '/')
})