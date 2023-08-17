import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCookies } from 'next-client-cookies'
import React, { ComponentProps } from 'react'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE } from '@/app/constants/cookies.constants'

import { CookieBanner } from './CookieBanner'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

jest.mock('next-client-cookies')
jest.mock('@/app/hooks/useNavigationEvent')

window.gtag = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
  ;(useCookies as jest.Mock).mockReturnValue({ set: () => '', get: () => '' })
})

const props: ComponentProps<typeof CookieBanner> = {
  title: 'Cookies on UKHSA data dashboard',
  body: 'Mocked content',
}

test('Renders the cookie banner selection view', () => {
  render(<CookieBanner {...props} />)

  expect(screen.getByRole('heading', { name: /Cookies on UKHSA data dashboard/i })).toBeInTheDocument()
  expect(screen.getByText('Mocked content')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /accept additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reject additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view cookies/i })).toBeInTheDocument()

  // Ensure that the confirmation message is not rendered initially
  expect(screen.queryByTestId('confirmation-message')).not.toBeInTheDocument()
})

test('Changes to the confirmation view when accepting cookies', async () => {
  render(<CookieBanner {...props} />)

  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve accepted additional cookies./)).toBeInTheDocument()

  expect(window.gtag).toHaveBeenLastCalledWith('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
  })
})

test('Changes to the confirmation view when rejecting cookies', async () => {
  render(<CookieBanner {...props} />)

  await userEvent.click(screen.getByRole('button', { name: /reject additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve rejected additional cookies./)).toBeInTheDocument()

  expect(screen.getByRole('link', { name: /cookie policy/ })).toHaveAttribute('href', '/cookie-policy')
  expect(screen.getByRole('link', { name: /change your cookie settings/ })).toHaveAttribute('href', '#cookie-banner')

  expect(window.gtag).toHaveBeenLastCalledWith('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  })
})

test('Hides the cookie banner when "Hide cookie message" is clicked', async () => {
  render(<CookieBanner {...props} />)

  // Click "Accept additional cookies" to show the confirmation view
  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  // Ensure that the confirmation message is visible
  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  ;(useCookies as jest.Mock).mockReturnValue({ set: () => '', get: () => UKHSA_GDPR_COOKIE_ACCEPT_VALUE })

  // Click "Hide cookie message" to hide the entire cookie banner
  await userEvent.click(screen.getByRole('button', { name: /hide cookie message/i }))

  // Ensure that the entire cookie banner is no longer visible
  expect(screen.queryByLabelText('Cookies on UKHSA data dashboard')).not.toBeInTheDocument()
})

test('Hides the cookie banner and redirects to the cookie policy page when "cookie policy" link is clicked', async () => {
  render(<CookieBanner {...props} />)

  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))
  ;(useCookies as jest.Mock).mockReturnValue({ set: () => '', get: () => UKHSA_GDPR_COOKIE_ACCEPT_VALUE })

  await userEvent.click(screen.getByRole('link', { name: /cookie policy/i }))

  expect(screen.queryByLabelText('Cookies on UKHSA data dashboard')).not.toBeInTheDocument()

  expect(pushMock).toHaveBeenCalledWith('/cookie-policy')
})

test('Changes back to the selection view when "change your cookie settings" is clicked', async () => {
  render(<CookieBanner {...props} />)

  // Click "Accept additional cookies" to show the confirmation view
  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  // Ensure that the confirmation message is visible
  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()

  // Click "change your cookie settings" to go back to the selection view
  await userEvent.click(screen.getByRole('link', { name: /change your cookie settings/i }))

  // Ensure that the selection view is rendered again
  expect(screen.getByRole('heading', { name: /cookies on UKHSA data dashboard/i })).toBeInTheDocument()
  expect(screen.getByText('Mocked content')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /accept additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reject additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view cookies/i })).toBeInTheDocument()

  // Ensure that the confirmation message is not rendered
  expect(screen.queryByTestId('confirmation-message')).not.toBeInTheDocument()
})

test('Accepting or rejecting cookies via keyboard', async () => {
  const user = userEvent.setup()

  render(<CookieBanner {...props} />)

  const acceptButton = screen.getByRole('button', { name: /accept additional cookies/i })

  acceptButton.focus()

  await user.keyboard('{Enter}')

  expect(screen.getByText(/You’ve accepted additional cookies./)).toBeInTheDocument()

  await user.tab()

  expect(screen.getByRole('link', { name: /cookie policy/ })).toHaveFocus()

  await user.tab()

  expect(screen.getByRole('link', { name: /change your cookie settings/ })).toHaveFocus()

  await user.keyboard('{Enter}')

  expect(screen.getByText('Mocked content')).toBeInTheDocument()

  await user.tab()
  await user.tab()

  const rejectButton = screen.getByRole('button', { name: /reject additional cookies/i })

  expect(rejectButton).toHaveFocus()

  await user.keyboard('{Enter}')

  expect(screen.getByText(/You’ve rejected additional cookies./)).toBeInTheDocument()
})
