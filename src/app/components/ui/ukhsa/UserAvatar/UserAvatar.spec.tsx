import { auth } from '@/auth'
import { render, screen } from '@/config/test-utils'

import UserAvatar from './UserAvatar'

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}))

describe('UserAvatar Component', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  test('does not render when user is not authenticated', async () => {
    ;(auth as jest.Mock).mockResolvedValue(null)
    const { container } = render(await UserAvatar())
    expect(container.firstChild).toBeNull()
  })

  test('renders user initials from name when user is authenticated', async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { name: 'John Doe' } })
    render(await UserAvatar())
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  test('renders user initial from email when name is not available', async () => {
    ;(auth as jest.Mock).mockResolvedValue({ user: { email: 'johndoe@example.com' } })
    render(await UserAvatar())
    expect(screen.getByText('J')).toBeInTheDocument()
  })
})
