import { auth } from '@/auth'
import { render, screen } from '@/config/test-utils'

import UserSignOut from './UserSignOut'

jest.mock('@/auth', () => ({
  auth: jest.fn(),
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
})
