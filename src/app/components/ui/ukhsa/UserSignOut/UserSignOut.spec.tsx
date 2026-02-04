import userEvent from '@testing-library/user-event'
import { redirect } from 'next/navigation'

import { auth, signOut } from '@/auth'
import { render, screen } from '@/config/test-utils'

import UserSignOut from './UserSignOut'

jest.mock('@/auth', () => ({
  auth: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

describe('UserSignOut Component', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  test('does not render when user is not authenticated', async () => {
    ;(auth as jest.Mock).mockResolvedValue(null)
    const { container } = render(await UserSignOut())
    expect(container.firstChild).toBeNull()
  })

  test('renders the sign-out button when user is authenticated', async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } })
    render(await UserSignOut())
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument()
  })

  test('handles auth errors gracefully', async () => {
    ;(auth as jest.Mock).mockRejectedValue(new Error('Auth error'))
    render(await UserSignOut())
    expect(screen.queryByRole('button', { name: 'Sign out' })).not.toBeInTheDocument()
  })

  test('handles sign out errors gracefully', async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } })
    ;(signOut as jest.Mock).mockRejectedValue(new Error('Sign out error'))
    render(await UserSignOut())
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument()
  })

  test('calls signOut when button is clicked', async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } })
    ;(signOut as jest.Mock).mockResolvedValue(undefined)
    ;(redirect as unknown as jest.Mock).mockResolvedValue(undefined)
    render(await UserSignOut())
    const signOutButton = screen.getByRole('button', { name: 'Sign out' })
    await userEvent.click(signOutButton)
    expect(signOut).toHaveBeenCalledWith({ redirect: false })
    expect(redirect).toHaveBeenCalled()
  })
})
