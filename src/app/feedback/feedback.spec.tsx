// import Feedback from '@/app/feedback/page'
// import { render, screen, within } from '@/config/test-utils'
import { screen } from '@/config/test-utils'

// jest.mock('next/router', () => require('next-router-mock'))

// Removing tests whilst metadata issue with jest ongoing
// https://github.com/vercel/next.js/issues/47299

test.skip('Questions showing correctly', async () => {
  // render(await Feedback({}))

  expect(screen.getByRole('heading', { name: 'UKHSA data dashboard feedback', level: 1 })).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'What was your reason for visiting the dashboard today?', level: 2 })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'Did you find everything you were looking for?', level: 2 })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'How could we improve your experience with the dashboard?', level: 2 })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'What would you like to see on the dashboard in the future?', level: 2 })
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Return to home page' })).toHaveAttribute('href', '/')
})

test.skip('Shows an error after the api redirects with a generic server error', async () => {
  // const { getByRole } = render(await Feedback({ searchParams: { error: '1' } }))

  // const alert = getByRole('alert')
  expect(alert).toBeInTheDocument()
  // expect(within(alert).getByRole('heading', { name: 'There is a problem', level: 2 })).toBeInTheDocument()
  // expect(
  // within(alert).getByText('There was a problem processing the request. Please try again later.')
  // ).toBeInTheDocument()
})
